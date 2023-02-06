import { isPlainObject } from "../utils";

import { merge } from "./merge";

export function set<T>(target: PlainObject, path: string, value: unknown): PlainObject<T> {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (!isPlainObject(target)) {
    return target;
  }

  const pathParts = path.split(".");

  const result = path.split(".").reduceRight((acc, key, index) => {
    if (index === pathParts.length - 1) {
      return { [key]: value };
    }

    return { [key]: acc };
  }, {});

  return merge(target, result) as PlainObject<T>;
}
