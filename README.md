[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nicholasjpaterno/mafp/Node.js%20CI?style=for-the-badge)](https://github.com/nicholasjpaterno/mafp/actions)
[![GitHub issues](https://img.shields.io/github/issues/nicholasjpaterno/mafp?style=for-the-badge)](https://github.com/nicholasjpaterno/mafp/issues)
[![GitHub forks](https://img.shields.io/github/forks/nicholasjpaterno/mafp?style=for-the-badge)](https://github.com/nicholasjpaterno/mafp/network)
[![GitHub stars](https://img.shields.io/github/stars/nicholasjpaterno/mafp?style=for-the-badge)](https://github.com/nicholasjpaterno/mafp/stargazers)
[![GitHub license](https://img.shields.io/github/license/nicholasjpaterno/mafp?style=for-the-badge)](https://github.com/nicholasjpaterno/mafp/blob/master/LICENSE)

# MaFP
`Map` object with native `filter`, `map`,`reduce`, `every`, and `some` methods. Zero Dependencies.

https://www.npmjs.com/package/mafp

### Motivation
Maps don’t have these methods natively.  One would first need to copy an iterator into an array `[...iterator]` before using `.map`, `.filter`, `.reduce`.  MaFP allows you to use those methods natively.

## Installation
```bash
npm install mafp
```
###  OR
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
import MaFP from "mafp";

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
MaFP [Map] { 'A' => true, 'C' => true, 'D' => true }

test.filterToArray(val => val);
[ 'A', true ], [ 'C', true ], [ 'D', true ] ]

test.map(val => !val);
MaFP [Map] { 'A' => false, 'B' => true, 'C' => false, 'D' => false }

test.mapToArray(val => !val);
[ [ 'A', false ], [ 'B', true ], [ 'C', false ], [ 'D', false ] ]

test.reduce((acc, curr) => acc + Number(curr), 0);
3

test.every(val => val);
false

test.some(val => val);
true

test.isSuperset(new MaFP([
  ["A", true],
  ["B", false]
]))
true
```

Also works with `.keys()` and `.values()`:
```javascript
test.keys().filter(key => key !== 'B');
[ 'A', 'C', 'D' ]

// ETC...
```
