import { _ } from "../../utils";

const testCases: [string, string, string?][] = [
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
    const [string, chars] = args;

    const result = _.trim(string, chars);

    it(`trim('${args.join("', ' ")}') should return "${expected}"`, () => {
      expect(result).toEqual(expected);
    });
  });
});
