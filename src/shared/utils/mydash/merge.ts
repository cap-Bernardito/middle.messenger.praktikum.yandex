export function merge(...args: Record<string, any>[]) {
  const dst: Record<string, any> = {};
  let src: Record<string, any>;
  let p: string;

  while (args.length > 0) {
    src = args.splice(0, 1)[0];

    for (p in src) {
      if (Object.prototype.hasOwnProperty.call(src, p)) {
        if (toString.call(src[p]) == "[object Object]") {
          dst[p] = merge(dst[p] || {}, src[p]);
        } else if (Array.isArray(src[p])) {
          dst[p] = [...(dst[p] || []), ...src[p]];
        } else {
          dst[p] = src[p];
        }
      }
    }
  }

  return dst;
}
