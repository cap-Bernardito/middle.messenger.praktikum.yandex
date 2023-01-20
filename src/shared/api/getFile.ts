const cache: Record<string, string> = {};

export const getFile = (path: string) => {
  if (typeof cache[path] === "undefined") {
    cache[path] = `${process.env.API_ENDPOINT}/resources${encodeURI(path)}`;
  }

  return cache[path];
};
