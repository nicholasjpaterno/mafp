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
for (const _entry of testMap) {
  
}
console.timeEnd("entry");


console.time("destructure");
for (const [_key, _value] of testMap) {
  
}
console.timeEnd("destructure");


console.time("local");
for (const entry of testMap) {
  const _key = entry[0];
  const _value = entry[1];
}
console.timeEnd("local");

console.timeEnd("APP");
