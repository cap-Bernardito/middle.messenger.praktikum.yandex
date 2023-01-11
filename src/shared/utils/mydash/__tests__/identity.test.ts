import { _ } from "../../utils";

const testCases: any[] = [
  ["array", [10, 13, 5]],
  ["object", { a: 1 }],
  ["null", null],
  ["string", "test"],
  ["number", 42],
  ["undefined", undefined],
];

describe("Should work for", () => {
  testCases.forEach((testCase) => {
    const [testName, input] = testCase;
    const expected = input;

    const result = _.identity(input);

    it(testName, () => {
      expect(result).toEqual(expected);
    });
  });
});
