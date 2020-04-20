class MaFP extends Map {
  constructor(...args){
    super(...args);
  }

  _map(fn, op){
    for (const entry of this) {
      const [key, val] = entry;
      op(key, fn(val, key, this));
    }
  }

  map(fn){
    const res = new Map();
    this._map(fn, (key, val) => res.set(key, val));
    return res;
  }
  
  mapToArray(fn){
    const res = [];
    this._map(fn, (key, val) => res.push([key, val]));
    return res;
  }

  _filter(fn, op){
    for (const entry of this) {
      const [key, val] = entry;
      if(fn(val, key, this)){
        op(key, val);
      }
    }
  }

  filter(fn){
    const res = new Map();
    this._filter(fn, (key, val) => res.set(key, val));
    return res;
  }
  
  filterToArray(fn){
    const res = [];
    this._filter(fn, (key, val) => res.push([key, val]));
    return res;
  }

  reduce(fn, accumulator){
    for (const entry of this) {
      const [key, val] = entry;
      accumulator = fn(accumulator, val, key, this)
    }
    return accumulator;
  }
}

module.exports = MaFP;
