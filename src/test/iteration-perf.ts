console.time("APP");
const testMap = new Map();

console.log("Setting up");

for (let i = 0; i < 1000000; i++) {
  testMap.set(i, i.toString());
}
console.log("Testing..\n");

console.time("forEach");
testMap.forEach(function (value, key) {
    
});
console.timeEnd("forEach");

console.time("entry");
for (let entry of testMap) {
  
}
console.timeEnd("entry");


console.time("destructure");
for (let [key, value] of testMap) {
  
}
console.timeEnd("destructure");


console.time("local");
for (let entry of testMap) {
  let key = entry[0];
  let value = entry[1];
}
console.timeEnd("local");

console.timeEnd("APP");
