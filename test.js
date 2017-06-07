import test from 'ava';
import delay from 'delay';
import m from '.';

test('main', async t => {
	let i = 0;
	await m(async () => ++i === 10 ? m.end : delay(50));
	t.is(i, 10);
});

test('forward the value', async t => {
	let lastVal;

	await m(async i => {
		i++;
		lastVal = i;
		return i === 10 ? m.end : i;
	}, 0);

	t.is(lastVal, 10);
});

test('rejects when returned promise rejects', async t => {
	const fixtureErr = new Error('fixture');

	await m(async () => Promise.reject(fixtureErr)).then(() => t.fail()).catch(err => {
		t.is(err, fixtureErr);
	});
});
