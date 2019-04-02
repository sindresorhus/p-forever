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
// TODO: Remove this for the next major release
module.exports.default = pForever;

module.exports.end = symbolEnd;
