import {BigFloat} from "../BigFloat";
import {BigInt} from "../BigInt";

describe("BigFloat reads and writes strings", () => {

  it("Constructs from radix 10 string", () => {
    let arr: string[] = [
      "100.12",
      "0.452346346",
      "0.3252352",
      "3257235.2305829",
      "2.352358293852353252",
      "3259235823280734598273407234235353125134634513523513451235325.234231",
      "-3257235.2305829",
      "-0.3252352",
      "3257235",
      "-3257235",
    ]
    for (let i = 0; i < arr.length; i++) {
      const str: string = arr[i];
      const bigFloat: BigFloat = BigFloat.fromString(str);
      expect(bigFloat.toString()).toStrictEqual(str);
    }
  });

  it("Adjusts exponent when reading string with leading or trailing zeros", () => {
    const str1 = "000100.12";
    let bigFloat: BigFloat = BigFloat.fromString(str1);
    expect(bigFloat.toString()).toStrictEqual("100.12");

    const str2 = "00.000452346346";
    bigFloat = BigFloat.fromString(str2);
    expect(bigFloat.toString()).toStrictEqual("0.000452346346");

    const str3 = "3259235823280734598273407234235353125134634513523513451235325.0000234231";
    bigFloat = BigFloat.fromString(str3);
    expect(bigFloat.toString()).toStrictEqual("3259235823280734598273407234235353125134634513523513451235325.0000234231");

    const str4 = "-0003257235.2305829";
    bigFloat = BigFloat.fromString(str4);
    expect(bigFloat.toString()).toStrictEqual("-3257235.2305829");

    const str5 = "-0.32523520000";
    bigFloat = BigFloat.fromString(str5);
    expect(bigFloat.toString()).toStrictEqual("-0.3252352");

    const str6 = "00000325723500000";
    bigFloat = BigFloat.fromString(str6);
    expect(bigFloat.toString()).toStrictEqual("325723500000");

    const str7 = "-.0000454";
    bigFloat = BigFloat.fromString(str7);
    expect(bigFloat.toString()).toStrictEqual("-0.0000454");

  });

  it("pads output with leading zero when number < 1", () => {
    const str: string = ".2523523";
    const bigFloat: BigFloat = BigFloat.fromString(str);
    expect(bigFloat.toString()).toStrictEqual("0" + str);

    const strNeg: string = "-.2523523";
    const bigFloatNeg: BigFloat = BigFloat.fromString(strNeg);
    expect(bigFloatNeg.toString()).toStrictEqual("-0.2523523");
  });

  it("prints output with requested precision", () => {
    const str: string = "32523523.2523523876898768968758746536366758876969980005079946476535";
    const bigFloat: BigFloat = BigFloat.fromString(str);
    expect(bigFloat.toString(18)).toStrictEqual("32523523.252352387689876896");
    expect(bigFloat.toString(23)).toStrictEqual("32523523.25235238768987689687587");
    expect(bigFloat.toString(6)).toStrictEqual("32523523.252352");
    expect(bigFloat.toString(0)).toStrictEqual("32523523");

    const strNeg: string = "-.2523523246973279271980798143097";
    const bigFloatNeg: BigFloat = BigFloat.fromString(strNeg);
    expect(bigFloatNeg.toString(3)).toStrictEqual("-0.252");
    expect(bigFloatNeg.toString(57)).toStrictEqual("-0.2523523246973279271980798143097");
    expect(bigFloatNeg.toString(19)).toStrictEqual("-0.2523523246973279271");
    expect(bigFloatNeg.toString(0)).toStrictEqual("0");
  });

});

