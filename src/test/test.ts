import MaFP from '../index';
const test = new MaFP([
  ['A', true],
  ['B', false],
  ['C', true],
  ['D', true],
]);

const resFilterMap = test.filter((val) => val);
const resFilterArr = test.filterToArray((val) => val);
const resMapMap = test.map((val) => !val);
const resMapArr = test.mapToArray((val) => !val);
const reduce = test.reduce((acc, curr) => acc + Number(curr), 0);
const every = test.every((val) => val);
const some = test.some((val) => val);

console.log(resFilterMap);
console.log(resFilterArr);
console.log(resMapMap);
console.log(resMapArr);
console.log(reduce);
console.log(every);
console.log(some);

const loops = [10, 100, 1000, 10000, 100000, 1000000];

const sleep = (time = 1000): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, time));

const run = (): void => {
  for (const loop of loops) {
    const obj: { [key: string]: boolean } = {};
    const mafp = new MaFP<number, boolean>();
    sleep(100);
    for (let i = 0; i < loop; i++) {
      const val = !!i;
      mafp.set(i, val);
      obj[i] = val;
    }
    sleep(1000);
    console.time(`${loop} obj entries`);
    Object.entries(obj).filter((entry) => entry[1]);
    // Object.keys(obj).filter(val => obj[val]);
    console.timeEnd(`${loop} obj entries`);
    sleep(1000);
    console.time(`${loop} mafp entries`);
    mafp.filter((val) => val);
    console.timeEnd(`${loop} mafp entries`);
    sleep(1000);
  }
};

run();

const testKeys = test.keys();
console.log(testKeys);
const resKeys = testKeys.filterToArray((val) => !!val);
console.log(resKeys);

for (const iterator of testKeys) {
  console.log(iterator);
}

const testVals = test.values();
console.log(testVals);
const res = testVals.filterToArray((val) => !!val);
console.log(res);

for (const iterator of testVals) {
  console.log(iterator);
}
