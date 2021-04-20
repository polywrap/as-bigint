
export class BigIntOld {
  public static ZERO: BigIntOld = new BigIntOld("0");
  public static ONE: BigIntOld = new BigIntOld("1");

  public readonly isNegative: boolean;
  private readonly _d: u32[] = []; // digits stored from least to most significant
  private readonly _e: i32 = 9;
  private readonly _base: u32 = 10 ** <u32>this._e;

  private constructor(bigNumber: string, isNegative: boolean = false) {
    // check sign
    this.isNegative = isNegative;
    // parse string in baseE-digit segments
    for (let i = bigNumber.length; i > 0; i -= this._e) {
      let digitStr: string;
      if (i < this._e) {
        digitStr = bigNumber.substring(0, i);
      } else {
        digitStr = bigNumber.substring(i - this._e, i);
      }
      this._d.push(U32.parseInt(digitStr));
    }
    // remove any leading zeros
    this.trimLeadingZeros();
  }

  static fromString(bigNumber: string): BigIntOld {
    let isNegative = false;
    // check for negative number
    if (bigNumber.charAt(0) == "-") {
      isNegative = true;
      bigNumber = bigNumber.substring(1);
    }
    // check for decimal -> drop anything after first decimal point
    const decimalIndex = bigNumber.indexOf(".");
    if (decimalIndex != -1) {
      bigNumber = bigNumber.substring(0, decimalIndex);
    }
    // empty string is zero
    if (bigNumber.length == 0) {
      return new BigIntOld("0");
    }
    // use char codes to prevent non-numbers; 48-57 => 0-9
    for (let i = 0; i < bigNumber.length; i++) {
      const c = bigNumber.charCodeAt(i);
      if (c < 48 || c > 57)
        throw new Error("Cannot construct BigIntOld from non-integer character string");
    }
    return new BigIntOld(bigNumber, isNegative);
  }

  static fromDigits(digits: u32[], isNegative: boolean = false): BigIntOld {
    // prevent empty array
    if (digits.length == 0) {
      return new BigIntOld("0");
    }
    // create BigIntOld
    const res = new BigIntOld("", isNegative);
    for (let i = 0; i < digits.length; i++) {
      res._d.push(digits[i]);
    }
    res.trimLeadingZeros();
    // prevent negative zero
    if (res._d.length == 1 && res._d[0] == 0) {
      return new BigIntOld("0");
    }
    return res;
  }

  static fromInt(value: i64): BigIntOld {
    return BigIntOld.fromString(value.toString());
  }

  // O(N)
  copy(): BigIntOld {
    return BigIntOld.fromDigits(this._d, this.isNegative);
  }

  // O(N)
  opposite(): BigIntOld {
    return BigIntOld.fromDigits(this._d, !this.isNegative);
  }

  abs(): BigIntOld {
    return this.isNegative ? this.opposite() : this.copy();
  }

  // O(N)
  @operator("+")
  add(other: BigIntOld): BigIntOld {
    if (this.isNegative && !other.isNegative) {
      return other.sub(this.opposite());
    } else if (!this.isNegative && other.isNegative) {
      return this.sub(other.opposite());
    }
    const res: BigIntOld = this.copy();
    let carry: bool = 0;
    const n = Math.max(res._d.length, other._d.length);
    for (let i = 0; i < n || carry; i++) {
      if (i == res._d.length) {
        res._d.push(0);
      }
      res._d[i] += carry + (i < other._d.length ? other._d[i] : 0);
      carry = res._d[i] >= res._base ? 1 : 0;
      if (carry) {
        res._d[i] -= res._base;
      }
    }
    return res.trimLeadingZeros();
  }

  static add(left: BigIntOld, right: BigIntOld): BigIntOld {
    return left.add(right);
  }

  // O(N)
  @operator("-")
  sub(other: BigIntOld): BigIntOld {
    // reframe negative values
    if (this.isNegative && other.isNegative) {
      return other.opposite().sub(this.opposite());
    } else if (!this.isNegative && other.isNegative) {
      return this.add(other.opposite());
    } else if (this.isNegative && !other.isNegative) {
      return this.add(other.opposite());
    }
    // shortcut
    if (this._d.length == 1 && other._d.length == 1) {
      return BigIntOld.fromInt(<i64>this._d[0] - other._d[0]);
    }
    // handle large right-hand-side value
    const cmp: i32 = this.absCompareTo(other);
    if (cmp < 0) {
      return other.sub(this).opposite();
    } else if (cmp == 0) {
      return BigIntOld.ZERO.copy();
    }
    // subtraction
    const res: BigIntOld = this.copy();
    let carry: bool = 0;
    for (let i = 0; i < other._d.length || carry; i++) {
      const subVal: i64 = <i64>(i < other._d.length ? other._d[i] : 0);
      const val: i64 = <i64>res._d[i] - carry - subVal;
      carry = val < 0 ? 1 : 0;
      if (carry) {
        res._d[i] = <u32>(val + res._base);
      } else {
        res._d[i] = <u32>val;
      }
    }
    return res.trimLeadingZeros();
  }

