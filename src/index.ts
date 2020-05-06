export default class MaFP<K, V> extends Map<K, V> {
  /**
   * MaFP is a Map with native `filter`, `map`,`reduce`, `every`, and `some` methods.
   * @param args Array of tuples [T, V][] to be inserted in order into the MaFP
   */
  constructor(args?: [K, V][]) {
    super(args);
  }

  static clone<K, V, T extends Map<K, V>>(toClone: T): MaFP<K, V> {
    const _clone = new MaFP<K, V>();
    // We could have just used the spread operator new MaFP<K, V>([...map]);
    // but its faster to not create the array first
    for (const elem of toClone) {
      _clone.set(elem[0], elem[1]);
    }
    return _clone;
  }

  static union<K, V, T extends Map<K, V>>(mapA: T, mapB: T): MaFP<K, V> {
    const _union = MaFP.clone<K, V, T>(mapA);
    for (const elem of mapB) {
      _union.set(elem[0], elem[1]);
    }
    return _union;
  }

  static intersection<K, V, T extends Map<K, V>>(mapA: T, mapB: T): MaFP<K, V> {
    const _intersection = new MaFP<K, V>();
    for (const elem of mapB) {
      const entry = mapA.get(elem[0]);
      if (entry && entry === elem[1]) {
        _intersection.set(elem[0], elem[1]);
      }
    }
    return _intersection;
  }

  static symmetricDifference<K, V, T extends Map<K, V>>(
    mapA: T,
    mapB: T,
  ): MaFP<K, V> {
    const _difference = MaFP.clone<K, V, T>(mapA);
    for (const elem of mapB) {
      const entry = _difference.get(elem[0]);
      if (entry && entry === elem[1]) {
        _difference.delete(elem[0]);
      } else {
        _difference.set(elem[0], elem[1]);
      }
    }
    return _difference;
  }

  static difference<K, V, T extends Map<K, V>>(mapA: T, mapB: T): MaFP<K, V> {
    const _difference = MaFP.clone<K, V, T>(mapA);
    for (const elem of mapB) {
      const entry = _difference.get(elem[0]);
      if (entry && entry === elem[1]) {
        _difference.delete(elem[0]);
      }
    }
    return _difference;
  }

  private _map<T>(fn: FnSig<K, V, T>, op: (key: K, value: T) => void): void {
    this.forEach((val, key) => {
      op(key, fn(val, key, this));
    });
  }

  /**
   * Calls a defined callback function on each element of the MaFP, and returns a new MaFP that contains the results.
   * @param fn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the MaFP.
   */
  map<T>(fn: FnSig<K, V, T>): MaFP<K, T> {
    const res = new MaFP<K, T>();
    this._map<T>(fn, (key: K, val: T) => res.set(key, val));
    return res;
  }

  /**
   * Calls a defined callback function on each element of the MaFP, and returns an array that contains the results.
   * @param fn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the MaFP.
   */
  mapToArray<T>(fn: FnSig<K, V, T>): [K, T][] {
    const res: [K, T][] = [];
    this._map<T>(fn, (key: K, val: T) => res.push([key, val]));
    return res;
  }

  private _filter(
    fn: FnSig<K, V, boolean>,
    op: (key: K, value: V) => void,
  ): void {
    this.forEach((val, key) => {
      if (fn(val, key, this)) op(key, val);
    });
  }

  /**
   * Returns the elements of the MaFP that meet the condition specified in the callback function.
   * @param fn A function that accepts up to three arguments. The filter method calls the callback function one time for each element in the MaFP.
   */
  filter(fn: FnSig<K, V, boolean>): MaFP<K, V> {
    const res = new MaFP<K, V>();
    this._filter(fn, (key: K, val: V) => res.set(key, val));
    return res;
  }

  /**
   * Returns an array of tuples [K,V][] with the elements of the MaFP that meet the condition specified in a callback function.
   * @param fn A function that accepts up to three arguments. The filter method calls the callback function one time for each element in the MaFP.
   */
  filterToArray(fn: FnSig<K, V, boolean>): [K, V][] {
    const res: [K, V][] = [];
    this._filter(fn, (key: K, val: V) => res.push([key, val]));
    return res;
  }

  /**
   * Calls the specified callback function for all the elements in the MaFP. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param fn A function that accepts up to four arguments. The reduce method calls the callback function one time for each element in the MaFP.
   * @param accumulator If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callback function provides this value as an argument instead of an element.
   */
  reduce<T>(
    fn: (accumulator: T, value: V, key: K, map: MaFP<K, V>) => T,
    accumulator: T,
  ): T {
    this.forEach((val, key) => {
      accumulator = fn(accumulator, val, key, this);
    });
    return accumulator;
  }

  /**
   * The every method calls the callback function for each element in the MaFP until the callback returns a value which is coercible to the Boolean value false, or until the last element of the MaFP.
   * @param fn A function that accepts up to three arguments that is applied to every element and determines whether all the members satisfy the specified test.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   */
  every(fn: FnSig<K, V, unknown>, thisArg?: unknown): boolean {
    for (const entry of this) {
      if (!fn.call(thisArg, entry[1], entry[0], this)) {
        return false;
      }
    }
    return true;
  }

  /**
   * The some method calls the callback function for each element in the MaFP until the callback returns a value which is coercible to the Boolean value true, or until the last element of the MaFP.
   * @param fn A function that accepts up to three arguments that is applied to every element and determines whether all the members satisfy the specified test.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   */
  some(fn: FnSig<K, V, unknown>, thisArg?: unknown): boolean {
    for (const entry of this) {
      if (fn.call(thisArg, entry[1], entry[0], this)) {
        return true;
      }
    }
    return false;
  }

  private _defineProperties<T>(
    iterableFn: () => IterableIterator<T>,
  ): KeyOrValue<T> {
    const iterable = iterableFn();
    const config = {
      filterToArray: {
        value: (fn: (key: T) => boolean): T[] => {
          const keys: T[] = [];
          for (const key of iterableFn()) {
            if (fn(key)) {
              keys.push(key);
            }
          }
          return keys;
        },
        enumerable: false,
        configurable: false,
      },
      mapToArray: {
        value: <M>(fn: (key: T) => M): M[] => {
          const keys: M[] = [];
          for (const key of iterableFn()) {
            keys.push(fn(key));
          }
          return keys;
        },
        enumerable: false,
        configurable: false,
      },
      reduce: {
        value: <A>(fn: (acc: A, val: T) => A, accumulator: A): A => {
          for (const key of iterableFn()) {
            accumulator = fn(accumulator, key);
          }
          return accumulator;
        },
        enumerable: false,
        configurable: false,
      },
      every: {
        value: (fn: (val: T) => unknown): boolean => {
          for (const key of iterableFn()) {
            if (!fn(key)) return false;
          }
          return true;
        },
        enumerable: false,
        configurable: false,
      },
      some: {
        value: (fn: (val: T) => unknown): boolean => {
          for (const key of iterableFn()) {
            if (fn(key)) return true;
          }
          return false;
        },
        enumerable: false,
        configurable: false,
      },
    };
    Object.defineProperties(iterable, config);
    return iterable as KeyOrValue<T>;
  }

  keys(): KeyOrValue<K> {
    return this._defineProperties(() => super.keys());
  }

  values(): KeyOrValue<V> {
    return this._defineProperties(() => super.values());
  }

  clone(): MaFP<K, V> {
    const _clone = new MaFP<K, V>();
    // We could have just used the spread operator new MaFP<K, V>([...map]);
    // but its faster to not create the array first
    for (const elem of this) {
      _clone.set(elem[0], elem[1]);
    }
    return _clone;
  }

  isSuperset<T extends Map<K, V>>(subset: T): boolean {
    for (const elem of subset) {
      const entry = this.get(elem[0]);
      if (!entry || entry !== elem[1]) {
        return false;
      }
    }
    return true;
  }

  union<T extends Map<K, V>>(otherMap: T): MaFP<K, V> {
    const _union = this.clone();
    for (const elem of otherMap) {
      _union.set(elem[0], elem[1]);
    }
    return _union;
  }

  intersection<T extends Map<K, V>>(otherMap: T): MaFP<K, V> {
    const _intersection = new MaFP<K, V>();
    for (const elem of otherMap) {
      const entry = this.get(elem[0]);
      if (entry && entry === elem[1]) {
        _intersection.set(elem[0], elem[1]);
      }
    }
    return _intersection;
  }

  symmetricDifference<T extends Map<K, V>>(otherMap: T): MaFP<K, V> {
    const _difference = this.clone();
    for (const elem of otherMap) {
      const entry = _difference.get(elem[0]);
      if (entry && entry === elem[1]) {
        _difference.delete(elem[0]);
      } else {
        _difference.set(elem[0], elem[1]);
      }
    }
    return _difference;
  }

  difference<T extends Map<K, V>>(otherMap: T): MaFP<K, V> {
    const _difference = this.clone();
    for (const elem of otherMap) {
      const entry = _difference.get(elem[0]);
      if (entry && entry === elem[1]) {
        _difference.delete(elem[0]);
      }
    }
    return _difference;
  }
}

interface KeyOrValue<T> extends IterableIterator<T> {
  filterToArray: (fn: (val: T) => boolean) => T[];
  mapToArray: <M>(fn: (val: T) => M) => M[];
  reduce: <A>(fn: (acc: A, val: T) => A, acc: A) => A;
  every: (fn: (val: T) => unknown) => boolean;
  some: (fn: (val: T) => unknown) => boolean;
}

interface FnSig<K, V, T> {
  (val: V, key: K, map: MaFP<K, V>): T;
}
