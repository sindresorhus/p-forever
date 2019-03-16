declare const pForever: {
	/**
	Run promise-returning & async functions until you end it.

	@param fn - Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `fn` again.
	@param initialValue - Initial value to pass to `fn`.
	@returns Fulfills when `fn` returns `pForever.end`, or rejects if any of the promises returned from `fn` rejects.
	*/
	<ValueType>(
		fn: (
			previousValue?: ValueType
		) => ValueType | PromiseLike<ValueType> | typeof pForever.end
	): Promise<void>;
	<ValueType>(
		fn: (
			previousValue: ValueType
		) => ValueType | PromiseLike<ValueType> | typeof pForever.end,
		initialValue: ValueType | PromiseLike<ValueType>
	): Promise<void>;

	/**
	Symbol used to end the loop.
	*/
	readonly end: unique symbol;
};

export default pForever;
