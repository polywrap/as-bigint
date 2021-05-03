# BigInt
BigInt is an AssemblyScript class for math with arbitrarily large integers.

## Features

- Fast arithmetic operations
- Optimized for numbers with equivalent bit-length of up to 1,0000 bits
- Lightweight
- Immutable instances
- Core operations thoroughly tested

## Getting Started

### Installation
`npm install as-bigint`  
or  
`yarn add as-bigint`

### Quick start

```typescript
import { BigInt } from "as-bigint"

// read BigInt from string
const a: BigInt = BigInt.fromString("193745297349878926345309275287390603279729047130943891478958917983475091793475173497590134709571089374907109387571937458034975817093477309837980579034797");

// fromString and toString methods optionally take a radix argument
const b: BigInt = BigInt.fromString("9F59E5Ed123C10D57E92629612511b14628D2799", 16);

// arithmetic
const sum: BigInt = a.add(b);
const difference: BigInt = a.sub(b);
const product: BigInt = a.mul(b);
const quotient: BigInt = a.div(b);
const remainder: BigInt = a.mod(b);
const squareRoot: BigInt = a.sqrt();
const cubed: BigInt = a.pow(3);

// faster operations when right-side variable is a 32 bit unsigned integer:
const c: u32 = 1234;
const intSum: BigInt = a.addInt(c);
const intDifference: BigInt = a.subInt(c);
const intProduct: BigInt = a.mulInt(c); // mulInt only supports 28 bit intger arguments (max value: 268435456)
const intQuotient: BigInt = a.divInt(c);
const intRemainder: BigInt = a.modInt(c);

// arithmetic bit shifts
const shiftLeft: BigInt = a.mul2();
const shiftLeft3bits: BigInt = a.mulPowTwo(3);
const shiftRight: BigInt = a.div2();
const shiftRight4bits: BigInt = a.divPowTwo(4);

// comparison operations
const isEqual: boolean = a.eq(b);
const isNotEqual: boolean = a.ne(b);
const isLessThan: boolean = a.lt(b);
const isLessThanOrEqualTo: boolean = a.lte(b);
const isGreaterThan: boolean = a.gt(b);
const isGreaterThanOrEqualTo: boolean = a.gte(b);

// binary arithmetic and comparison operations also have static implementations
const staticProduct: BigInt = BigInt.mul(a, b);
const staticIsEqual: boolean = BigInt.eq(a, b);

// instantiate new copy, absolute value, or opposite
const sameNumber: BigInt = a.copy();
const positiveNumber: BigInt = a.abs();
const oppositeSign: BigInt = a.opposite();

// convenience functions
const sizeOfNumber: i32 = a.countBits();
const isZeroNumber: boolean = a.isZero();
const zero: BigInt = BigInt.ZERO;
const one: BigInt = BigInt.ONE;

// even faster constructors for small numbers (max values shown here)
const verySmall: BigInt = BigInt.fromUInt16(65535);
const prettySmall: BigInt = BigInt.fromUInt32(4294967295);
const stillSmall: BigInt = BigInt.fromUInt64(18446744073709551615);
```

## Development Status & Roadmap
![CI](https://github.com/Web3-API/as-bigint/actions/workflows/ci.yaml/badge.svg?branch=main)

### Current Status
Operation | Tests | Optimization
--- | --- | ---
Addition | Implemented | Complete
Subtraction | Implemented | Complete
Multiplication | Implemented | Up to ~1,500 bit numbers
Exponentiation | Implemented | Incomplete
Division | Implemented | Incomplete
Remainder | Implemented | Incomplete
Square root | Implemented | Incomplete
Modular reduction | N/A | Not implemented
Random number generation | N/A | Not implemented
Cryptographic functions | N/A | Not implemented

### TODO List
*Priority based on blockchain-related use case; 1 is highest priority, 5 is lowest*
Task | Description | Priority
--- | --- | ---
Division optimization | A faster division algorithm is already written but does not compile; needs debugging | 1
New square root method | Current square root method only works for integers up to about 1,000 bits | 2
More multiplication optimization | Implement Karatsuba and Tom-Cook three-way multiplication for faster multiplication of numbers larger than 1,500 bits | 3
Modular reduction methods | Currently using division remainder for modulus; Implement Barret reduction, Montgomery reduction, Diminished Radix algorithms | 3
Exponentiation optimization | Current exponentiation uses naive method of looped multiplication; Implement k-ary exponentiation, modular exponentiation algorithms | 3
Squaring optimization | Currently using naive method of looped multiplication; Implement optimized multiplication for squaring | 3
Random number generation | Implement function to generate random integers of arbitrary size | 4
Cryptographic algorithms | Implement functions used for cryptography (e.g., Greatest common divisor, primality tests, sha3) | 5

## Contributing  

### Build  
`yarn build`  

### Test  
`yarn test`  

### Lint
`yarn lint`

To autofix lint errors:
`yarn lint:fix`

## Handling decimal numbers

If you need to work with arbitrarily large decimal numbers, check out as-bigfloat: https://github.com/Web3-API/as-bigfloat. The BigFloat class is built on top of BigInt, is not otherwise performance-optimized, and is still in development. Only the fromString, fromFraction, toString, toFixed, toSignificant, and div (division) functions have been thoroughly tested.

## Acknowledgements

Web3API developed BigInt to use in the development tools we produce for fast, language-agnostic decentralized API development. Web3api allows developers to interact with any web3 protocol from any language, making between-protocol composition easy. Learn more at https://web3api.dev/.

The BigInt method implementations are largely based on *BigNum Math: Implementing Cryptographic Multiple Precision Arithmetic 1st Edition*
by Tom St Denis.

## Contact
Please create an issue in this repository or email kris@dorg.tech
