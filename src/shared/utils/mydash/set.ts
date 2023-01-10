import { isPlainObject } from "../utils";

import { merge } from "./";

export function set(target: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
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

  return merge(target, result);
}
