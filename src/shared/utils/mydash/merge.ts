export type Indexed<T = unknown> = {
  [key in string]?: T;
};

export const isObject = (value: unknown): value is Indexed => toString.call(value) === "[object Object]";

export function merge(dst: Indexed, ...args: Indexed[]) {
  let src: Indexed;
  let p: string;

  while (args.length > 0) {
    src = args.splice(0, 1)[0];

    for (p in src) {
      if (Object.prototype.hasOwnProperty.call(src, p)) {
        const srcValue = src[p];
        const distValue = dst[p];

        if (isObject(srcValue) && (isObject(distValue) || typeof distValue === "undefined")) {
          dst[p] = merge(distValue || {}, srcValue);
        } else if (Array.isArray(srcValue) && (Array.isArray(distValue) || typeof distValue === "undefined")) {
          dst[p] = [...(distValue || []), ...srcValue];
        } else {
          dst[p] = src[p];
        }
      }
    }
  }

  return dst;
}
