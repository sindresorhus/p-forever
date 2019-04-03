import {expectType} from 'tsd';
import pForever = require('.');

expectType<Promise<void>>(
	pForever(i => {
		expectType<number>(i);
		i++;
		return i <= 100 ? i : pForever.end;
	}, 0)
);

expectType<Promise<void>>(
	pForever(i => {
		expectType<number>(i);
		i++;
		return i <= 100 ? i : pForever.end;
	}, Promise.resolve(0))
);

expectType<Promise<void>>(
	pForever(i => {
		expectType<number>(i);
		i++;
		return i <= 100 ? Promise.resolve(i) : pForever.end;
	}, 0)
);

let i = 0;

expectType<Promise<void>>(
	pForever<number>(previousValue => {
		expectType<number | undefined>(previousValue);
		i++;
		return i <= 100 ? i : pForever.end;
	})
);

expectType<Promise<void>>(
	pForever<number>(previousValue => {
		expectType<number | undefined>(previousValue);
		i++;
		return i <= 100 ? Promise.resolve(i) : pForever.end;
	})
);