describe("BigFloat construction from fractions", () => {

  it("Constructs from fraction", () => {
    let numerator = BigInt.fromString("18658916385618365863858623756183648536");
    let denominator = BigInt.fromString("392759342592734985793728970589475309737437958374985");
    let bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString()).toStrictEqual("0.000000000000047507");

    numerator = BigInt.fromString("23424380928348632480682093860823085208340453452435323");
    denominator = BigInt.fromString("392759342592734985793728970589");
    bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString(10)).toStrictEqual("59640544191047135848576.4672484774");

    numerator = BigInt.fromString("23424380928348632480682093860823085208340453452435323");
    denominator = BigInt.fromString("72865876238658638264726476289309837508973984705983743");
    bigFloat = BigFloat.fromFraction(numerator, denominator, 24);
    expect(bigFloat.toString(24)).toStrictEqual("0.321472575882110101595481");

    numerator = BigInt.fromString("72865876238658638264726476289309837508973984705983743");
    denominator = BigInt.fromString("23424380928348632480682093860823085208340453452435323");
    bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString(15)).toStrictEqual("3.110685249763632");

    numerator = BigInt.fromString("72865876238658638264726476289309837508973984705983743");
    denominator = BigInt.fromString("2342438092834863248068209386082308520834045345243532");
    bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString()).toStrictEqual("31.106852497636326156");

    numerator = BigInt.fromString("23424380928348632480682093860823085208340453452435323");
    denominator = BigInt.fromString("7286587623865863826472647628930983750897398470598374");
    bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString()).toStrictEqual("3.214725758821101015");

    numerator = BigInt.fromString("-35352347978987");
    denominator = BigInt.fromString("899732432");
    bigFloat = BigFloat.fromFraction(numerator, denominator, 29);
    expect(bigFloat.toString(29)).toStrictEqual("-39292.06808784569855318942198584656");

    numerator = BigInt.fromString("-35352347978987");
    denominator = BigInt.fromString("-899732432868687887");
    bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString(15)).toStrictEqual("0.000039292068049");

    numerator = BigInt.fromString("23627");
    denominator = BigInt.fromString("1093746923469083704986");
    bigFloat = BigFloat.fromFraction(numerator, denominator, 30);
    expect(bigFloat.toString(30)).toStrictEqual("0.000000000000000021601889333833");

    numerator = BigInt.fromString("0003452356198560913");
    denominator = BigInt.fromString("3409689346177541");
    bigFloat = BigFloat.fromFraction(numerator, denominator, 30);
    expect(bigFloat.toString(30)).toStrictEqual("1.012513413408527674142557088016");

    numerator = BigInt.fromString("0");
    denominator = BigInt.fromString("-899732432868687887");
    bigFloat = BigFloat.fromFraction(numerator, denominator);
    expect(bigFloat.toString()).toStrictEqual("0");
  });

  it("Constructs from fraction based on random numbers", () => {
    for (let i = 0; i < 100; i++) {
      const numeratorFloat: f64 = Math.random();
      const denominatorFloat: f64 = Math.random();
      const expectedDiv: f64 = numeratorFloat / denominatorFloat;
      const numerator: BigFloat = BigFloat.fromString(numeratorFloat.toString());
      const denominator: BigFloat = BigFloat.fromString(denominatorFloat.toString());
      const actualDiv: BigFloat = numerator.div(denominator);
      expect(actualDiv.toString(16)).toStrictEqual(expectedDiv.toString());
    }

    for (let i = 0; i < 100; i++) {
      const numeratorFloat: f64 = Math.random() * F64.MAX_VALUE;
      const denominatorFloat: f64 = Math.random() * F64.MAX_VALUE;
      const expectedDiv: f64 = numeratorFloat / denominatorFloat;
      const numerator: BigFloat = BigFloat.fromString(numeratorFloat.toString());
      const denominator: BigFloat = BigFloat.fromString(denominatorFloat.toString());
      const actualDiv: BigFloat = numerator.div(denominator);
      expect(actualDiv.toString(16)).toStrictEqual(expectedDiv.toString());
    }

    for (let i = 0; i < 100; i++) {
      const numeratorFloat: f64 = Math.random() * F64.MAX_VALUE;
      const denominatorFloat: f64 = Math.random();
      const expectedDiv: f64 = numeratorFloat / denominatorFloat;
      const numerator: BigFloat = BigFloat.fromString(numeratorFloat.toString());
      const denominator: BigFloat = BigFloat.fromString(denominatorFloat.toString());
      const actualDiv: BigFloat = numerator.div(denominator);
      expect(actualDiv.toString(16)).toStrictEqual(expectedDiv.toString());
    }

    for (let i = 0; i < 100; i++) {
      const numeratorFloat: f64 = Math.random();
      const denominatorFloat: f64 = Math.random() * F64.MAX_VALUE;
      const expectedDiv: f64 = numeratorFloat / denominatorFloat;
      const numerator: BigFloat = BigFloat.fromString(numeratorFloat.toString());
      const denominator: BigFloat = BigFloat.fromString(denominatorFloat.toString());
      const actualDiv: BigFloat = numerator.div(denominator);
      expect(actualDiv.toString(16)).toStrictEqual(expectedDiv.toString());
    }

  });

});
