# MaFP
`Map` with `.map`, `.filter`, `.reduce` methods.

https://www.npmjs.com/package/mafp

### Motivation
Maps don’t have these methods natively.  One would first need to copy the iterator into an array `[...iterator]` before using `.map`, `.filter`, `.reduce`.  This allows you to use those methods natively on the `Map`.

## Installation
```bash
npm install mafp
```
### OR
```bash
yarn add mafp
```

# Initialize
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

// Diamond notation needed if no arguments are provided
const test = new MaFP<string, boolean>();

// OR with arguments, types are inferred.
const test = new MaFP([
  ["A", true],
  ["B", false],
  ["C", true],
  ["D", true],
]);
```

# Usage
```javascript
test.filter(val => val);
// MaFP [Map] { 'A' => true, 'C' => true, 'D' => true }

test.filterToArray(val => val);
// [ 'A', true ], [ 'C', true ], [ 'D', true ] ]

test.map(val => !val);
// MaFP [Map] { 'A' => false, 'B' => true, 'C' => false, 'D' => false }

test.mapToArray(val => !val);
// [ [ 'A', false ], [ 'B', true ], [ 'C', false ], [ 'D', false ] ]

test.reduce((acc, curr) => acc + Number(curr), 0);
// 3
```
