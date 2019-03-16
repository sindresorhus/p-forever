import test from 'ava';
import delay from 'delay';
import pForever from '.';

test('main', async t => {
	let i = 0;
	await pForever(async () => ++i === 10 ? pForever.end : delay(50));
	t.is(i, 10);
});

test('forward the value', async t => {
	let lastValue;

	await pForever(async i => {
		i++;
		lastValue = i;
		return i === 10 ? pForever.end : i;
	}, 0);

	t.is(lastValue, 10);
});

test('rejects when returned promise rejects', async t => {
	const fixtureError = new Error('fixture');

	await t.throwsAsync(
		pForever(async () => {
			throw fixtureError;
		}),
		{is: fixtureError}
	);
});
