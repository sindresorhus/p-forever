'use strict';
const symbolEnd = Symbol('pForever.end');

module.exports = (fn, initVal) => new Promise((resolve, reject) => {
	const loop = prevVal => Promise.resolve(prevVal).then(fn).then(fnRetVal => {
		if (fnRetVal === symbolEnd) {
			resolve();
			return;
		}

		loop(fnRetVal);
	}).catch(reject);

	loop(initVal);
});

module.exports.end = symbolEnd;
