import { _, isArrayOrObject } from "../../utils";

const printObject = (obj: PlainArrayOrObject) => {
  let pairs;

  if (Array.isArray(obj)) {
    pairs = obj.map((value) => {
      if (isArrayOrObject(value)) {
        value = printObject(value);
      } else if (Array.isArray(value)) {
        value = `[${value.join(", ")}]`;
      }

      return `${value}`;
    });
  } else {
    pairs = Object.entries(obj).map(([key, value]) => {
      if (isArrayOrObject(value)) {
        value = printObject(value);
      } else if (Array.isArray(value)) {
        value = `[${value.join(", ")}]`;
      }

      return `${key}: ${value}`;
    });
  }

  return `{${pairs.join(", ")}}`;
};

describe("Should work with isEqual", () => {
  const testCases: [boolean, PlainObject, PlainObject][] = [
    [true, {}, {}],
    [true, { a: 1 }, { a: 1 }],
    [true, { a: 1, b: null, c: "test", d: undefined }, { a: 1, b: null, c: "test", d: undefined }],
    [true, { a: [1, 2] }, { a: [1, 2] }],
    [true, { a: [1, { c: 4 }] }, { a: [1, { c: 4 }] }],
    [true, { foo: [1, 2] }, { foo: { 0: 1, 1: 2 } }],
    [true, { foo: NaN }, { foo: NaN }],
    [true, { foo: () => true }, { foo: () => true }],
    [false, { a: 1 }, { a: 2 }],
    [false, { a: [1, 2] }, { a: [1, 2, 3] }],
  ];

  testCases.forEach((testCase) => {
    const [expected, ...args] = testCase;

    const result = _.isEqual(...args);

    it(`isEqual(${printObject(args[0])}, ${printObject(args[1])}) should return "${expected}"`, () => {
      expect(result).toEqual(expected);
    });
  });
});
