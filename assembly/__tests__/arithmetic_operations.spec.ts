import { BigInt } from "../BigInt";
import { testCases } from "./TestCase";

describe("BigInt: Arithmetic", () => {
  it("Addition", () => {
    // small integer addition
    const intA = "100";
    const intB = "50";
    const biA = BigInt.fromString(intA);
    const biB = BigInt.fromString(intB);
    expect(biA.add(biB).toString()).toStrictEqual("150");

    // big integer addition
    const intC =
      "1000000000000000000000000000000000000000000000000000000000000000000";
    const intD = "5000000000000000000000000000000000000000000000000";
    const biC = BigInt.fromString(intC);
    const biD = BigInt.fromString(intD);
    expect(biC.add(biD).toString()).toStrictEqual(
      "1000000000000000005000000000000000000000000000000000000000000000000"
    );

    // addition with two negative numbers
    const intE =
      "-1000000000000000000000000000000000000000000000000000000000000000000";
    const intF = "-5000000000000000000000000000000000000000000000000";
    const biE = BigInt.fromString(intE);
    const biF = BigInt.fromString(intF);
    expect(biE.add(biF).toString()).toStrictEqual(
      "-1000000000000000005000000000000000000000000000000000000000000000000"
    );

    // addition with one negative number and one positive number
    const intG =
      "-1000000000000000005000000000000000000000000000000000000000000000000";
    const intH = "5000000000000000000000000000000000000000000000000";
    const biG = BigInt.fromString(intG);
    const biH = BigInt.fromString(intH);
    expect(biG.add(biH).toString()).toStrictEqual(
      "-1000000000000000000000000000000000000000000000000000000000000000000"
    );

    // addition with large, keyboard-mashed random numbers
    const intY = "840839472643347286973460987678476578370923859325252";
    const intZ = "98409867296349527348967348435235";
    const biY = BigInt.fromString(intY);
    const biZ = BigInt.fromString(intZ);
    expect(biY.add(biZ).toString()).toStrictEqual(
      "840839472643347287071870854974826105719891207760487"
    );

    // test cases
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const x = BigInt.fromString(testCase.x);
      const y = BigInt.fromString(testCase.y);
      const actual = x.add(y);
      const expected = testCase.sum;
      expect(actual.toString()).toStrictEqual(expected);
    }
  });

  it("Subtraction", () => {
    // big integer subtraction
    const intA =
      "1000000000000000005000000000000000000000000000000000000000000000000";
    const intB = "5000000000000000000000000000000000000000000000000";
    const biA = BigInt.fromString(intA);
    const biB = BigInt.fromString(intB);
    expect(biA.sub(biB).toString()).toStrictEqual(
      "1000000000000000000000000000000000000000000000000000000000000000000"
    );

    // subtraction of a bigger number from a smaller number and crossing zero to change signs
    const intC = "5000000000000000000000000000000000000000000000000";
    const intD =
      "1000000000000000005000000000000000000000000000000000000000000000000";
    const biC = BigInt.fromString(intC);
    const biD = BigInt.fromString(intD);
    expect(biC.sub(biD).toString()).toStrictEqual(
      "-1000000000000000000000000000000000000000000000000000000000000000000"
    );

    // subtraction with two negative numbers
    const intE =
      "-1000000000000000005000000000000000000000000000000000000000000000000";
    const intF = "-5000000000000000000000000000000000000000000000000";
    const biE = BigInt.fromString(intE);
    const biF = BigInt.fromString(intF);
    expect(biE.sub(biF).toString()).toStrictEqual(
      "-1000000000000000000000000000000000000000000000000000000000000000000"
    );

    // subtraction with one negative number and one positive number
    const intG =
      "-1000000000000000005000000000000000000000000000000000000000000000000";
    const intH = "5000000000000000000000000000000000000000000000000";
    const biG = BigInt.fromString(intG);
    const biH = BigInt.fromString(intH);
    expect(biG.sub(biH).toString()).toStrictEqual(
      "-1000000000000000010000000000000000000000000000000000000000000000000"
    );
    const intI =
      "1000000000000000005000000000000000000000000000000000000000000000000";
    const intJ = "-5000000000000000000000000000000000000000000000000";
    const biI = BigInt.fromString(intI);
    const biJ = BigInt.fromString(intJ);
    expect(biI.sub(biJ).toString()).toStrictEqual(
      "1000000000000000010000000000000000000000000000000000000000000000000"
    );

    // subtraction with large, keyboard-mashed random numbers
    const intY = "840839472643347286973460987678476578370923859325252";
    const intZ = "98409867296349527348967348435235";
    const biY = BigInt.fromString(intY);
    const biZ = BigInt.fromString(intZ);
    expect(biY.sub(biZ).toString()).toStrictEqual(
      "840839472643347286875051120382127051021956510890017"
    );

    // test cases
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const x = BigInt.fromString(testCase.x);
      const y = BigInt.fromString(testCase.y);
      const actual = x.sub(y);
      const expected = testCase.difference;
      expect(actual.toString()).toStrictEqual(expected);
    }
  });

  it("Multiplication", () => {
    // big integer multiplication
    const intA =
      "1748673246820348602804623476982897439256983468762846982060929060934";
    const intB =
      "1000000000000000000000000000000000000000000000000000000000000000000";
    const biA = BigInt.fromString(intA);
    const biB = BigInt.fromString(intB);
    expect(biA.mul(biB).toString()).toStrictEqual(
      "1748673246820348602804623476982897439256983468762846982060929060934000000000000000000000000000000000000000000000000000000000000000000"
    );

    // multiplication with two negative numbers
    const intE = "-78947029734601043986098348634860927985723987523875683269589";
    const intF =
      "-1000000000000000000000000000000000000000000000000000000000000000000";
    const biE = BigInt.fromString(intE);
    const biF = BigInt.fromString(intF);
    expect(biE.mul(biF).toString()).toStrictEqual(
      "78947029734601043986098348634860927985723987523875683269589000000000000000000000000000000000000000000000000000000000000000000"
    );

    // multiplication with opposite signs
    const intG = "-78947029734601043986098348634860927985723987523875683269589";
    const intH =
      "1000000000000000000000000000000000000000000000000000000000000000000";
    const biG = BigInt.fromString(intG);
    const biH = BigInt.fromString(intH);
    expect(biG.mul(biH).toString()).toStrictEqual(
      "-78947029734601043986098348634860927985723987523875683269589000000000000000000000000000000000000000000000000000000000000000000"
    );

    // multiplication with large, keyboard-mashed random numbers
    const intY = "840839472643347286973460987678476578370923859325252";
    const intZ = "98409867296349527348967348435235";
    const biY = BigInt.fromString(intY);
    const biZ = BigInt.fromString(intZ);
    expect(biY.mul(biZ).toString()).toStrictEqual(
      "82746900920364325240080057746476164545617939441639416531994182441731305785122054220"
    );

    // test cases
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const x = BigInt.fromString(testCase.x);
      const y = BigInt.fromString(testCase.y);
      const actual = x.mul(y);
      const expected = testCase.product;
      expect(actual.toString()).toStrictEqual(expected);
    }
  });

  it("Division", () => {
    // division by big integer
    const intE =
      "1748673246820348602804623476982897439256983468762846982060929060934";
    const intF = "1000000000000000000000000000000000000000";
    const biE = BigInt.fromString(intE);
    const biF = BigInt.fromString(intF);
    expect(biE.div(biF).toString()).toStrictEqual(
      "1748673246820348602804623476"
    );

    // division by larger number
    const intG = "6235862358623856826358623875623587";
    const intH =
      "1748673246820348602804623476982897439256983468762846982060929060934";
    const biG = BigInt.fromString(intG);
    const biH = BigInt.fromString(intH);
    expect(biG.div(biH).toString()).toStrictEqual("0");

    // division with large, keyboard-mashed random numbers
    const intW =
      "1748673246820348602804623476982897439256983468762846982060929060934";
    const intX = "6235862358623856826358623875623587";
    const biW = BigInt.fromString(intW);
    const biX = BigInt.fromString(intX);
    expect(biW.div(biX).toString()).toStrictEqual(
      "280422040490042098934906652980388"
    );

    const intY = "840839472643347286973460987678476578370923859325252";
    const intZ = "98409867296349527348967348435235";
    const biY = BigInt.fromString(intY);
    const biZ = BigInt.fromString(intZ);
    expect(biY.div(biZ).toString()).toStrictEqual("8544259795730238462");

    // divide by zero
    const divByZero = (): void => {
      const nonZero = BigInt.fromString(
        "35823842568276438628975286634856582347658628346932865892348763"
      );
      const _error = nonZero.div(BigInt.fromUInt16(0));
    };
    expect(divByZero).toThrow("Divide by zero");

    // test cases
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const x = BigInt.fromString(testCase.x);
      const y = BigInt.fromString(testCase.y);
      if (y.ne(BigInt.fromUInt16(0))) {
        const actual = x.div(y);
        const expected = testCase.quotient;
        expect(actual.toString()).toStrictEqual(expected);
      }
    }
  });

  it("Modulo", () => {
    const intA =
      "1748673246820348602804623476982897439256983468762846982060929060934";
    const intB = BigInt.fromUInt32(1000);
    const biA = BigInt.fromString(intA);
    expect(biA.mod(intB).toString()).toStrictEqual("934");

    const intC =
      "2346723486098230948609234809680924830623486934693035798178094579834709857342786097348979348793487826974309869284709634809760293847680973429786932";
    const intD = BigInt.fromUInt32(26346234);
    const biC = BigInt.fromString(intC);
    expect(biC.mod(intD).toString()).toStrictEqual("26169584");

    const intE =
      "105697141579807349879852798073409832708927897823784178914830990148091970135287935278935178093152879873152981537";
    const intF = BigInt.fromUInt32(34634);
    const biE = BigInt.fromString(intE);
    expect(biE.mod(intF).toString()).toStrictEqual("15525");
  });

  it("Rounded division", () => {
    // division by big integer -> rounds up
    const intA =
      "1748673246820348602804623476982897439256983468762846982060929060934";
    const intB = "1000000000000000000000000000000000000000";
    const biA = BigInt.fromString(intA);
    const biB = BigInt.fromString(intB);
    expect(biA.roundedDiv(biB).toString()).toStrictEqual(
      "1748673246820348602804623477"
    );

    // division by larger number -> rounds to 0
    const intC = "6235862358623856826358623875623587";
    const intD = "17486732468203486028046234769828974";
    const biC = BigInt.fromString(intC);
    const biD = BigInt.fromString(intD);
    expect(biC.roundedDiv(biD).toString()).toStrictEqual("0");

    // division by larger number -> rounds to 1
    const intE = "6235862358623856826358623875623587";
    const intF = "11486732468203486028046234769828974";
    const biE = BigInt.fromString(intE);
    const biF = BigInt.fromString(intF);
    expect(biE.roundedDiv(biF).toString()).toStrictEqual("1");

    // is exactly 0.5 -> rounds to 1
    const intG = "1943759813475";
    const intH = "3887519626950";
    const biG = BigInt.fromString(intG);
    const biH = BigInt.fromString(intH);
    expect(biG.roundedDiv(biH).toString()).toStrictEqual("1");

    // ends in exactly 0.5 -> rounds up
    const intJ = "7882137429";
    const intK = "328758";
    const biJ = BigInt.fromString(intJ);
    const biK = BigInt.fromString(intK);
    expect(biJ.roundedDiv(biK).toString()).toStrictEqual("23976");
    expect(biJ.roundedDivInt(U32.parseInt(intK)).toString()).toStrictEqual(
      "23976"
    );

    // ends in 0.42 -> rounds down
    const intL = "7882137429";
    const intM = "328759";
    const biL = BigInt.fromString(intL);
    const biM = BigInt.fromString(intM);
    expect(biL.roundedDiv(biM).toString()).toStrictEqual("23975");
    expect(biL.roundedDivInt(U32.parseInt(intM)).toString()).toStrictEqual(
      "23975"
    );

    // negative numerator; ends in 0.6 -> rounds up
    const intN = "-34534353535397";
    const intO: u32 = U32.MAX_VALUE;
    const biN = BigInt.fromString(intN);
    const biO = BigInt.fromUInt32(intO);
    expect(biN.roundedDiv(biO).toString()).toStrictEqual("-8041");
    expect(biN.roundedDivInt(intO).toString()).toStrictEqual("-8041");

    // negative numerator and denominator; ends in 0.52 -> rounds up
    const intP = "-34534353535397972";
    const intQ: string = I32.MIN_VALUE.toString();
    const biP = BigInt.fromString(intP);
    const biQ = BigInt.fromString(intQ);
    expect(biP.roundedDiv(biQ).toString()).toStrictEqual("16081312");

    // negative denominator; ends in 0.52 -> rounds up
    const intR = "34534353535397972";
    const intS: string = I32.MIN_VALUE.toString();
    const biR = BigInt.fromString(intR);
    const biS = BigInt.fromString(intS);
    expect(biR.roundedDiv(biS).toString()).toStrictEqual("-16081312");

    // negative numerator; ends in 0.6 -> rounds up
    const intT = "-6";
    const intU: u32 = 10;
    const biT = BigInt.fromString(intT);
    const biU = BigInt.fromUInt32(intU);
    expect(biT.roundedDiv(biU).toString()).toStrictEqual("-1");
    expect(biT.roundedDivInt(intU).toString()).toStrictEqual("-1");

    // negative numerator; ends in 0.4 -> rounds down
    const intV = "-4";
    const intW: u32 = 10;
    const biV = BigInt.fromString(intV);
    const biW = BigInt.fromUInt32(intW);
    expect(biV.roundedDiv(biW).toString()).toStrictEqual("0");
    expect(biV.roundedDivInt(intW).toString()).toStrictEqual("0");

    // divide by zero
    const divByZero = (): void => {
      const nonZero = BigInt.fromString(
        "35823842568276438628975286634856582347658628346932865892348763"
      );
      const _error = nonZero.roundedDiv(BigInt.fromUInt16(0));
    };
    expect(divByZero).toThrow("Divide by zero");
  });
});
