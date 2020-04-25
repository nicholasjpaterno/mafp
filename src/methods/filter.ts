// export class Filter<T extends IterableIterator<any>> {
//   constructor(private type: (new () => T)) {
//     super();
//   }

//   private _filter(fn: (val:V, key: K, map: T) => boolean, op: (key:K, value:V) => any){
//     this.forEach((val, key) => {
//         if(fn(val, key, this)) op(key, val);
//     });
//   }

//   /**
//    * Returns the elements of the MaFP that meet the condition specified in the callback function.
//    * @param fn A function that accepts up to three arguments. The filter method calls the callback function one time for each element in the MaFP.
//    */
//   filter(fn: (val:V, key: K, map: T) => boolean){
//     const result = new this.type();
//     this._filter(fn, (key:K, val:V) => result.set(key, val));
//     return result;
//   }
  
//   /**
//    * Returns an array of tuples [K,V][] with the elements of the MaFP that meet the condition specified in a callback function.
//    * @param fn A function that accepts up to three arguments. The filter method calls the callback function one time for each element in the MaFP.
//    */
//   filterToArray(fn: (val:V, key: K, map: MaFP<K,V>) => boolean){
//     const result: [K,V][] = [];
//     this._filter(fn, (key: K, val: V) => result.push([key, val]));
//     return result;
//   }
// }
// Needed for all mixins
type Constructor< K, V, T = {}> = new (args?: [K,V][]) => T;

export function Filter<TBase extends Constructor>(base:TBase) {
  return class extends base {
    /**
     * The some method calls the callback function for each element in the MaFP until the callback returns a value which is coercible to the Boolean value true, or until the last element of the MaFP.
     * @param fn A function that accepts up to three arguments that is applied to every element and determines whether all the members satisfy the specified test.
     * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
     */
    some<K,V>(fn: (val:V, key: K, map: TBase) => any, thisArg?: any){
      for (const entry of this) {
        if(fn.call(thisArg, entry[1], entry[0], this)) {
          return true;
        }
      }
      return false;
    }
  }
}
