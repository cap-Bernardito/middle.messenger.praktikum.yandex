import { Block, renderDOM } from "..";

export class Route {
  private _params: Record<string, string> = {};
  private _screen: TNullable<Block> = null;
  private _screenConstructor;
  private _path;
  private _title;
  private _shouldAuthorized;
  public routeShouldMount;

  constructor({ path, element, title, shouldAuthorized, routeShouldMount = () => true }: TRouteObject) {
    this._path = path;
    this._screenConstructor = element;
    this._title = title || "";
    this._shouldAuthorized = shouldAuthorized;
    this.routeShouldMount = routeShouldMount;
  }

  public leave() {
    if (this._screen) {
      this._screen = null;
    }
  }

  match(pathname: string) {
    // https://github.com/remix-run/react-router/blob/4f3ad7b96e6e0228cc952cd7eafe2c265c7393c7/packages/router/utils.ts#L773
    const paramNames: Record<string, string>[] = [];
    const regexpSource =
      "^" +
      this._path
        .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
        .replace(/\/:(\w+)/g, (_, paramName) => {
          paramNames.push(paramName);
          return "/([^\\/]+)";
        }) +
      "\\/*$";

    const matcher = new RegExp(regexpSource, "i");
    const match = pathname.match(matcher);

    if (!match) {
      return null;
    }

    const captureGroups = match.slice(1);

    const params = paramNames.reduce((memo, paramName, index) => {
      // @ts-ignore
      memo[paramName] = captureGroups[index] || "";

      return memo;
    }, {});

    this._params = { ...params };

    return {
      params,
      pathname,
    };
  }

  getParams() {
    return this._params;
  }

  isPrivate() {
    return this._shouldAuthorized;
  }

  render() {
    if (!this._screen) {
      this._screen = new this._screenConstructor({});
    }

    renderDOM(this._screen);

    document.title = `App / ${this._title}`;
  }
}
