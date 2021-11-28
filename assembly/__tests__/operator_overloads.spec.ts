import { BigInt } from "../BigInt";

describe("Operator overloads", () => {
  it("==", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.eq(biB).toString()).toStrictEqual((biA == biB).toString());
  });

  it("!=", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.ne(biB).toString()).toStrictEqual((biA != biB).toString());
  });

  it(">", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.gt(biB).toString()).toStrictEqual((biA > biB).toString());
  });

  it("<", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.lt(biB).toString()).toStrictEqual((biA < biB).toString());
  });

  it(">=", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.gte(biB).toString()).toStrictEqual((biA >= biB).toString());
  });

  it("<=", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.lte(biB).toString()).toStrictEqual((biA <= biB).toString());
  });

  it("+", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.add(biB).toString()).toStrictEqual((biA + biB).toString());
  });

  it("-", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.sub(biB).toString()).toStrictEqual((biA - biB).toString());
  });

  it("*", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.mul(biB).toString()).toStrictEqual((biA * biB).toString());
  });

  it("/", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.div(biB).toString()).toStrictEqual((biA / biB).toString());
  });

  it("%", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(biA.mod(biB).toString()).toStrictEqual((biA % biB).toString());
  });

  it("<<", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3");
    // @ts-ignore
    expect(biA.leftShift(3).toString()).toStrictEqual((biA << biB).toString());
  });

  it(">>", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3");
    // @ts-ignore
    expect(biA.rightShift(3).toString()).toStrictEqual((biA >> biB).toString());
  });

  it("**", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3");
    // @ts-ignore
    expect(biA.pow(3).toString()).toStrictEqual((biA ** biB).toString());
  });

  it("~", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    // @ts-ignore
    expect(BigInt.bitwiseNot(biA).toString()).toStrictEqual((~biA).toString());
  });

  it("&", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(BigInt.bitwiseAnd(biA, biB).toString()).toStrictEqual(
      (biA & biB).toString()
    );
  });

  it("|", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(BigInt.bitwiseOr(biA, biB).toString()).toStrictEqual(
      (biA | biB).toString()
    );
  });

  it("^", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const biB = BigInt.fromString("3947609237846097230769");
    // @ts-ignore
    expect(BigInt.bitwiseXor(biA, biB).toString()).toStrictEqual(
      (biA ^ biB).toString()
    );
  });
});
