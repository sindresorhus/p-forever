import {expectType} from 'tsd';
import pForever from './index.js';

expectType<Promise<void>>(pForever(index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? index : pForever.end;
}, {initialValue: 0}));

expectType<Promise<void>>(pForever(index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? index : pForever.end;
}, {initialValue: Promise.resolve(0)}));

expectType<Promise<void>>(pForever(async index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? Promise.resolve(index) : pForever.end;
}, {initialValue: 0}));

expectType<Promise<void>>(pForever(async index => {
	expectType<number>(index);
	index++;
	return index <= 100 ? index : Promise.resolve(pForever.end);
}, {initialValue: 0}));

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

expectType<Promise<void>>(pForever(async () => {
	await Promise.resolve();
}, {signal: new AbortController().signal}));

expectType<Promise<void>>(pForever(async index => {
	expectType<number>(index);
	return index + 1;
}, {initialValue: 0, signal: new AbortController().signal}));
