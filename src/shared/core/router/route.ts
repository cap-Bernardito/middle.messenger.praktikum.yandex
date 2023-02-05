import { Block } from "shared/core/block";
import { renderDOM } from "shared/core/render-dom";

export class Route {
  private _screen: TNullable<Block> = null;
  private _screenConstructor;
  private _path;
  private _title;
  private _shouldAuthorized;
  public routeShouldMount;
  public routeDidMount;

  constructor({
    path,
    element,
    title,
    shouldAuthorized,
    routeShouldMount = () => true,
    routeDidMount = () => true,
  }: TRouteObject) {
    this._path = path;
    this._screenConstructor = element;
    this._title = title || "";
    this._shouldAuthorized = shouldAuthorized;
    this.routeShouldMount = routeShouldMount;
    this.routeDidMount = routeDidMount;
  }

  public leave() {
    if (this._screen) {
      this._screen = null;
    }
  }

  match(pathname: string): TRouteData | null {
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

    return {
      route: this,
      params,
      pathname,
    };
  }

  isPrivate() {
    return this._shouldAuthorized;
  }

  render() {
    if (!this._screen && this._screenConstructor) {
      this._screen = new this._screenConstructor({});

      renderDOM(this._screen);

      document.title = `App / ${this._title}`;
    }
  }
}
