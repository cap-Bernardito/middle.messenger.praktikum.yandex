import { Route } from "..";

class Router {
  private static _instance: Router;
  private _routes: Route[] = [];
  private _history = window.history;
  private _currentRoute: Route | null = null;

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

  private _onRoute(pathname: string): boolean {
    const route = this.getRoute(pathname) || this.getRoute("*");

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

    route.render();

    return true;
  }

  use(routeProps: TRouteObject, routeShouldMount: (route: Route) => boolean) {
    this._routes.push(new Route({ routeShouldMount, ...routeProps }));

    return this;
  }

  go(pathname: string) {
    if (this._onRoute(pathname)) {
      this._history.pushState({}, "", pathname);
    }
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }

  getParams() {
    const route = this.getRoute(window.location.pathname);

    return route ? route.getParams() : {};
  }
}

export const router = new Router();
