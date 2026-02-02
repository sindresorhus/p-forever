export type Options<ValueType> = {
	/**
	Initial value to pass to `function_`.
	*/
	readonly initialValue?: ValueType | PromiseLike<ValueType>;

	/**
	An `AbortSignal` to abort the loop from outside.

	When aborted, the promise returned by `pForever` rejects with an `AbortError`.

	@example
	```
	import pForever from 'p-forever';

	const abortController = new AbortController();

	setTimeout(() => {
		abortController.abort();
	}, 500);

	await pForever(async () => {
		await someWork();
	}, {signal: abortController.signal});
	```
	*/
	readonly signal?: AbortSignal;
};

declare const pForever: {
	/**
	Symbol used to end the loop.
	*/
	readonly end: unique symbol;

	/**
	Run promise-returning & async functions until you end it.

	@param function_ - Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `function_` again.
	@param options - Options for the loop.
	@returns Fulfills when `function_` returns `pForever.end`, rejects if any of the promises returned from `function_` rejects, or rejects with an `AbortError` if the signal is aborted.

	@example
	```
	import pForever from 'p-forever';

	pForever(async index => {
		index++;

		if (index > 100) {
			return pForever.end;
		}

		await createFixture(index);

		return index;
	}, {initialValue: 0});

	// or
	let index = 0;

	pForever(async () => {
		index++;

		if (index > 100) {
			return pForever.end;
		}

		await createFixture(index);
	});
	```
	*/
	<ValueType>(
		function_: (
			previousValue: ValueType
		) => ValueType | typeof pForever.end | PromiseLike<ValueType | typeof pForever.end>,
		options: Options<ValueType> & {readonly initialValue: ValueType | PromiseLike<ValueType>}
	): Promise<void>;
	<ValueType>(
		function_: (
			previousValue?: ValueType
		) => ValueType | typeof pForever.end | PromiseLike<ValueType | typeof pForever.end>,
		options?: Options<ValueType>
	): Promise<void>;
};

export default pForever;
