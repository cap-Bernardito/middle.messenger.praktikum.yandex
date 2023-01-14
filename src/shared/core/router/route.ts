import { Block, renderDOM } from "..";

export class Route {
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
    return pathname === this._path;
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
