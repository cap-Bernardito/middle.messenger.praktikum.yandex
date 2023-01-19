import { _ } from "../..";

const testCases: any[] = [
  ["first element", [10, 13, 5], 10],
  ["undefined if argument is empty array", [], undefined],
  ["undefined if argument is not array ({})", {}, undefined],
  ["undefined if argument is not array (string)", "test string", undefined],
];

describe("Should return", () => {
  testCases.forEach((testCase) => {
    const [testName, input, expected] = testCase;

    const result = _.first(input);

    it(testName, () => {
      expect(result).toEqual(expected);
    });
  });
});
