import { BigInt } from "./BigInt";

// multiple precision float
export class BigFloat {

  // a float takes the form -> m * 10^e
  public mantissa: BigInt;
  private e: i32;

  // CONSTRUCTORS //////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(mantissa: BigInt, exponent: i32) {
    this.mantissa = mantissa;
    this.e = exponent;
  }

  static fromFraction(numerator: BigInt, denominator: BigInt): BigFloat {
    const floatNumerator = new BigFloat(numerator, 0);
    const floatDenominator = new BigFloat(denominator, 0);
    return floatNumerator.div(floatDenominator);
  }

  static fromString(bigFloat: string): BigFloat {
    // determine sign
    let isNegative: boolean = bigFloat.charAt(0) == "-";
    if (isNegative) bigFloat = bigFloat.substring(1);
    // parse string
    let preDecimal: string;
    let postDecimal: string;
    let mantissa: BigInt;
    let exponent: i32;
    const i: i32 = bigFloat.indexOf(".");
    if (i == -1) {
      mantissa = BigInt.fromString(isNegative ? "-" + bigFloat : bigFloat);
      exponent = 0;
    } else {
      preDecimal = BigFloat.trimLeadingZeros(bigFloat.substring(0, i));
      let postDecimalStr: string = bigFloat.substring(i + 1);
      postDecimal = BigFloat.trimTrailingZeros(postDecimalStr);
      exponent = -1 * postDecimal.length;
      if (isNegative) {
        preDecimal = "-" + preDecimal;
      }
      mantissa = BigInt.fromString(preDecimal + postDecimal);
    }
    return new BigFloat(mantissa, exponent);
  }

  // OUTPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  toString(precision: i32 = 18): string {
    if (this.mantissa.isZero()) {
      return "0";
    }
    let m: string = this.mantissa.toString();
    let result: string = "";
    if (this.isNegative) {
      result += "-";
      m = m.substring(1);
    }
    if (this.e > 0) {
      result = result.padEnd(m.length + this.e, "0");
      if (precision > 0) {
        result += ".0"
      }
    } else if (this.e + m.length <= 0) {
      if (precision == 0 || this.e + m.length <= -1 * precision) {
        return "0"
      }
      result += "0."
      m = m.padStart(-1 * this.e, "0");
      m = m.substr(0, precision);
      result += m;
    } else {
      result += m.substring(0, m.length + this.e);
      if (precision > 0) {
        const postDecimal: string = m.substr(m.length + this.e, precision);
        result += ".";
        result += postDecimal.length > 0 ? postDecimal : "0";
      }
    }
    return result;
  }

  // MAINTENANCE FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////

  private static trimLeadingZeros(str: string): string {
    let i: i32 = 0;
    for (; i <= str.length; i++) {
      if (str.charAt(i) != "0") {
        break;
      }
    }
    return str.substring(i);
  }

  private static trimTrailingZeros(str: string): string {
    let i: i32 = str.length - 1;
    for (; i >= 0; i--) {
      if (str.charAt(i) != "0") {
        break;
      }
    }
    return str.substring(0, i + 1);
  }

  // CORE OPERATIONS ///////////////////////////////////////////////////////////////////////////////////////////////////

  private static mulBigIntPowTen(mantissa: BigInt, k: i32): BigInt {
    while (k > 0) {
      const mulVal: i32 = k > 8 ? 8 : k;
      mantissa = mantissa.mulInt(10 ** mulVal);
      k -= mulVal;
    }
    return mantissa;
  }

  // ARITHMETIC ////////////////////////////////////////////////////////////////////////////////////////////////////////

  add(other: BigFloat): BigFloat {
    let left: BigInt = this.mantissa;
    let right: BigInt = other.mantissa;
    let exponent: i32;
    if (this.e >= other.e) {
      left = BigFloat.mulBigIntPowTen(left, this.e - other.e);
      exponent = other.e;
    } else {
      right = BigFloat.mulBigIntPowTen(right, other.e - this.e);
      exponent = this.e;
    }
    return new BigFloat(left.add(right), exponent);
  }

  sub(other: BigFloat): BigFloat {
    let left: BigInt = this.mantissa;
    let right: BigInt = other.mantissa;
    let exponent: i32;
    if (this.e >= other.e) {
      left = BigFloat.mulBigIntPowTen(left, this.e - other.e);
      exponent = other.e;
    } else {
      right = BigFloat.mulBigIntPowTen(right, other.e - this.e);
      exponent = this.e;
    }
    return new BigFloat(left.sub(right), exponent);
  }

  mul(other: BigFloat): BigFloat {
    const mantissa: BigInt = this.mantissa.mul(other.mantissa);
    const exponent: i32 = this.e + other.e;
    return new BigFloat(mantissa, exponent);
  }

  div(other: BigFloat, minPrecision: i32 = 32): BigFloat {
    let dividend: BigInt = this.mantissa;
    let divisor: BigInt = other.mantissa;
    // add padding used to maintain precision
    const dividendLen = dividend.isNegative ? dividend.toString().length - 1 : dividend.toString().length;
    const divisorLen = divisor.isNegative ? divisor.toString().length - 1 : divisor.toString().length;
    const sizeDiff: i32 = dividendLen - divisorLen > 0 ? 0 : divisorLen - dividendLen;
    const padding: i32 = minPrecision + sizeDiff;
    dividend = BigFloat.mulBigIntPowTen(dividend, padding);
    // divide
    const mantissa: BigInt = dividend.div(divisor);
    const exponent: i32 = this.e - other.e - padding;
    return new BigFloat(mantissa, exponent);
  }


  // UTILITIES /////////////////////////////////////////////////////////////////////////////////////////////////////////

  get isNegative(): boolean {
    return this.mantissa.isNegative;
  }

  copy(): BigFloat {
    return new BigFloat(this.mantissa.copy(), this.e);
  }

}