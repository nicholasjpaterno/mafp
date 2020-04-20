const MaFP = require("./index");
const test = new MaFP();
test.set("A", true);
test.set("B", false);
test.set("C", true);
test.set("D", true);

const resFilterMap = test.filter(val => val);
const resFilterArr = test.filterToArray(val => val);
const resMapMap = test.map(val => !val);
const resMapArr = test.mapToArray(val => !val);
const reduce = test.reduce((acc, curr) => acc + curr, 0);

console.log(resFilterMap);
console.log(resFilterArr);
console.log(resMapMap);
console.log(resMapArr);
console.log(reduce);
