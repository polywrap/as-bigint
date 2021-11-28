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

describe("Bit shift operations", () => {
  it("right shift handles shifts past zero", () => {
    const a: BigInt = BigInt.fromString(I16.MAX_VALUE.toString());
    const b: i32 = 29;
    expect(a.rightShift(b).toString()).toStrictEqual(BigInt.ZERO.toString());

    const c: BigInt = BigInt.fromString(I16.MIN_VALUE.toString());
    const d: i32 = 29;
    expect(c.rightShift(d).toString()).toStrictEqual(BigInt.NEG_ONE.toString());
  });

  it("right shift 0", () => {
    const a: BigInt = BigInt.fromString("-0xFFFFFFFFFFFFFFFF", 16);
    const b: i32 = 32;
    const expected: string = BigInt.fromString("-0x100000000").toString(16);
    expect(a.rightShift(b).toString(16)).toStrictEqual(expected);
  });

  it("right shift 1", () => {
    const a: BigInt = BigInt.fromString(
      "-25507431480953844704972967720876361174235818"
    );
    const b: i32 = 128;
    expect(a.rightShift(b).toString()).toStrictEqual("-74960");

    const c: BigInt = BigInt.fromString(
      "-25507136738496115906217642097115107115900113"
    );
    const d: i32 = 128;
    expect(c.rightShift(d).toString()).toStrictEqual("-74959");
  });

  it("right shift 2", () => {
    const a: BigInt = BigInt.fromString(
      "-93994560579844054221777395143231145110420138"
    );
    const b: i32 = 128;
    expect(a.rightShift(b).toString()).toStrictEqual("-276226");

    const c: BigInt = BigInt.fromString(
      "-93994265837386325423022069519469891052084433"
    );
    const d: i32 = 128;
    expect(c.rightShift(d).toString()).toStrictEqual("-276225");
  });

  it("right shift 3", () => {
    const a: BigInt = BigInt.fromString(
      "93994560579844054221777395143231145110420138"
    );
    const b: i32 = 128;
    expect(a.rightShift(b).toString()).toStrictEqual(a.divPowTwo(b).toString());

    const c: BigInt = BigInt.fromString(
      "93994265837386325423022069519469891052084433"
    );
    const d: i32 = 128;
    expect(c.rightShift(d).toString()).toStrictEqual(c.divPowTwo(d).toString());
  });

  it("left shift 0", () => {
    const a: BigInt = BigInt.fromString("0xFFFFFFFFFFFFFFFF");
    const b: i32 = 32;
    const expected: BigInt = BigInt.fromString("0xFFFFFFFFFFFFFFFF00000000");
    expect(a.leftShift(b).toString(16)).toStrictEqual(expected.toString(16));
  });

  it("left shift 1", () => {
    const a: BigInt = BigInt.fromString("-255074314809538447");
    const b: i32 = 128;
    expect(a.leftShift(b).toString()).toStrictEqual(
      "-86797291584126329662795037610384099423694437550057848832"
    );

    const c: BigInt = BigInt.fromString("-255071367384961159062176420971");
    const d: i32 = 128;
    expect(c.leftShift(d).toString()).toStrictEqual(
      "-86796288627514849176787787507933874830015166685408322978384000843776"
    );
  });

  it("left shift 2", () => {
    const a: BigInt = BigInt.fromString(
      "93994560579844054221777395143231145110420138"
    );
    const b: i32 = 128;
    expect(a.leftShift(b).toString()).toStrictEqual(
      "31984691551802872875935365428754732408868752335117947616032289519756668612984700928"
    );

    const c: BigInt = BigInt.fromString(
      "93994265837386325423022069519469891052084433"
    );
    const d: i32 = 128;
    expect(c.leftShift(d).toString()).toStrictEqual(
      "31984591256141724825642427191833617609100326214813829850676127900994504777109864448"
    );
  });
});
