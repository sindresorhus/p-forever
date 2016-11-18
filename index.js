'use strict';
const symbolEnd = Symbol('pForever.end');

module.exports = function loop(fn, prevVal) {
	return Promise.resolve(prevVal).then(fn).then(x => x !== symbolEnd && loop(fn, x));
};

module.exports.end = symbolEnd;
