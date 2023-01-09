import { Indexed, isObject, merge } from "./";

export function set(target: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (!isObject(target)) {
    return target;
  }

  const pathParts = path.split(".");

  const result = path.split(".").reduceRight((acc, key, index) => {
    if (index === pathParts.length - 1) {
      return { [key]: value };
    }

    return { [key]: acc };
  }, {});

  return merge(target, result);
}
