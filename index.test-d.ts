import {expectType} from 'tsd';
import pForever from './index.js';

expectType<Promise<void>>(pForever(index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? index : pForever.end;
}, 0));

expectType<Promise<void>>(pForever(index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? index : pForever.end;
}, Promise.resolve(0)));

expectType<Promise<void>>(pForever(async index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? Promise.resolve(index) : pForever.end;
}, 0));

expectType<Promise<void>>(pForever(async index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? index : Promise.resolve(pForever.end);
}, 0));

let index = 0;

expectType<Promise<void>>(pForever<number>(previousValue => {
	expectType<number | undefined>(previousValue);
	index++;
	return index <= 100 ? index : pForever.end;
}));

expectType<Promise<void>>(pForever<number>(async previousValue => {
	expectType<number | undefined>(previousValue);
	index++;
	return index <= 100 ? Promise.resolve(index) : pForever.end;
}));

expectType<Promise<void>>(pForever<number>(async previousValue => {
	expectType<number | undefined>(previousValue);
	index++;
	return index <= 100 ? index : Promise.resolve(pForever.end);
}));
