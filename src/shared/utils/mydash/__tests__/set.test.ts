import { _ } from "../..";

describe("Should work set", () => {
  it(`return target if target is not object`, () => {
    // @ts-ignore
    const result = _.set(3, "bar.baz", 10);

    expect(result).toEqual(3);
  });

  it(`target object should mutate`, () => {
    const dist = { a: 1 };

    const result = _.set(dist, "bar.baz", 10);

    expect(result).toEqual({ a: 1, bar: { baz: 10 } });
    expect(dist === result).toEqual(true);
  });
});
