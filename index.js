const endSymbol = Symbol('pForever.end');

const pForever = async (function_, options = {}) => {
	const {initialValue, signal} = options;

	signal?.throwIfAborted();

	let previousValue = await initialValue;

	while (true) {
		signal?.throwIfAborted();

		const newValue = await function_(previousValue); // eslint-disable-line no-await-in-loop

		if (newValue === endSymbol) {
			return;
		}

		previousValue = newValue;
	}
};

pForever.end = endSymbol;

export default pForever;
