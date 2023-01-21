import { Route } from "..";

class Router {
  private static _instance: Router;
  private _routes: Route[] = [];
  private _history = window.history;
  private _currentRoute: Route | null = null;
  private _cache: Record<string, any> = {};

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }

    Router._instance = this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const eventTarget = event.currentTarget as Window;

      this._onRoute(eventTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string, isRenderRoute = true): boolean {
    const route = (this.getRoute(pathname) || this.getRoute("*")).route;

    if (!route) {
      throw new Error(`Component is not available on "${pathname}"`);
    }

    if (!route.routeShouldMount(route)) {
      return false;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    if (isRenderRoute) {
      route.render();
    }

    return true;
  }

  use(routeProps: TRouteObject, routeShouldMount: (route: Route) => boolean) {
    this._routes.push(new Route({ routeShouldMount, ...routeProps }));

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

  getRoute(pathname: string) {
    if (!this._cache[pathname]) {
      const route = this._routes.find((route) => route.match(pathname));

      if (!route) {
        return null;
      }

      this._cache[pathname] = {
        route: route,
        params: route.getParams(),
      };
    }

    return this._cache[pathname];
  }

  getParams() {
    const route = this.getRoute(window.location.pathname);

    return route ? route.params : {};
  }
}

export const router = new Router();
