import { BigInt } from "../BigInt";
import {TestCase} from "./TestCase";

describe("Constructors", () => {

  it("Constructs from strings", () => {
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

  it("Constructs from i32[]", () => {
    // construct with big integer from digits
    const bigDig: u32[] = [1000, 1000, 1000];
    const bigIntBigDig = BigInt.fromDigits(bigDig);
    expect(bigIntBigDig.toString()).toStrictEqual("1000000001000000001000");
    expect(bigIntBigDig.isNegative).toStrictEqual(false);

    // construct with negative big integer from digits
    const bigIntBigDigNeg = BigInt.fromDigits(bigDig, true);
    expect(bigIntBigDigNeg.toString()).toStrictEqual("-1000000001000000001000");
    expect(bigIntBigDigNeg.isNegative).toStrictEqual(true);
  });

  it("Constructs from i64", () => {
    // construct with big integer from i64
    const bigDig: i64 = I64.MAX_VALUE
    const bigIntBigDig = BigInt.fromInt(bigDig);
    expect(bigIntBigDig.toString()).toStrictEqual(I64.MAX_VALUE.toString());
    expect(bigIntBigDig.isNegative).toStrictEqual(false);

    // construct with negative big integer from digits
    const bigDigNeg: i64 = I64.MIN_VALUE
    const bigIntBigDigNeg = BigInt.fromInt(bigDigNeg);
    expect(bigIntBigDigNeg.toString()).toStrictEqual(I64.MIN_VALUE.toString());
    expect(bigIntBigDigNeg.isNegative).toStrictEqual(true);
  });

  it("produces Math.floor on decimal input", () => {
    const bi = BigInt.fromString("9324670293476.459378389");
    expect(bi.toString()).toStrictEqual("9324670293476");
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