console.time("APP");
const testMap = new Map();

console.log("Setting up");

for (let i = 0; i < 1000000; i++) {
  testMap.set(i, i.toString());
}
console.log("Testing..\n");

console.time("forEach");
testMap.forEach(function (_value, _key) {
    
});
console.timeEnd("forEach");

console.time("entry");
for (let _entry of testMap) {
  
}
console.timeEnd("entry");


console.time("destructure");
for (let [_key, _value] of testMap) {
  
}
console.timeEnd("destructure");


console.time("local");
for (let entry of testMap) {
  let _key = entry[0];
  let _value = entry[1];
}
console.timeEnd("local");

console.timeEnd("APP");
