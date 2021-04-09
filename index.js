const endSymbol = Symbol('pForever.end');

const pForever = async (function_, previousValue) => {
	const newValue = await function_(await previousValue);

	if (newValue === endSymbol) {
		return;
	}

	return pForever(function_, newValue);
};

pForever.end = endSymbol;

export default pForever;
