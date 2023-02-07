import { APIError } from "shared/api/types";

import { isPlainObject } from "./utils";

export function hasError(response: unknown): response is APIError {
  if (isPlainObject(response)) {
    return Boolean(response.reason);
  }

  return false;
}
