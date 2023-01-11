import { _ } from "../../utils";

describe("Should work with range", () => {
  const testCases: [number[], number, number?, number?][] = [
    [[0, 1, 2, 3], 4],
    [[0, -1, -2, -3], -4],
    [[1, 2, 3, 4], 1, 5],
    [[0, 5, 10, 15], 0, 20, 5],
    [[0, -1, -2, -3], 0, -4, -1],
    [[1, 1, 1], 1, 4, 0],
    [[], 0],
  ];

  testCases.forEach((testCase) => {
    const [expected, ...args] = testCase;

    const result = _.range(...args);

    it(`range(${args.join(", ")}) should return [${expected.join(", ")}]`, () => {
      expect(result).toEqual(expected);
    });
  });
});

describe("Should work with rangeRight", () => {
  const testCases: [number[], number, number?, number?][] = [
    [[3, 2, 1, 0], 4],
    [[-3, -2, -1, 0], -4],
    [[4, 3, 2, 1], 1, 5],
    [[15, 10, 5, 0], 0, 20, 5],
    [[-3, -2, -1, 0], 0, -4, -1],
    [[1, 1, 1], 1, 4, 0],
    [[], 0],
  ];

  testCases.forEach((testCase) => {
    const [expected, ...args] = testCase;
    const [start, end, step] = args;

    const result = _.rangeRight(start, end, step);

    it(`rangeRight(${args.join(", ")}) should return [${expected.join(", ")}]`, () => {
      expect(result).toEqual(expected);
    });
  });
});
