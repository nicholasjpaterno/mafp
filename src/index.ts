export default class MaFP<K, V> extends Map<K, V> {
  /**
   * MaFP is a Map with native `filter`, `map`,`reduce`, `every`, and `some` methods.
   * @param args Array of tuples [T, V][] to be inserted in order into the MaFP
   */
  constructor(args?: [K, V][]) {
    super(args);
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
    iterable: IterableIterator<T>,
    props: PropertyDescriptorMap,
  ): void {
    const properties = {};
    const defaultConfig = {
      enumerable: false,
      configurable: false,
    };
    for (const key in props) {
      Object.assign(properties, {
        [key]: Object.assign({}, defaultConfig, props[key]),
      });
    }
    Object.defineProperties(iterable, properties);
  }

  keys(): Filter<K> {
    const keys = super.keys();
    this._defineProperties(keys, {
      filterToArray: {
        value: (fn: (key: K) => boolean): K[] => {
          const keys: K[] = [];
          for (const key of super.keys()) {
            if (fn(key)) {
              keys.push(key);
            }
          }
          return keys;
        },
      },
      // filter: {
      //   value: () => {},
      // }
    });
    return keys as Filter<K>;
  }

  values(): Filter<V> {
    const keys = super.values();
    this._defineProperties(keys, {
      filterToArray: {
        value: (fn: (key: V) => boolean): V[] => {
          const keys: V[] = [];
          for (const key of super.values()) {
            if (fn(key)) {
              keys.push(key);
            }
          }
          return keys;
        },
      },
      // filter: {
      //   value: () => {},
      // }
    });
    return keys as Filter<V>;
  }
}

interface Filter<T> extends IterableIterator<T> {
  filterToArray: (fn: (val: T) => boolean) => T[];
}

interface FnSig<K, V, T> {
  (val: V, key: K, map: MaFP<K, V>): T;
}
