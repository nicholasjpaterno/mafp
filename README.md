# MaFP
Map with `.map`, `.filter`, `.reduce` methods.

## Installation
```bash
npm install mafp
# OR
yarn add mafp
```

## Initialize
### Javascript
```javascript
const MaFP = require("mafp").default;
const test = new MaFP([
  ["A", true],
  ["B", false],
  ["C", true],
  ["D", true],
]);
```

### TypeScript
```typescript
import MaFP from "./index";
const test = new MaFP<string, boolean>([
  ["A", true],
  ["B", false],
  ["C", true],
  ["D", true],
]);
```

## Usage
```javascript
const resFilterMap = test.filter(val => val);
const resFilterArr = test.filterToArray(val => val);
const resMapMap = test.map(val => !val);
const resMapArr = test.mapToArray(val => !val);
const reduce = test.reduce((acc, curr) => acc + Number(curr), 0);

console.log(resFilterMap); //MaFP [Map] { 'A' => true, 'C' => true, 'D' => true }
console.log(resFilterArr); // [ 'A', true ], [ 'C', true ], [ 'D', true ] ]
console.log(resMapMap); // MaFP [Map] { 'A' => false, 'B' => true, 'C' => false, 'D' => false }
console.log(resMapArr); // [ [ 'A', false ], [ 'B', true ], [ 'C', false ], [ 'D', false ] ]
console.log(reduce); // 3
```
