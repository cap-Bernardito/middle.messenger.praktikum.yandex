export const getFile = (path: string) => {
  if (!path) {
    return undefined;
  }

  return `${process.env.API_ENDPOINT}/resources${encodeURI(path)}`;
};
