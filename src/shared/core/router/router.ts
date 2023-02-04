import { EventBus, Route } from "..";

export class Router extends EventBus {
  static EVENTS = {
    WIDGET_TOGGLE: "widget:toggle",
  } as const;

  private static _instance: TNullable<Router>;
  private _routes: Route[] = [];
  private _history = window.history;
  private _currentRoute: Route | null = null;
  private _cache: Record<string, any> = {};

  constructor() {
    super();

    if (Router._instance) {
      return Router._instance;
    }

    Router._instance = this;
  }

  destroy() {
    Router._instance = null;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const eventTarget = event.currentTarget as Window;

      this._onRoute(eventTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string, isRenderRoute = true): boolean {
    const routeData = this.getRoute(pathname) || this.getRoute("*");

    if (!routeData) {
      throw new Error(`Component is not available on "${pathname}"`);
    }

    if (!routeData.route.routeShouldMount(routeData.route)) {
      return false;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = routeData.route;

    if (isRenderRoute) {
      routeData.route.render();
    }

    routeData.route.routeDidMount(routeData);

    return true;
  }

  use(
    routeProps: TRouteObject,
    routeShouldMount: (route: Route) => boolean,
    routeDidMount?: (routeData: TRouteData) => void
  ) {
    this._routes.push(new Route({ routeShouldMount, routeDidMount, ...routeProps }));

    return this;
  }

  go(pathname: string, isRenderRoute?: boolean) {
    if (this._onRoute(pathname, isRenderRoute)) {
      this._history.pushState({}, "", pathname);
    }
  }

  restart() {
    this.go(window.location.pathname);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  getRoute(pathname: string): TRouteData | null {
    if (!this._cache[pathname]) {
      let result = null;

      for (const route of this._routes) {
        if (result) {
          continue;
        }

        result = route.match(pathname);
      }

      if (!result) {
        return null;
      }

      this._cache[pathname] = result;
    }

    return this._cache[pathname];
  }

  getParams() {
    const route = this.getRoute(window.location.pathname);

    return route ? route.params : {};
  }
}

export const router = new Router();
