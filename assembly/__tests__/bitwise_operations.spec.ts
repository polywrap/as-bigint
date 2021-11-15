import { BigInt } from "../BigInt";
//3:26

// randomly sort array in place
function shuffle<T>(a: Array<T>): void {
  const n: i32 = a.length;
  for (let i = 0; i < a.length; i++) {
    const r: i32 = <i32>(i + Math.floor(Math.random() * (n - i)));
    const temp = a[i];
    a[i] = a[r];
    a[r] = temp;
  }
}

const testCases: i64[] = [
  0,
  1,
  -1,
  I64.MAX_VALUE,
  I64.MIN_VALUE,
  <i64>I32.MAX_VALUE,
  <i64>I32.MIN_VALUE,
  -3656982829845617290,
  2861570089291776118,
  -5591176433466254447,
  -3005351838902820385,
  -6274130737887377884,
  9106793868942385243,
  5924226101224516928,
  -1168056952193618528,
  71503691004498983,
  3083875439881088847,
];

describe("Bitwise operations", () => {
  it("bitwise NOT", () => {
    for (let i = 0; i < testCases.length - 1; i++) {
      const int: i64 = testCases[i];
      const bi: BigInt = BigInt.fromString(int.toString());
      expect(BigInt.bitwiseNot(bi).toInt64()).toStrictEqual(~int);
    }
  });

  it("bitwise AND", () => {
    for (let k = 0; k < 3; k++) {
      shuffle(testCases);
      for (let i = 0; i < testCases.length - 1; i++) {
        const int1: i64 = testCases[i];
        const int2: i64 = testCases[i + 1];
        const bi1: BigInt = BigInt.fromString(int1.toString());
        const bi2: BigInt = BigInt.fromString(int2.toString());
        expect(BigInt.bitwiseAnd(bi1, bi2).toInt64()).toStrictEqual(
          int1 & int2
        );
      }
    }
  });

  it("bitwise OR", () => {
    for (let k = 0; k < 3; k++) {
      shuffle(testCases);
      for (let i = 0; i < testCases.length - 1; i++) {
        const int1: i64 = testCases[i];
        const int2: i64 = testCases[i + 1];
        const bi1: BigInt = BigInt.fromString(int1.toString());
        const bi2: BigInt = BigInt.fromString(int2.toString());
        expect(BigInt.bitwiseOr(bi1, bi2).toInt64()).toStrictEqual(int1 | int2);
      }
    }
  });

  it("bitwise XOR", () => {
    for (let k = 0; k < 3; k++) {
      shuffle(testCases);
      for (let i = 0; i < testCases.length - 1; i++) {
        const int1: i64 = testCases[i];
        const int2: i64 = testCases[i + 1];
        const bi1: BigInt = BigInt.fromString(int1.toString());
        const bi2: BigInt = BigInt.fromString(int2.toString());
        expect(BigInt.bitwiseXor(bi1, bi2).toInt64()).toStrictEqual(
          int1 ^ int2
        );
      }
    }
  });
});
