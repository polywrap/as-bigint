import {BigInt} from "../BigInt";
import {testCases} from "./TestCase";

describe("Algebraic operations", () => {

  it("finds the square root", () => {
    // Square root with large, keyboard-mashed random numbers
    const biA = BigInt.fromString("3057858124145219824908823108730476996787211345099474372535994731984517835859426295382779155662045288853072702726904352842299084952356");
    expect(biA.sqrt().toString()).toStrictEqual("1748673246820348602804623476982897439256983468762846982060929060934");

    const biB = BigInt.fromString("38885979355701890764931367009156654082153602597277005998068110746569");
    expect(biB.sqrt().toString()).toStrictEqual("6235862358623856826358623875623587");

    const biC = BigInt.fromString("707011018755142370596690561440450269690829465205449797047996582731278317572133241312051335080724863504");
    expect(biC.sqrt().toString()).toStrictEqual("840839472643347286973460987678476578370923859325252");

    const biD = BigInt.fromString("9684501981285124231672521053664615343720375041608711602989505225");
    expect(biD.sqrt().toString()).toStrictEqual("98409867296349527348967348435235");
  });

  it("throws on square root of negative number", () => {
    // try sqrt negative number
    const badSqrt = (): void => {
      const biE = BigInt.fromString("-9684501981285124231672521053664615343720375041608711602989505225");
      const shouldThrow = biE.sqrt();
    }
    expect(badSqrt).toThrow("Square root of negative numbers is not supported");
  });

  it("exponentiates", () => {
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const x = BigInt.fromString(testCase.x);
      const actual = x.pow(3);
      const expected = testCase.xCube;
      expect(actual.toString()).toStrictEqual(expected);
    }
  });

  it("squares then square roots", () => {
    // square then square root
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const x = BigInt.fromString(testCase.x);
      const actualSquare = x.pow(2);
      const expectedSquare = testCase.xSquare;
      expect(actualSquare.toString()).toStrictEqual(expectedSquare);
      const actualRoot = actualSquare.sqrt();
      // convert to and from BigInt to clear leading zeros in one of the test cases
      let expectedRoot = BigInt.fromString(testCase.x).toString();
      if (expectedRoot.charAt(0) == "-") {
        expectedRoot = expectedRoot.substring(1);
      }
      expect(actualRoot.toString()).toStrictEqual(expectedRoot);
    }
  });

  it("y^4 then square root x2", () => {
    // square then square root
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const y = BigInt.fromString(testCase.y);
      const actualQuad = y.pow(4);
      const expectedQuad= testCase.yQuad;
      expect(actualQuad.toString()).toStrictEqual(expectedQuad);
      const actualRoot = actualQuad.sqrt().sqrt();
      // convert to and from BigInt to clear leading zeros in one of the test cases
      let expectedRoot = BigInt.fromString(testCase.y).toString();
      if (expectedRoot.charAt(0) == "-") {
        expectedRoot = expectedRoot.substring(1);
      }
      expect(actualRoot.toString()).toStrictEqual(expectedRoot);
    }
  });

});