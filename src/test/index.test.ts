import MaFP from '../index';

const map = new MaFP<string, boolean>();

beforeAll(() => {
  map.set('A', true);
  map.set('B', false);
  map.set('C', true);
  map.set('D', true);
});

test('filter', () => {
  const resFilterMap = map.filter((val) => val);
  expect(resFilterMap.get('A')).toBeDefined();
  expect(resFilterMap.get('B')).toBeUndefined();
  expect(resFilterMap.get('C')).toBeDefined();
  expect(resFilterMap.get('D')).toBeDefined();
});

test('filterToArray', () => {
  const resFilterArr = map.filterToArray((val) => val);
  const expected = [
    ['A', true],
    ['C', true],
    ['D', true],
  ];
  expect(resFilterArr).toEqual(expected);
});

test('map', () => {
  const resMapMap = map.map((val) => !val);
  expect(resMapMap.get('A')).toBeFalsy();
  expect(resMapMap.get('B')).toBeTruthy();
  expect(resMapMap.get('C')).toBeFalsy();
  expect(resMapMap.get('D')).toBeFalsy();
});

test('mapToArray', () => {
  const resMapArr = map.mapToArray((val) => !val);
  const expected = [
    ['A', false],
    ['B', true],
    ['C', false],
    ['D', false],
  ];
  expect(resMapArr).toEqual(expected);
});

test('reduce', () => {
  const reduce = map.reduce((acc, curr) => acc + Number(curr), 0);
  expect(reduce).toEqual(3);
});

test('every', () => {
  const everyFalse = map.every((val) => val);
  expect(everyFalse).toBeFalsy();
  const everyTrue = map.every((_val, key) => !!key);
  expect(everyTrue).toBeTruthy();
});

test('some', () => {
  const someTruth = map.some((val) => val);
  expect(someTruth).toBeTruthy();
  const someFalse = map.some((_val, key) => !key);
  expect(someFalse).toBeFalsy();
});

test('keys', () => {
  const keys = map.keys();
  expect(keys).toBeDefined();
  const filteredKeys = keys.filterToArray((val) => val != 'B');
  console.log(filteredKeys);
  expect(filteredKeys).toBeDefined();
});

test('values', () => {
  const values = map.values();
  expect(values).toBeDefined();
  const filteredValues = values.filterToArray((val) => val);
  console.log(filteredValues);
  expect(filteredValues).toBeDefined();
});
