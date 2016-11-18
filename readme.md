# p-forever [![Build Status](https://travis-ci.org/sindresorhus/p-forever.svg?branch=master)](https://travis-ci.org/sindresorhus/p-forever)

> Run promise-returning & async functions until you end it

Think of it like an async version of `while (true) {}`.


## Install

```
$ npm install --save p-forever
```


## Usage

Here we create some numbered fixtures. The `createFixture()` function returns a Promise.

```js
const pForever = require('p-forever');

pForever(i => {
	i++;
	return i <= 100 ? createFixture(i) : pForever.end;
}, 0);
```

or

```js
const pForever = require('p-forever');

let i = 0;

pForever(() => {
	i++;
	return i <= 100 ? createFixture(i) : pForever.end;
});
```


## API

### pForever(fn, [initialValue])

Returns a `Promise` that is fulfilled when `fn` returns `pForever.end`, or rejects if any of the promises returned from `fn` rejects.

#### fn(previousValue)

Type: `Function`

Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `fn` again.

#### initialValue

Initial value to pass to `fn`.

### pForever.end

Symbol used to end the loop.


## Related

- [p-times](https://github.com/sindresorhus/p-times) - Run promise-returning & async functions a specific number of times concurrently
- [p-whilst](https://github.com/sindresorhus/p-whilst) - Calls a function repeatedly while a condition returns true and then resolves the promise
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
