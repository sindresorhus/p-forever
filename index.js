'use strict';
const symbolEnd = Symbol('pForever.end');

const pForever = async (fn, previousValue) => {
	const newValue = await fn(await previousValue);

	if (newValue === symbolEnd) {
		return;
	}

	return pForever(fn, newValue);
};

module.exports = pForever;
module.exports.default = pForever;

module.exports.end = symbolEnd;
