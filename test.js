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
	}, 0);

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
