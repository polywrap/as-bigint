import { BigInt } from "./BigInt";

// multiple precision float
export class BigFloat {

  // a float takes the form -> m * 10^e
  private mantissa: BigInt;
  private e: i32;

  // CONSTRUCTORS //////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(mantissa: BigInt, exponent: i32) {
    this.mantissa = mantissa;
    this.e = exponent;
  }

  // need a better way to do this
  static fromFraction(numerator: BigInt, denominator: BigInt): BigFloat {
    let bitSpread: i32 = numerator.countBits() - denominator.countBits();
    if (bitSpread < 0) {
      bitSpread *= -1;
    }
    const mantissa = numerator.mulPowTwo(bitSpread + 56).div(denominator);
    return new BigFloat(mantissa, bitSpread + 56).trim();
  }

  static fromString(bigFloat: string): BigFloat {
    let mantissa: BigInt;
    let exponent: i32;
    const i: i32 = bigFloat.indexOf(".");
    if (i == -1) {
      exponent = 0;
      mantissa = BigInt.fromString(bigFloat);
    } else {
      exponent = bigFloat.length - i;
      mantissa = BigInt.fromString(bigFloat.substring(0, i) + bigFloat.substring(i + 1));
    }
    return new BigFloat(mantissa, exponent);
  }

  // OUTPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  toString(precision: i32 = 18): string {
    this.trim();
    const m: string = this.mantissa.toString();
    const decimalPos: i32 = m.length - this.e + 1;
    const places = precision < this.e ? precision : this.e;
    let wholeNumbers = decimalPos == 0 ? "0" : m.substring(0, decimalPos);
    return wholeNumbers + "." + m.substr(decimalPos, places);
  }

  // MAINTENANCE FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////

  // trim leading and trailing zeros, adjusting exponent accordingly
  private trim(): BigFloat {
    while (this.e > 0 && this.mantissa.modInt(10) == 0) {
      this.mantissa = this.mantissa.divInt(10);
      this.e--;
    }
    return this;
  }

  // UTILITIES /////////////////////////////////////////////////////////////////////////////////////////////////////////

  get isNegative(): boolean {
    return this.mantissa.isNegative;
  }

}