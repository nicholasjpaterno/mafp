import MaFP from '../src/index';

describe('MaFP', () => {
  const map = new MaFP<string, boolean>();

  beforeAll(() => {
    map.set('A', true);
    map.set('b', false);
    map.set('C', true);
    map.set('D', true);
  });

  test('filter', () => {
    const resFilterMap = map.filter((val) => val);
    expect(resFilterMap.get('A')).toBeDefined();
    expect(resFilterMap.get('b')).toBeUndefined();
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
    expect(resMapMap.get('b')).toBeTruthy();
    expect(resMapMap.get('C')).toBeFalsy();
    expect(resMapMap.get('D')).toBeFalsy();
  });

  test('mapToArray', () => {
    const resMapArr = map.mapToArray((val) => !val);
    const expected = [
      ['A', false],
      ['b', true],
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

  describe('keys', function () {
    const keys = map.keys();
    test('basic', () => {
      expect(keys).toBeDefined();
    });

    test('filterToArray', () => {
      const filteredKeys = keys.filterToArray((val) => val != 'b');
      expect(filteredKeys).toEqual(['A', 'C', 'D']);
    });

    test('mapToArray', () => {
      const mappedKeys = keys.mapToArray((val) => val + val);
      expect(mappedKeys).toEqual(['AA', 'bb', 'CC', 'DD']);
    });

    test('reduce', () => {
      const reduce = keys.reduce((acc, val) => `${acc}${val}`, '');
      expect(reduce).toEqual(['A', 'b', 'C', 'D'].join(''));
    });

    test('every true', () => {
      const every = keys.every((val) => val);
      expect(every).toBeTruthy();
    });

    test('every false', () => {
      const every = keys.every((val) => val === val.toUpperCase());
      expect(every).toBeFalsy();
    });

    test('some true', () => {
      const some = keys.some((val) => val === val.toUpperCase());
      expect(some).toBeTruthy();
    });

    test('some false', () => {
      const some = keys.some((val) => val === undefined);
      expect(some).toBeFalsy();
    });
  });

  describe('values', function () {
    const values = map.values();
    test('basic', () => {
      expect(values).toBeDefined();
    });

    test('filterToArray', () => {
      const filteredValues = values.filterToArray((val) => val);
      expect(filteredValues).toEqual([true, true, true]);
    });

    test('mapToArray', () => {
      const mappedValues = values.mapToArray((val) => val);
      expect(mappedValues).toEqual([true, false, true, true]);
    });

    test('reduce', () => {
      const reduce = values.reduce((acc, val) => `${acc}${val}`, '');
      expect(reduce).toEqual([true, false, true, true].join(''));
    });

    test('every', () => {
      const every = values.every((val) => val);
      expect(every).toBeFalsy();
    });

    test('some', () => {
      const some = values.some((val) => val);
      expect(some).toBeTruthy();
    });
  });
});
