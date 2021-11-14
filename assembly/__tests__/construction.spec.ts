import { BigInt } from "../BigInt";

// TODO: test radix N input and output

describe("String Construction", () => {
  it("Constructs from radix 10 strings", () => {
    // constructor with small integer
    const smallStr = "100";
    const bigIntSmallStrCon = BigInt.fromString(smallStr);
    expect(bigIntSmallStrCon.toString()).toStrictEqual(smallStr);
    // using fromString static method
    const bigIntSmallStrFrom = BigInt.fromString(smallStr);
    expect(bigIntSmallStrFrom.toString()).toStrictEqual(smallStr);

    // construct with big integer
    const bigStr =
      "1920734860973489679380478602748697203476023473268723658762375687";
    const bigIntBigStr = BigInt.fromString(bigStr);
    expect(bigIntBigStr.toString()).toStrictEqual(bigStr);
    expect(bigIntBigStr.isNegative).toStrictEqual(false);

    // construct with negative big integer
    const bigStrNeg =
      "-98759802379526395273987589723907589326578268756732965892930759832";
    const bigIntBigStrNeg = BigInt.fromString(bigStrNeg);
    expect(bigIntBigStrNeg.toString()).toStrictEqual(bigStrNeg);
    expect(bigIntBigStrNeg.isNegative).toStrictEqual(true);
  });
});

describe("Construction from Uint16, Uint32, Uint64", () => {
  it("Constructs from u16", () => {
    const maxValue: u16 = U16.MAX_VALUE;
    const biMaxValue = BigInt.fromUInt16(maxValue);
    expect(biMaxValue.toString()).toStrictEqual(U16.MAX_VALUE.toString());
    expect(biMaxValue.isNegative).toStrictEqual(false);

    const zero: u16 = 0;
    const zeroBI = BigInt.fromUInt16(zero);
    expect(zeroBI.toString()).toStrictEqual("0");
    expect(zeroBI.isNegative).toStrictEqual(false);

    const one: u16 = 1;
    const biOne = BigInt.fromUInt16(one);
    expect(biOne.toString()).toStrictEqual("1");
    expect(biOne.isNegative).toStrictEqual(false);
  });

  it("Constructs from u32", () => {
    const maxValue: u32 = U32.MAX_VALUE;
    const biMaxValue = BigInt.fromUInt32(maxValue);
    expect(biMaxValue.toString()).toStrictEqual(U32.MAX_VALUE.toString());
    expect(biMaxValue.isNegative).toStrictEqual(false);

    const zero: u32 = 0;
    const zeroBI = BigInt.fromUInt32(zero);
    expect(zeroBI.toString()).toStrictEqual("0");
    expect(zeroBI.isNegative).toStrictEqual(false);

    const one: u32 = 1;
    const biOne = BigInt.fromUInt32(one);
    expect(biOne.toString()).toStrictEqual("1");
    expect(biOne.isNegative).toStrictEqual(false);
  });

  it("Constructs from u64", () => {
    const maxValue: u64 = U64.MAX_VALUE;
    const biMaxValue = BigInt.fromUInt64(maxValue);
    expect(biMaxValue.toString()).toStrictEqual(U64.MAX_VALUE.toString());
    expect(biMaxValue.isNegative).toStrictEqual(false);

    const zero: u64 = 0;
    const zeroBI = BigInt.fromUInt64(zero);
    expect(zeroBI.toString()).toStrictEqual("0");
    expect(zeroBI.isNegative).toStrictEqual(false);

    const one: u64 = 1;
    const biOne = BigInt.fromUInt64(one);
    expect(biOne.toString()).toStrictEqual("1");
    expect(biOne.isNegative).toStrictEqual(false);
  });
});

describe("Constructor exceptions", () => {
  it("throws on letter input", () => {
    const letterConstruct = (): void => {
      const _error = BigInt.fromString("jladsgkl");
    };
    expect(letterConstruct).toThrow();
  });
});

describe("radix N read and write", () => {
  // 0x9F59E5Ed123C10D57E92629612511b14628D2799

  it("reads and writes radix 16 (hex) strings", () => {
    const radixString = "9F59E5Ed123C10D57E92629612511b14628D2799";
    const bi = BigInt.fromString(radixString, 16);
    expect(bi.toString()).toStrictEqual(
      "909734328268297026340529402491323712408491206553"
    );
    expect(bi.toString(16)).toStrictEqual(radixString.toLowerCase());
  });
});

describe("output to int and uint", () => {
  it("outputs to i32", () => {
    const testBits: i32[] = [0, 1, 28, 31];
    for (let i = 0; i < testBits.length; i++) {
      const j: i32 = 2 ** i - 1;
      const bi = BigInt.fromUInt32(<u32>j);
      expect(bi.toInt32()).toStrictEqual(j);
    }

    // throws on overflow
    const overflow = (): void => {
      const tooBig: BigInt = BigInt.fromString(I32.MAX_VALUE.toString()).addInt(
        1
      );
      const _error = tooBig.toInt32();
    };
    expect(overflow).toThrow(
      `Cannot output i32 from an integer that uses ${32} bits`
    );
  });

  it("outputs to u32", () => {
    const testBits: u32[] = [0, 1, 28, 32];
    for (let i = 0; i < testBits.length; i++) {
      const j: u32 = 2 ** <u32>i - 1;
      const bi = BigInt.fromUInt32(j);
      expect(bi.toUInt32()).toStrictEqual(j);
    }

    // throws on overflow
    const overflow = (): void => {
      const tooBig: BigInt = BigInt.fromString(U32.MAX_VALUE.toString()).addInt(
        1
      );
      const _error = tooBig.toUInt32();
    };
    expect(overflow).toThrow(
      `Cannot output u32 from an integer that uses ${33} bits`
    );

    // throws on negative
    const negative = (): void => {
      const tooBig: BigInt = BigInt.fromString(
        U32.MAX_VALUE.toString()
      ).opposite();
      const _error = tooBig.toUInt32();
    };
    expect(negative).toThrow("Cannot cast negative integer to u32");
  });

  it("outputs to i64", () => {
    const testBits: i64[] = [0, 1, 28, 63];
    for (let i = 0; i < testBits.length; i++) {
      const j: i64 = 2 ** <i64>i - 1;
      const bi = BigInt.fromUInt64(<u64>j);
      expect(bi.toInt64()).toStrictEqual(j);
    }

    // throws on overflow
    const overflow = (): void => {
      const tooBig: BigInt = BigInt.fromString(I64.MAX_VALUE.toString()).addInt(
        1
      );
      const _error = tooBig.toInt64();
    };
    expect(overflow).toThrow(
      `Cannot output i64 from an integer that uses ${64} bits`
    );
  });

  it("outputs to u64", () => {
    const testBits: u64[] = [0, 1, 28, 64];
    for (let i = 0; i < testBits.length; i++) {
      const j: u64 = 2 ** <u64>i - 1;
      const bi = BigInt.fromUInt64(j);
      expect(bi.toUInt64()).toStrictEqual(j);
    }

    // throws on overflow
    const overflow = (): void => {
      const tooBig: BigInt = BigInt.fromString(U64.MAX_VALUE.toString()).addInt(
        1
      );
      const _error = tooBig.toUInt64();
    };
    expect(overflow).toThrow(
      `Cannot output u64 from an integer that uses ${65} bits`
    );

    // throws on negative
    const negative = (): void => {
      const tooBig: BigInt = BigInt.fromString(
        U64.MAX_VALUE.toString()
      ).opposite();
      const _error = tooBig.toUInt64();
    };
    expect(negative).toThrow("Cannot cast negative integer to u64");
  });
});
