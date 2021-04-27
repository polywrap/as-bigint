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
    const bigStr = "1920734860973489679380478602748697203476023473268723658762375687";
    const bigIntBigStr = BigInt.fromString(bigStr);
    expect(bigIntBigStr.toString()).toStrictEqual(bigStr);
    expect(bigIntBigStr.isNegative).toStrictEqual(false);

    // construct with negative big integer
    const bigStrNeg = "-98759802379526395273987589723907589326578268756732965892930759832";
    const bigIntBigStrNeg = BigInt.fromString(bigStrNeg);
    expect(bigIntBigStrNeg.toString()).toStrictEqual(bigStrNeg);
    expect(bigIntBigStrNeg.isNegative).toStrictEqual(true);
  });

});

describe("Construction from Uint16, Uint32, Uint64", () => {

  it("Constructs from u16", () => {
    const maxValue: u16 = U16.MAX_VALUE
    const biMaxValue = BigInt.fromUInt16(maxValue);
    expect(biMaxValue.toString()).toStrictEqual(U16.MAX_VALUE.toString());
    expect(biMaxValue.isNegative).toStrictEqual(false);

    const zero: u16 = 0
    const zeroBI = BigInt.fromUInt16(zero);
    expect(zeroBI.toString()).toStrictEqual("0");
    expect(zeroBI.isNegative).toStrictEqual(false);

    const one: u16 = 1
    const biOne = BigInt.fromUInt16(one);
    expect(biOne.toString()).toStrictEqual("1");
    expect(biOne.isNegative).toStrictEqual(false);
  });

  it("Constructs from u32", () => {
    const maxValue: u32 = U32.MAX_VALUE
    const biMaxValue = BigInt.fromUInt32(maxValue);
    expect(biMaxValue.toString()).toStrictEqual(U32.MAX_VALUE.toString());
    expect(biMaxValue.isNegative).toStrictEqual(false);

    const zero: u32 = 0
    const zeroBI = BigInt.fromUInt32(zero);
    expect(zeroBI.toString()).toStrictEqual("0");
    expect(zeroBI.isNegative).toStrictEqual(false);

    const one: u32 = 1
    const biOne = BigInt.fromUInt32(one);
    expect(biOne.toString()).toStrictEqual("1");
    expect(biOne.isNegative).toStrictEqual(false);
  });

  it("Constructs from u64", () => {
    const maxValue: u64 = U64.MAX_VALUE
    const biMaxValue = BigInt.fromUInt64(maxValue);
    expect(biMaxValue.toString()).toStrictEqual(U64.MAX_VALUE.toString());
    expect(biMaxValue.isNegative).toStrictEqual(false);

    const zero: u64 = 0
    const zeroBI = BigInt.fromUInt64(zero);
    expect(zeroBI.toString()).toStrictEqual("0");
    expect(zeroBI.isNegative).toStrictEqual(false);

    const one: u64 = 1
    const biOne = BigInt.fromUInt64(one);
    expect(biOne.toString()).toStrictEqual("1");
    expect(biOne.isNegative).toStrictEqual(false);
  });

});

describe("Constructor exceptions", () => {

  it("throws on letter input", () => {
    const letterConstruct = (): void => {
      const bi = BigInt.fromString("jladsgkl");
    }
    expect(letterConstruct).toThrow();
  });

});

describe("radix N read and write", () => {

  // 0x9F59E5Ed123C10D57E92629612511b14628D2799

  it("reads and writes radix 16 (hex) strings", () => {
    const radixString = "9F59E5Ed123C10D57E92629612511b14628D2799";
    const bi = BigInt.fromString(radixString, 16);
    expect(bi.toString()).toStrictEqual("909734328268297026340529402491323712408491206553");
    expect(bi.toString(16)).toStrictEqual(radixString.toLowerCase());
  });

});