  static sub(left: BigIntOld, right: BigIntOld): BigIntOld {
    return left.sub(right);
  }

  // O(N^2) -- this is the "school book" algorithm, which mimics the way we learn to do multiplication by hand as children
  // Although it is O(N^2), it is faster in practice than asymptotically better algorithms for multiplicands of <= 256 bits
  @operator("*")
  mul(other: BigIntOld): BigIntOld {
    const res: u32[] = new Array<u32>(this._d.length + other._d.length);
    for (let i = 0; i < this._d.length; i++) {
      let carry: u64 = 0;
      for (let j = 0; j < other._d.length || carry; j++) {
        if (j >= other._d.length) {
          res.push(0);
        }
        const otherVal = j < other._d.length ? other._d[j] : 0;
        const cur: u64 = res[i + j] + <u64>this._d[i] * otherVal + carry;
        res[i + j] = <u32>(cur % this._base);
        carry = cur / this._base;
      }
    }
    return BigIntOld.fromDigits(res, this.isNegative != other.isNegative);
  }

  static mul(left: BigIntOld, right: BigIntOld): BigIntOld {
    return left.mul(right);
  }

  // using binary search -> ~O(logZ*N^2) where Z is the magnitude of the numerator
  @operator("/")
  div(other: BigIntOld): BigIntOld {
    if (other.absCompareTo(BigIntOld.ZERO) == 0) throw new RangeError("Divide by zero");
    if (other.absCompareTo(this) > 0) return BigIntOld.ZERO.copy();
    if (other._d.length == 1) {
      const otherInt: i32 = other.isNegative ? -1 * other._d[0] : other._d[0];
      return this.divInt(otherInt);
    }
    // set starting values
    let lo: BigIntOld = BigIntOld.ZERO;
    let hi: BigIntOld = this.abs();
    // improve bounds to improve performance
    for (let i = other._d.length; i > 1; i--) {
      hi._d.pop();
    }
    // search
    while (lo.lte(hi)) {
      const mid: BigIntOld = hi.sub(lo).divInt(2).add(lo);
      const cmp: i32 = this.absCompareTo(other.mul(mid));
      if (cmp < 0) hi = mid.sub(BigIntOld.ONE);
      else if (cmp > 0) lo = mid.add(BigIntOld.ONE);
      else return this.isNegative != other.isNegative ? mid.opposite() : mid;
    }
    let res: BigIntOld;
    if (lo.lte(BigIntOld.ONE)) {
      res = BigIntOld.ONE.copy();
    } else {
      res = lo.sub(BigIntOld.ONE);
    }
    if (this.isNegative != other.isNegative) {
      return res.opposite();
    }
    return res;
  }

  static div(left: BigIntOld, right: BigIntOld): BigIntOld {
    return left.div(right);
  }

  // O(N)
  divInt(other: i32): BigIntOld {
    if (other == 0) throw new RangeError("Divide by zero");
    const res = BigIntOld.fromDigits(this._d, this.isNegative != other < 0);
    if (other < 0) {
      other *= -1;
    }
    let carry: u64 = 0;
    for (let i = res._d.length - 1; i >= 0; i--) {
      const cur: u64 = res._d[i] + carry * res._base;
      res._d[i] = <u32>(cur / other);
      carry = cur % other;
    }
    return res.trimLeadingZeros();
  }

  // O(N)
  modInt(other: u32): u64 {
    if (other == 0) throw new RangeError("Mod zero is undefined");
    if (this._d.length == 1) {
      return this.isNegative ? (-1 * this._d[0]) % other : this._d[0] % other;
    }
    const res = BigIntOld.fromDigits(this._d, this.isNegative);
    let carry: u64 = 0;
    for (let i = res._d.length - 1; i >= 0; i--) {
      const cur: u64 = res._d[i] + carry * res._base;
      res._d[i] = <u32>(cur / other);
      carry = cur % other;
    }
    return carry;
  }

