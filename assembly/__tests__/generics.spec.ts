import { BigInt } from "../BigInt";

describe("Generics", () => {
  it("==", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.eq(b).toString()).toStrictEqual((biA == biB).toString());
  });

  it("!=", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.ne(b).toString()).toStrictEqual((biA != biB).toString());
  });

  it(">", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.gt(b).toString()).toStrictEqual((biA > biB).toString());
  });

  it("<", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.lt(b).toString()).toStrictEqual((biA < biB).toString());
  });

  it(">=", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.gte(b).toString()).toStrictEqual((biA >= biB).toString());
  });

  it("<=", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.lte(b).toString()).toStrictEqual((biA <= biB).toString());
  });

  it("+", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.add(b).toString()).toStrictEqual((biA + biB).toString());
  });

  it("-", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.sub(b).toString()).toStrictEqual((biA - biB).toString());
  });

  it("*", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.mul(b).toString()).toStrictEqual((biA * biB).toString());
  });

  it("/", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.div(b).toString()).toStrictEqual((biA / biB).toString());
  });

  it("%", () => {
    const biA = BigInt.fromString("238723509723496846245754754");
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(biA.mod(b).toString()).toStrictEqual((biA % biB).toString());
  });

  it("**", () => {
    const a = "238723509723496846245754754";
    const biA = BigInt.fromString(a);
    const biB = BigInt.fromString("3");
    // @ts-ignore
    expect(BigInt.pow(a, 3).toString()).toStrictEqual((biA ** biB).toString());
  });

  it("~", () => {
    const a = "238723509723496846245754754";
    const biA = BigInt.fromString(a);
    // @ts-ignore
    expect(BigInt.bitwiseNot(a).toString()).toStrictEqual((~biA).toString());
  });

  it("&", () => {
    const a: string = "238723509723496846245754754";
    const biA = BigInt.fromString(a);
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(BigInt.bitwiseAnd(a, b).toString()).toStrictEqual(
      (biA & biB).toString()
    );
  });

  it("|", () => {
    const a: string = "238723509723496846245754754";
    const biA = BigInt.fromString(a);
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(BigInt.bitwiseOr(a, b).toString()).toStrictEqual(
      (biA | biB).toString()
    );
  });

  it("^", () => {
    const a: string = "238723509723496846245754754";
    const biA = BigInt.fromString(a);
    const b = "3947609237846097230769";
    const biB = BigInt.fromString(b);
    // @ts-ignore
    expect(BigInt.bitwiseXor(a, b).toString()).toStrictEqual(
      (biA ^ biB).toString()
    );
  });
});
