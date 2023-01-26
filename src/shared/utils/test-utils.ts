import { isArrayOrObject } from "./utils";

export const printObject = (obj: PlainArrayOrObject) => {
  let pairs;

  if (Array.isArray(obj)) {
    pairs = obj.map((value) => {
      if (isArrayOrObject(value)) {
        value = printObject(value);
      } else if (Array.isArray(value)) {
        value = `[${value.join(", ")}]`;
      }

      return `${value}`;
    });
  } else {
    pairs = Object.entries(obj).map(([key, value]) => {
      if (isArrayOrObject(value)) {
        value = printObject(value);
      } else if (Array.isArray(value)) {
        value = `[${value.join(", ")}]`;
      }

      return `${key}: ${value}`;
    });
  }

  return `{${pairs.join(", ")}}`;
};
