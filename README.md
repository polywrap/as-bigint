# BigInt
BigInt is an AssemblyScript class for math with arbitrarily large integers.

## Features

- Fast arithmetic operations
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

// generic constructor supports string and all native integer types
const generic: BigInt = BigInt.from(42);
// read BigInt from string
const a: BigInt = BigInt.fromString("19374529734987892634530927528739060327972904713094389147895891798347509179347517");
// fromString and toString methods optionally take a radix argument
const b: BigInt = BigInt.fromString("9F59E5Ed123C10D57E92629612511b14628D2799", 16);
// for hex strings, a radix argument is not required if value is prefixed by 0x (or -0x for negative numbers)
const fromHex: BigInt = BigInt.fromString("0x9F59E5Ed123C10D57E92629612511b14628D2799");

// arithmetic (operator overloads: +, -, *, /, %, **)
const sum: BigInt = a.add(b);
const difference: BigInt = a.sub(b);
const product: BigInt = a.mul(b);
const quotient: BigInt = a.div(b);
const remainder: BigInt = a.mod(b);
const exponential: BigInt = a.pow(3);
const squared: BigInt = a.square();
const squareRoot: BigInt = a.sqrt();
const roundedQuotient: BigInt = a.roundedDiv(b);

// faster operations when right-side variable is a 32 bit unsigned integer:
const c: u32 = 1234;
const intSum: BigInt = a.addInt(c);
const intDifference: BigInt = a.subInt(c);
const intProduct: BigInt = a.mulInt(c);
const intQuotient: BigInt = a.divInt(c);
const intRemainder: BigInt = a.modInt(c);
const intRoundedQuotient: BigInt = a.roundedDivInt(c);

// fast multiply and divide by 2 or power of 2
const mulByTwo: BigInt = a.mul2();
const mulByEight: BigInt = a.mulPowTwo(3);
const divBuTwo: BigInt = a.div2();
const divBySixteen: BigInt = a.divPowTwo(4);

// signed arithmetic bit shifts (operator overloads: <<, >>)
const shiftLeft3bits: BigInt = a.leftShift(3);
const shiftRight4bits: BigInt = a.rightShift(4);

// bitwise operations (operator overloads: ~, &, |, ^)
const not: BigInt = BigInt.bitwiseNot(bigIntA);
const and: BigInt = BigInt.bitwiseAnd(bigIntA, bigIntB);
const or: BigInt = BigInt.bitwiseOr(bigIntA, bigIntB);
const xor: BigInt = BigInt.bitwiseXor(bigIntA, bigIntB);

// comparison operations (operator overloads: ==, !=, <, <=, >, >=)
const isEqual: boolean = a.eq(b);
const isNotEqual: boolean = a.ne(b);
const isLessThan: boolean = a.lt(b);
const isLessThanOrEqualTo: boolean = a.lte(b);
const isGreaterThan: boolean = a.gt(b);
const isGreaterThanOrEqualTo: boolean = a.gte(b);

// binary arithmetic, comparison, and bitwise operators also have static implementations
const staticProduct: BigInt = BigInt.mul(a, b);
const staticIsEqual: boolean = BigInt.eq(a, b);
const staticAnd: boolean = BigInt.bitwiseAnd(a, b);

// instantiate new copy, absolute value, or opposite
const sameNumber: BigInt = a.copy();
const positiveNumber: BigInt = a.abs();
const oppositeSign: BigInt = a.opposite();

// convenience functions
const sizeOfNumber: i32 = a.countBits();
const isZeroNumber: boolean = a.isZero();
const zero: BigInt = BigInt.ZERO;
const one: BigInt = BigInt.ONE;
const negOne: BigInt = BigInt.NEG_ONE;

// even faster constructors for small numbers (max values shown here)
const verySmall: BigInt = BigInt.fromUInt16(65535);
const verySmallSigned: BigInt = BigInt.fromInt16(-65535);
const prettySmall: BigInt = BigInt.fromUInt32(4294967295);
const prettySmallSigned: BigInt = BigInt.fromInt32(-4294967295);
const stillSmall: BigInt = BigInt.fromUInt64(18446744073709551615);
const stillSmallSigned: BigInt = BigInt.fromInt64(-18446744073709551615);

// output to integers
const myInt32: i32 = BigInt.toInt32();
const myInt64: i64 = BigInt.toInt64();
const myUInt32: u32 = BigInt.toUInt32();
const myUInt64: u64 = BigInt.toUInt64();
```

## Development Status & Roadmap
![CI](https://github.com/polywrap/as-bigint/actions/workflows/ci.yaml/badge.svg?branch=main)

### Current Status
Operation | Tests | Optimization
--- | --- | ---
Addition | Implemented | Complete
Subtraction | Implemented | Complete
Multiplication | Implemented | Up to ~1,500 bit numbers
Exponentiation | Implemented | Complete
Division | Implemented | Incomplete
Remainder | Implemented | Incomplete
Square root | Implemented | Complete
Modular reduction | N/A | Not implemented
Random number generation | N/A | Not implemented
Cryptographic functions | N/A | Not implemented

Note that operator overloads `<<`, `>>`, and `**` only support right-hand operands that fit in an i32--i.e. between the range (0, 2147483647].

### TODO List
*Priority based on blockchain-related use case; 1 is highest priority, 5 is lowest*
Task | Description | Priority
--- | --- | ---
Division optimization | A faster division algorithm is needed | 1
Modular reduction methods | Currently using division remainder for modulus; Implement Barret reduction, Montgomery reduction, Diminished Radix algorithms | 3
Random number generation | Implement function to generate random integers of arbitrary size | 4
Cryptographic algorithms | Implement functions used for cryptography (e.g., Greatest common divisor, primality tests, sha3) | 5
More multiplication optimization | Implement Karatsuba and Tom-Cook three-way multiplication for faster multiplication of numbers larger than 1,500 bits | 5

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

If you need to work with arbitrarily large decimal numbers, check out as-bignumber: https://github.com/polywrap/as-bignumber. The BigNumber class is built on top of BigInt for high-performance decimal arithmetic.

## Acknowledgements

Polywrap developed BigInt to use in the development tools we produce for fast, language-agnostic decentralized API development. Polywrap allows developers to interact with any web3 protocol from any language, making between-protocol composition easy. Learn more at https://polywrap.io.

The BigInt method implementations are largely based on *BigNum Math: Implementing Cryptographic Multiple Precision Arithmetic 1st Edition*
by Tom St Denis.

All bitwise operation methods are based on Google's [JSBI](https://github.com/GoogleChromeLabs/jsbi/blob/main/lib/jsbi.ts).

## Contact
Please create an issue in this repository or email kris@dorg.tech
