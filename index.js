'use strict';
const symbolEnd = Symbol('pForever.end');

module.exports = function (fn, initVal) {
	return new Promise((resolve, reject) => {
		const loop = prevVal => Promise.resolve(prevVal).then(fn).then(lastVal => {
			if (lastVal === symbolEnd) {
				return resolve();
			}
			loop(lastVal);
		}).catch(reject);
		loop(initVal);
	});
};

module.exports.end = symbolEnd;
