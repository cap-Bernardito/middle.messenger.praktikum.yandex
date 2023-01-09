import { _ } from "../../utils";

const testCases: any[] = [
  ["abc", "  abc  "],
  ["abc", "  abc  ", " "],
  ["abc", "-_-abc-_-", "_-"],
  ["abc", "\xA0abc"],
  ["abc", "\xA0abc", " "],
  ["ab c", "-_-ab c -_-", " _-"],
  ["", ""],
];

describe("Should work trim", () => {
  testCases.forEach((testCase) => {
    const [expected, ...args] = testCase;

    // @ts-ignore
    const result = _.trim(...args);

    it(`trim('${args.join("', ' ")}') should return "${expected}"`, () => {
      expect(result).toEqual(expected);
    });
  });
});
