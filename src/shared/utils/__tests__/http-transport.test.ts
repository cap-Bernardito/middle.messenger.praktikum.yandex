import { queryStringify } from "../http-transport";
import { printObject } from "../test-utils";

const testCases: [PlainObject, string][] = [
  [{ key: 1 }, "?key=1"],
  [{ key2: "test test" }, "?key2=test%20test"],
  [{ key3: false }, "?key3=false"],
  [{ key4: true }, "?key4=true"],
  [{ key5: [1, 2, 3] }, "?key5[0]=1&key5[1]=2&key5[2]=3"],
  [{ key6: { a: 1 } }, "?key6[a]=1"],
  [
    { key7: { b: { d: { c: { a: [1, 2, 3] } } } } },
    "?key7[b][d][c][a][0]=1&key7[b][d][c][a][1]=2&key7[b][d][c][a][2]=3",
  ],
  [
    {
      key: 1,
      key2: "test test",
      key3: false,
      key4: true,
      key5: [1, 2, 3],
      key6: { a: 1 },
    },
    "?key=1&key2=test%20test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1",
  ],
];

describe("Should work queryStringify", () => {
  testCases.forEach((testCase) => {
    const [input, expected] = testCase;

    const result = queryStringify(input);

    it(`${printObject(input)} should transform in "${expected}"`, () => {
      expect(result).toEqual(expected);
    });
  });

  it(`should throw error if input is not an object`, () => {
    expect(() => {
      // @ts-ignore
      queryStringify(42);
    }).toThrowError("Input must be an object");
  });
});
