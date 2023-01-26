import { _ } from "../..";
import { printObject } from "../../test-utils";

describe("Should work with isEqual", () => {
  const testCases: [boolean, PlainObject, PlainObject][] = [
    [true, {}, {}],
    [true, { a: 1 }, { a: 1 }],
    [true, { a: 1, b: null, c: "test", d: undefined }, { a: 1, b: null, c: "test", d: undefined }],
    [true, { a: [1, 2] }, { a: [1, 2] }],
    [true, { a: [1, { c: 4 }] }, { a: [1, { c: 4 }] }],
    [true, { foo: [1, 2] }, { foo: { 0: 1, 1: 2 } }],
    [true, { foo: NaN }, { foo: NaN }],
    [false, { foo: () => true }, { foo: () => true }],
    [false, { error: null }, { error: "error" }],
    [false, { a: 1 }, { a: 2 }],
    [false, { a: [1, 2] }, { a: [1, 2, 3] }],
    [false, { a: { b: 1 }, c: 2, d: true }, { a: { b: 1 }, c: 2, d: false }],
  ];

  testCases.forEach((testCase) => {
    const [expected, ...args] = testCase;

    const result = _.isEqual(...args);

    it(`isEqual(${printObject(args[0])}, ${printObject(args[1])}) should return "${expected}"`, () => {
      expect(result).toEqual(expected);
    });
  });
});
