import { _ } from "../..";
import { printObject } from "../../test-utils";

const testCases: [object, object][] = [
  [{ key: null }, { key: null }],
  [{ key: undefined }, { key: undefined }],
  [{ key: true }, { key: true }],
  [{ key: false }, { key: false }],
  [{ key: 42 }, { key: 42 }],
  [{ key: "test test" }, { key: "test test" }],
  [{ key: new Date() }, { key: new Date() }],
  [
    { key: null, key1: { key2: true, b: { d: { c: { a: [1, 2, 3] } } } } },
    { key: null, key1: { key2: true, b: { d: { c: { a: [1, 2, 3] } } } } },
  ],
];

describe("Should work cloneDeep", () => {
  testCases.forEach((testCase) => {
    const [input, expected] = testCase;

    const result = _.cloneDeep(input);

    it(`${printObject(input)} should success cloned`, () => {
      expect(result).toEqual(expected);
      expect(result === expected).toEqual(false);
    });
  });

  it(`should success cloned symbol`, () => {
    const testSymbol = Symbol("test");

    const [input, expected] = [{ key: testSymbol }, { key: testSymbol }];

    const result = _.cloneDeep(input) as typeof expected;

    expect(result).toEqual(expected);
    expect(result === expected).toEqual(false);
  });

  it(`should not cloned function`, () => {
    const [input, expected] = [{ key: () => true }, { key: () => true }];

    const result = _.cloneDeep(input) as typeof expected;

    expect(result === expected).toEqual(false);
    expect(result.key === expected.key).toEqual(false);
  });

  it(`should work "transform" function`, () => {
    const [input, expected] = [{ key: "value" }, { key: "value", newKey: "new value" }];

    const result = _.cloneDeep(input, (item) => ({ ...item, newKey: "new value" })) as typeof expected;

    expect(result === expected).toEqual(false);
  });
});
