import MaFP from "./index";
const test = new MaFP<string, boolean>([
  ["A", true],
  ["B", false],
  ["C", true],
  ["D", true],
]);

const resFilterMap = test.filter(val => val);
const resFilterArr = test.filterToArray(val => val);
const resMapMap = test.map(val => !val);
const resMapArr = test.mapToArray(val => !val);
const reduce = test.reduce((acc, curr) => acc + Number(curr), 0);

console.log(resFilterMap);
console.log(resFilterArr);
console.log(resMapMap);
console.log(resMapArr);
console.log(reduce);
