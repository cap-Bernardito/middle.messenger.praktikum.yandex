import { _ } from "../..";

const testCases: [string, unknown[] | Record<string, unknown> | string, unknown][] = [
  ["first element", [10, 13, 5], 5],
  ["undefined if argument is empty array", [], undefined],
  ["undefined if argument is not array ({})", {}, undefined],
  ["undefined if argument is not array (string)", "test string", undefined],
];

describe("Should return", () => {
  testCases.forEach((testCase) => {
    const [testName, input, expected] = testCase;

    // @ts-ignore
    const result = _.last(input);

    it(testName, () => {
      expect(result).toEqual(expected);
    });
  });
});
