import {BigFloat} from "../BigFloat";
import {BigInt} from "../BigInt";

describe("Construction from string", () => {

  it("Constructs from radix 10 string", () => {
    let arr: string[] = [
      "100.12",
      "0.452346346",
      "0.3252352",
      "3257235.2305829",
      "2.352358293852353252",
      "3259235823280734598273407234235353125134634513523513451235325.234231"
    ]
    for (let i = 0; i < arr.length; i++) {
      const str: string = arr[i];
      const bigFloat: BigFloat = BigFloat.fromString(str);
      expect(bigFloat.toString()).toStrictEqual(str);
    }
  });
});

describe("outputs to string", () => {

  it("pads with leading zero when number < 1", () => {
    const str: string = ".2523523";
    const bigFloat: BigFloat = BigFloat.fromString(str);
    expect(bigFloat.toString()).toStrictEqual("0" + str);
  });

  it("prints with requested precision", () => {
    const str: string = "32523523.2523523876898768968758746536366758876969980005079946476535";
    const bigFloat: BigFloat = BigFloat.fromString(str);
    expect(bigFloat.toString(18)).toStrictEqual("32523523.252352387689876896");
    expect(bigFloat.toString(23)).toStrictEqual("32523523.25235238768987689687587");
    expect(bigFloat.toString(6)).toStrictEqual("32523523.252352");
  });

});

describe("Construction from fractions", () => {

  it("Constructs from fraction", () => {
    let numerator = BigInt.fromString("18658916385618365863858623756183648536");
    let denominator = BigInt.fromString("392759342592734985793728970589475309737437958374985");
    const bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString()).toStrictEqual("0.000000000000047507");
  });

});