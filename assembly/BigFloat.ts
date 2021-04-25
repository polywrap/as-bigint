import { BigInt } from "./BigInt";

// multiple precision float
export class BigFloat {

  // a float takes the form -> m * 10^e
  private mantissa: BigInt;
  private e: i32;
  minPrecision: i32;

  // CONSTRUCTORS //////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(mantissa: BigInt, exponent: i32, minPrecision: i32 = 18) {
    this.mantissa = mantissa;
    this.e = exponent;
    this.minPrecision = minPrecision;
  }

  static fromFraction(numerator: BigInt, denominator: BigInt, minPrecision: i32 = 18): BigFloat {
    const floatNumerator = new BigFloat(numerator, numerator.toString().length, minPrecision);
    const floatDenominator = new BigFloat(denominator, denominator.toString().length);
    return floatNumerator.div(floatDenominator);
  }

  static fromString(bigFloat: string, minPrecision: i32 = 18): BigFloat {
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
      exponent = mantissa.isZero() ? 0 : mantissa.toString().length;
    } else {
      preDecimal = BigFloat.trimLeadingZeros(bigFloat.substring(0, i));
      let postDecimalStr: string = bigFloat.substring(i + 1);
      let postDecimalTrim = BigFloat.trimLeadingZeros(postDecimalStr);
      if (preDecimal == "") {
        exponent = 0 - (postDecimalStr.length - postDecimalTrim.length);
      } else {
        exponent = preDecimal.length;
      }
      postDecimal = BigFloat.trimTrailingZeros(postDecimalStr);
      if (isNegative) {
        preDecimal = "-" + preDecimal;
      }
      mantissa = BigInt.fromString(preDecimal + postDecimal);
    }
    return new BigFloat(mantissa, exponent, minPrecision);
  }

  // OUTPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  toString(precision: i32 = this.minPrecision): string {
    if (this.mantissa.isZero() || this.e <= 0 && precision == 0) {
      return "0";
    }
    let m: string = this.mantissa.toString();
    let result: string = "";
    if (this.isNegative) {
      result += "-";
      m = m.substring(1);
    }
    if (this.e <= 0) {
      result += "0.";
      result = result.padEnd(result.length + -1 * this.e, "0");
      result += BigFloat.trimTrailingZeros(m.substr(0, precision + this.e));
    } else {
      result += m.substring(0, this.e);
      const postDecimal: string = m.substr(this.e, precision);
      if (postDecimal.length > 0) {
        result += "." + postDecimal;
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
      const mulVal: i32 = k > 9 ? 9 : k;
      mantissa = mantissa.mulInt(10 ** mulVal);
      k -= mulVal;
    }
    return mantissa;
  }

  // ARITHMETIC ////////////////////////////////////////////////////////////////////////////////////////////////////////

  add(other: BigFloat): BigFloat {
    let left: BigInt = this.mantissa;
    let right: BigInt = other.mantissa;
    let exponent: i32 = this.e;
    let eDiff: i32 = this.e - other.e;
    if (eDiff > 0) {
      right = BigFloat.mulBigIntPowTen(right, eDiff);
    } else if (eDiff < 0) {
      left = BigFloat.mulBigIntPowTen(left, -1 * eDiff);
      exponent += eDiff;
    }
    return new BigFloat(left.add(right), exponent, this.minPrecision);
  }

  sub(other: BigFloat): BigFloat {
    let left: BigInt = this.mantissa;
    let right: BigInt = other.mantissa;
    let exponent: i32 = this.e;
    let eDiff: i32 = this.e - other.e;
    if (eDiff > 0) {
      right = BigFloat.mulBigIntPowTen(right, eDiff);
    } else if (eDiff < 0) {
      left = BigFloat.mulBigIntPowTen(left, -1 * eDiff);
      exponent += eDiff;
    }
    return new BigFloat(left.sub(right), exponent, this.minPrecision);
  }

  mul(other: BigFloat): BigFloat {
    const mantissa: BigInt = this.mantissa.mul(other.mantissa);
    const exponent: i32 = this.e + other.e;
    return new BigFloat(mantissa, exponent, this.minPrecision);
  }

  div(other: BigFloat, minPrecision: i32 = this.minPrecision): BigFloat {
    let dividend = this.mantissa;
    let divisor = other.mantissa;
    // divide with padding to maintain precision
    let dividendLength = dividend.toString().length - (dividend.isNegative ? 1 : 0);
    let divisorLength = divisor.toString().length - (divisor.isNegative ? 1 : 0);
    const lengthDiff = dividendLength - divisorLength;
    const padding = minPrecision - (lengthDiff < 0 ? lengthDiff : 0);
    dividend = BigFloat.mulBigIntPowTen(dividend, padding);
    const mantissa: BigInt = dividend.div(divisor);
    // calculate exponent
    let exponent: i32;
    const gteZero: boolean = this.mantissa.magCompareTo(other.mantissa) >= 0;
    if (gteZero) {
      const naiveDiv: BigInt = this.mantissa.div(other.mantissa);
      const naiveDivLen: i32 = naiveDiv.toString().length;
      exponent = naiveDiv.isNegative ? naiveDivLen - 1 : naiveDivLen;
    } else {
      exponent = this.e - other.e;
    }
    return new BigFloat(mantissa, exponent, this.minPrecision);
  }


  // UTILITIES /////////////////////////////////////////////////////////////////////////////////////////////////////////

  get isNegative(): boolean {
    return this.mantissa.isNegative;
  }

  copy(): BigFloat {
    return new BigFloat(this.mantissa.copy(), this.e, this.minPrecision);
  }

}