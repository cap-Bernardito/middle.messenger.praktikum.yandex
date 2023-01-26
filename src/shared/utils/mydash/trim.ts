export const trim = (string: string, chars?: string) => {
  const spacePattern = "\\s";
  let pattern = spacePattern;

  if (typeof chars === "string") {
    pattern = chars?.split("").reduce((acc, char) => {
      return (acc += char.match(spacePattern) ? spacePattern : char);
    }, "");
  }

  const reGexp = new RegExp(`^[${pattern}]+|[${pattern}]+$`, "g");

  return string.replace(reGexp, "");
};
