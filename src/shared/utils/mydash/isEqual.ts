import { getObjectKeys, isArrayOrObject } from "../utils";

export const isEqual = (a: PlainArrayOrObject, b: PlainArrayOrObject): boolean => {
  const aProps = getObjectKeys(a);
  const aLength = aProps.length;
  const bProps = Object.keys(b) as (keyof typeof a)[];
  const bLength = bProps.length;

  if (aLength != bLength) {
    return false;
  }

  let index = aLength;

  while (index--) {
    const key = aProps[index];

    if (!Object.hasOwnProperty.call(b, key)) {
      return false;
    }
  }

  while (++index < aLength) {
    const key = aProps[index];

    const aValue = a[key];
    const bValue = b[key];

    if (aValue !== bValue) {
      if (Number.isNaN(aValue) && Number.isNaN(bValue)) {
        return true;
      }

      if (typeof aValue === "function" && typeof bValue === "function") {
        return aValue.toString() === bValue.toString();
      }

      if (isArrayOrObject(aValue) && isArrayOrObject(bValue)) {
        return isEqual(aValue, bValue);
      }

      return false;
    }
  }

  return true;
};
