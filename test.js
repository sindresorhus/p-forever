import test from 'ava';
import delay from 'delay';
import pForever from './index.js';

test('main', async t => {
	let index = 0;
	await pForever(async () => ++index === 10 ? pForever.end : delay(50));
	t.is(index, 10);
});

test('forward the value', async t => {
	let lastValue;

	await pForever(async index => {
		index++;
		lastValue = index;
		return index === 10 ? pForever.end : index;
	}, {initialValue: 0});

	t.is(lastValue, 10);
});

test('rejects when returned promise rejects', async t => {
	const fixtureError = new Error('fixture');

	await t.throwsAsync(
		pForever(async () => {
			throw fixtureError;
		}),
		{is: fixtureError},
	);
});

test('abort with signal', async t => {
	const abortController = new AbortController();
	let index = 0;

	setTimeout(() => {
		abortController.abort();
	}, 100);

	await t.throwsAsync(
		pForever(async () => {
			index++;
			await delay(50);
		}, {signal: abortController.signal}),
		{name: 'AbortError'},
	);

	t.true(index > 0);
});

test('abort with already aborted signal', async t => {
	let called = false;

	await t.throwsAsync(
		pForever(async () => {
			called = true;
		}, {signal: AbortSignal.abort()}),
		{name: 'AbortError'},
	);

	t.false(called);
});

test('abort with signal and initialValue', async t => {
	const abortController = new AbortController();

	setTimeout(() => {
		abortController.abort();
	}, 100);

	await t.throwsAsync(
		pForever(async index => {
			await delay(50);
			return index + 1;
		}, {initialValue: 0, signal: abortController.signal}),
		{name: 'AbortError'},
	);
});
