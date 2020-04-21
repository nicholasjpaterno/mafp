export default class MaFP<K, V> extends Map<K, V> {
  /**
   * MaFP is a Map with native filter, map, and reduce
   * @param args Array of tuples [T, V][] to be inserted in order into the MaFP
   */
  constructor(args?: [K,V][]){
    super(args);
  }

  private _map<T>(fn: (val: V, key:K, map: MaFP<K,V>) => T, op: (key:K, value:T) => void){
    for (const entry of this) {
      const [key, val] = entry;
      op(key, fn(val, key, this));
    }
  }

  map<T>(fn : (val: V, key:K, map: MaFP<K,V>) => T){
    const res = new MaFP<K,T>();
    this._map<T>(fn, (key:K, val:T) => {
      res.set(key, val);
    });
    return res;
  }
  
  mapToArray<T>(fn : (val: V, key:K, map: MaFP<K,V>) => T){
    const res: [K, T][] = [];
    this._map<T>(fn, (key:K, val:T) => {
      res.push([key, val]);
    });
    return res;
  }

  private _filter(fn: (val:V, key: K, map: MaFP<K,V>) => boolean, op: (key:K, value:V) => any){
    for (const entry of this) {
      const [key, val] = entry;
      if(fn(val, key, this)){
        op(key, val);
      }
    }
  }

  filter(fn: (val:V, key: K, map: MaFP<K,V>) => boolean){
    const res = new MaFP<K,V>();
    this._filter(fn, (key:K, val:V) => res.set(key, val));
    return res;
  }
  
  filterToArray(fn: (val:V, key: K, map: MaFP<K,V>) => boolean){
    const res: [K,V][] = [];
    this._filter(fn, (key: K, val: V) => res.push([key, val]));
    return res;
  }

  reduce<T>(fn: (accumulator: T, value: V, key: K, map: MaFP<K, V>) => T, accumulator: T = <T>{}){
    for (const entry of this) {
      const [key, val] = entry;
      accumulator = fn(accumulator, val, key, this);
    }
    return accumulator;
  }
}

// interface Filter {
//   <K,V>(val:V, key: K, map: MaFP<K,V>): boolean
// }

// interface FilterOp {
//   <K,V>(key:K, value:V): any
// }

// interface Accumulator {
//   <K, V, T>(accumulator: T, value: V, key: K, map: MaFP<K, V>) : T
// }
