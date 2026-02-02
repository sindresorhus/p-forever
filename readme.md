# p-forever

> Run promise-returning & async functions until you end it

Think of it like an async version of `while (true) {}`.

## Install

```sh
npm install p-forever
```

## Usage

Here we create some numbered fixtures. The `createFixture()` function returns a Promise.

```js
import pForever from 'p-forever';

pForever(async index => {
	index++;

	if (index > 100) {
		return pForever.end;
	}

	await createFixture(index);

	return index;
}, {initialValue: 0});
```

or

```js
import pForever from 'p-forever';

let index = 0;

pForever(async () => {
	index++;

	if (index > 100) {
		return pForever.end;
	}

	await createFixture(index);
});
```

## API

### pForever(function_, options?)

Returns a `Promise` that is fulfilled when `function_` returns `pForever.end`, rejects if any of the promises returned from `function_` rejects, or rejects with an `AbortError` if the signal is aborted.

#### function_(previousValue)

Type: `Function`

Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `function_` again.

#### options

Type: `object`

##### initialValue

Initial value to pass to `function_`.

##### signal

Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

An `AbortSignal` to abort the loop from outside.

When aborted, the promise returned by `pForever` rejects with an `AbortError`.

```js
import pForever from 'p-forever';

const abortController = new AbortController();

setTimeout(() => {
	abortController.abort();
}, 500);

await pForever(async () => {
	await someWork();
}, {signal: abortController.signal});
```

### pForever.end

Symbol used to end the loop.

## Related

- [p-times](https://github.com/sindresorhus/p-times) - Run promise-returning & async functions a specific number of times concurrently
- [p-whilst](https://github.com/sindresorhus/p-whilst) - Calls a function repeatedly while a condition returns true and then resolves the promise
- [More…](https://github.com/sindresorhus/promise-fun)
