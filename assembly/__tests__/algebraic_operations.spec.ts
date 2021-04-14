import {BigInt} from "../BigInt";

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

    // try sqrt negative number
    const badSqrt = (): void => {
      const biE = BigInt.fromString("-9684501981285124231672521053664615343720375041608711602989505225");
      const shouldThrow = biE.sqrt();
      return;
    }
    expect(badSqrt).toThrow("Square root of negative numbers is not supported");
  });

});