import { _ } from "../..";

const testCases: [string, PlainObject[], Record<string, unknown>][] = [
  ["as Object.assign", [{ a: 1 }, { a: 2 }, { a: 3 }], { a: 3 }],
  ["objects recursive", [{ a: { b: 2 } }, { a: { b: 3, c: 2 } }], { a: { b: 3, c: 2 } }],
  ["objects with array", [{ a: { b: [{ d: 3 }] } }, { a: { b: [{ c: 4 }] } }], { a: { b: [{ d: 3 }, { c: 4 }] } }],
  [
    "objects with array 2",
    [{ a: { b: [{ d: { f: 3 } }] } }, { a: { b: [{ d: { c: 4 } }] } }],
    { a: { b: [{ d: { f: 3 } }, { d: { c: 4 } }] } },
  ],
  ["Object with null", [{ a: null, b: 2 }, { a: "text" }], { a: "text", b: 2 }],
  ["Object with null 2", [{ a: "text", b: 2 }, { a: null }], { a: null, b: 2 }],
  ["Object with undefined", [{ a: 1, b: 2 }, { a: undefined }], { a: undefined, b: 2 }],
  ["Object with undefined 2", [{ a: undefined, b: 2 }, { a: 1 }], { a: 1, b: 2 }],
];

describe("Should merge", () => {
  testCases.forEach((testCase) => {
    const [testName, testFixtures, expected] = testCase;
    const [first, ...other] = testFixtures;

    const result = _.merge(first, ...other);

    it(testName, () => {
      expect(result).toEqual(expected);
    });
  });

  it(`dist object should mutate`, () => {
    const dist = { a: 1 };

    const result = _.merge(dist, { a: 2 }, { a: 3 });

    expect(result).toEqual({ a: 3 });
    expect(dist === result).toEqual(true);
  });
});
