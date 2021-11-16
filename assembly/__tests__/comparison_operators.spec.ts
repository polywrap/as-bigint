import { BigInt } from "../BigInt";

describe("Comparison operations", () => {
  it("Compares equal positive numbers", () => {
    // equals
    const intA = "100000000000000000000000000000000000000000000000000";
    const intB = "100000000000000000000000000000000000000000000000000";
    const biA = BigInt.fromString(intA);
    const biB = BigInt.fromString(intB);
    expect(biA.eq(biB)).toStrictEqual(true);
    expect(biA.lt(biB)).toStrictEqual(false);
    expect(biA.lte(biB)).toStrictEqual(true);
    expect(biA.gt(biB)).toStrictEqual(false);
    expect(biA.gte(biB)).toStrictEqual(true);
  });

  it("Compares unequal positive numbers", () => {
    // less than, greater than
    const intC = "100000000000000000000000000000000000000000000000000";
    const intD = "10000000000000000000000000000000000000000000000000";
    const biC = BigInt.fromString(intC);
    const biD = BigInt.fromString(intD);
    // greater compared to lesser
    expect(biC.eq(biD)).toStrictEqual(false);
    expect(biC.lt(biD)).toStrictEqual(false);
    expect(biC.lte(biD)).toStrictEqual(false);
    expect(biC.gt(biD)).toStrictEqual(true);
    expect(biC.gte(biD)).toStrictEqual(true);
    // lesser compared to greater
    expect(biD.lt(biC)).toStrictEqual(true);
    expect(biD.lte(biC)).toStrictEqual(true);
    expect(biD.gt(biC)).toStrictEqual(false);
    expect(biD.gte(biC)).toStrictEqual(false);
  });

  it("Compares equal negative numbers", () => {
    // negative equality
    const intA = "-100000000000000000000000000000000000000000000000000";
    const intB = "-100000000000000000000000000000000000000000000000000";
    const biA = BigInt.fromString(intA);
    const biB = BigInt.fromString(intB);
    expect(biA.eq(biB)).toStrictEqual(true);
    expect(biA.lt(biB)).toStrictEqual(false);
    expect(biA.lte(biB)).toStrictEqual(true);
    expect(biA.gt(biB)).toStrictEqual(false);
    expect(biA.gte(biB)).toStrictEqual(true);
  });

  it("Compares unequal negative numbers", () => {
    // both numbers are negative
    const intC = "-10000000000000000000000000000000000000000000000000";
    const intD = "-100000000000000000000000000000000000000000000000000";
    const biC = BigInt.fromString(intC);
    const biD = BigInt.fromString(intD);
    // greater compared to lesser
    expect(biC.eq(biD)).toStrictEqual(false);
    expect(biC.lt(biD)).toStrictEqual(false);
    expect(biC.lte(biD)).toStrictEqual(false);
    expect(biC.gt(biD)).toStrictEqual(true);
    expect(biC.gte(biD)).toStrictEqual(true);
    // lesser compared to greater
    expect(biD.lt(biC)).toStrictEqual(true);
    expect(biD.lte(biC)).toStrictEqual(true);
    expect(biD.gt(biC)).toStrictEqual(false);
    expect(biD.gte(biC)).toStrictEqual(false);
  });

  it("Compares unequal numbers with opposite signs", () => {
    // one negative number
    const intE = "100000000000000000000000000000000000000000000000000";
    const intF = "-100000000000000000000000000000000000000000000000000";
    const biE = BigInt.fromString(intE);
    const biF = BigInt.fromString(intF);
    // greater compared to lesser
    expect(biE.eq(biF)).toStrictEqual(false);
    expect(biE.lt(biF)).toStrictEqual(false);
    expect(biE.lte(biF)).toStrictEqual(false);
    expect(biE.gt(biF)).toStrictEqual(true);
    expect(biE.gte(biF)).toStrictEqual(true);
    // lesser compared to greater
    expect(biF.lt(biE)).toStrictEqual(true);
    expect(biF.lte(biE)).toStrictEqual(true);
    expect(biF.gt(biE)).toStrictEqual(false);
    expect(biF.gte(biE)).toStrictEqual(false);
  });
});
