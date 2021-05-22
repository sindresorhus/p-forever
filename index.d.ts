declare const pForever: {
	/**
	Symbol used to end the loop.
	*/
	readonly end: unique symbol;

	/**
	Run promise-returning & async functions until you end it.

	@param function_ - Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `fn` again.
	@param initialValue - Initial value to pass to `fn`.
	@returns Fulfills when `fn` returns `pForever.end`, or rejects if any of the promises returned from `fn` rejects.

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
	}, 0);

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
			previousValue?: ValueType
		) => ValueType | PromiseLike<ValueType> | typeof pForever.end | PromiseLike<typeof pForever.end>
	): Promise<void>;
	<ValueType>(
		function_: (
			previousValue: ValueType
		) => ValueType | PromiseLike<ValueType> | typeof pForever.end | PromiseLike<typeof pForever.end>,
		initialValue: ValueType | PromiseLike<ValueType>
	): Promise<void>;
};

export default pForever;