  // Babylonian method (as used in Uniswap contracts)
  // eslint-disable-next-line @typescript-eslint/member-ordering
  sqrt(): BigIntOld {
    if (this.isNegative) throw new  RangeError("Square root of negative numbers is not supported");
    const one = BigIntOld.ONE;
    const three = BigIntOld.fromDigits([3]);
    let z: BigIntOld = BigIntOld.ZERO;
    if (this.gt(three)) {
      z = this;
      let x: BigIntOld = this.divInt(2).add(one);
      while (x.lt(z)) {
        z = x;
        x = this.div(x).add(x).divInt(2);
      }
    } else if (!this.eq(BigIntOld.ZERO)) {
      z = one;
    }
    return z.copy();
  }

  static sqrt(y: BigIntOld): BigIntOld {
    return y.sqrt();
  }

  pow(exponent: u64): BigIntOld {
    this.trimLeadingZeros();
    let res: BigIntOld = this.copy();
    for (let i: u64 = 1; i < exponent; i++) {
      res = res.mul(this);
    }
    return res;
  }

  static pow(base: BigIntOld, exponent: u64): BigIntOld {
    return base.pow(exponent);
  }

  @operator("==")
  eq(other: BigIntOld): boolean {
    return this.compareTo(other) == 0;
  }

  static eq(left: BigIntOld, right: BigIntOld): boolean {
    return left.eq(right);
  }

  @operator("!=")
  ne(other: BigIntOld): boolean {
    return !this.eq(other);
  }

  static ne(left: BigIntOld, right: BigIntOld): boolean {
    return left.ne(right);
  }

  @operator("<")
  lt(other: BigIntOld): boolean {
    return this.compareTo(other) < 0;
  }

  static lt(left: BigIntOld, right: BigIntOld): boolean {
    return left.lt(right);
  }

  @operator("<=")
  lte(other: BigIntOld): boolean {
    return this.compareTo(other) <= 0;
  }

  static lte(left: BigIntOld, right: BigIntOld): boolean {
    return left.lte(right);
  }

  @operator(">")
  gt(other: BigIntOld): boolean {
    return this.compareTo(other) > 0;
  }

  static gt(left: BigIntOld, right: BigIntOld): boolean {
    return left.gt(right);
  }

  @operator(">=")
  gte(other: BigIntOld): boolean {
    return this.compareTo(other) >= 0;
  }

  static gte(left: BigIntOld, right: BigIntOld): boolean {
    return left.gte(right);
  }

  compareTo(other: BigIntOld): i32 {
    // opposite signs
    if (this.isNegative && !other.isNegative) return -1;
    if (!this.isNegative && other.isNegative) return 1;
    // different number of "digits"
    if (this._d.length != other._d.length) {
      if (this._d.length > other._d.length)
        return this.isNegative ? -1 : 1;
      if (this._d.length < other._d.length)
        return this.isNegative ? 1 : -1;
    }
    // numbers are same length, so check each "digit"
    for (let i = this._d.length - 1; i >= 0; i--) {
      if (this._d[i] < other._d[i])
        return this.isNegative ? 1 : -1;
      if (this._d[i] > other._d[i])
        return this.isNegative ? -1 : 1;
    }
    return 0;
  }

  // compares number magnitudes, ignoring sign
  absCompareTo(other: BigIntOld): i32 {
    this.trimLeadingZeros();
    other.trimLeadingZeros();
    // different number of "digits"
    if (this._d.length > other._d.length) return 1;
    if (this._d.length < other._d.length) return -1;
    // numbers are same length, so check each "digit"
    for (let i = this._d.length - 1; i >= 0; i--) {
      if (this._d[i] < other._d[i]) return -1;
      if (this._d[i] > other._d[i]) return 1;
    }
    return 0;
  }

  // O(N)
  toString(): string {
    if (this._d.length == 0) return "0";
    let res = this.isNegative ? "-" : "";
    res += this._d[this._d.length - 1].toString();
    for (let i = this._d.length - 2; i >= 0; i--) {
      res += this._d[i].toString().padStart(this._e, "0");
    }
    return res;
  }

  private trimLeadingZeros(): BigIntOld {
    while (this._d.length > 1 && this._d[this._d.length - 1] == 0) {
      this._d.pop();
    }
    return this;
  }
}
