import {BigFloat} from "../BigFloat";


describe("BigFloat simple arithmetic", () => {

  it("adds", () => {
    let a = BigFloat.fromString("1865891638561836586385.8623756183648536");
    let b = BigFloat.fromString("39275934.2592734985793728970589475309737437958374985");
    let result = a.add(b);
    expect(result.toString(30)).toStrictEqual("1865891638561875862320.121649116944226497058947530973");

    a = BigFloat.fromString("0.3463246324");
    b = BigFloat.fromString("0.87345970780945789");
    result = a.add(b);
    expect(result.toString(30)).toStrictEqual("1.21978434020945789");
  });

  it("subtracts", () => {
    let a = BigFloat.fromString("1865891638561836586385.8623756183648536");
    let b = BigFloat.fromString("39275934.2592734985793728970589475309737437958374985");
    let result = a.sub(b);
    expect(result.toString(30)).toStrictEqual("1865891638561797310451.603102119785480702941052469026");

    a = BigFloat.fromString("0.3463246324");
    b = BigFloat.fromString("0.87345970780945789");
    result = a.sub(b);
    expect(result.toString(30)).toStrictEqual("-0.52713507540945789");
  });

  it("multiplies", () => {
    let a = BigFloat.fromString("1865891638561836586385.8623756183648536");
    let b = BigFloat.fromString("39275934.2592734985793728970589475309737437958374985");
    let result = a.mul(b);
    expect(result.toString(30)).toStrictEqual("73284637331082801785602534486.149704903817901224174866651142");

    a = BigFloat.fromString("0.3463246324");
    b = BigFloat.fromString("0.87345970780945789");
    result = a.mul(b);
    expect(result.toString(30)).toStrictEqual("0.302500612223321912997529636");
  });

  it("divides", () => {
    let a = BigFloat.fromString("1865891638561836586385.8623756183648536");
    let b = BigFloat.fromString("39275934.2592734985793728970589475309737437958374985");
    let result = a.div(b, 50);
    expect(result.toString(30)).toStrictEqual("47507250273016.183401649678718811663889506298");

    a = BigFloat.fromString("0.3463246324");
    b = BigFloat.fromString("0.87345970780945789");
    result = a.div(b);
    expect(result.toString(30)).toStrictEqual("0.396497547973385716151059297859");
  });

});
