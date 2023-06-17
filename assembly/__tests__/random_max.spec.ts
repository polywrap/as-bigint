import { BigInt } from "../BigInt";

describe("RNG", () => {
  it("RandomMax", () => {
    for (var i: i64 = 0; i < 2147483647; i++) {
      const randomNumber: BigInt = BigInt.randomMax(i);
      const negRandomNumber: BigInt = BigInt.randomMax(-i);
      expect(randomNumber.lt(i) && negRandomNumber.gt(i)).toBeTruthy();
    }
  });
});