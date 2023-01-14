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

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname) || this.getRoute("*");

    if (!route) {
      throw new Error(`Component is not available on "${pathname}"`);
    }

    if (!route.routeShouldMount(route)) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  use(routeProps: TRouteObject, routeShouldMount: (route: Route) => boolean) {
    this._routes.push(new Route({ routeShouldMount, ...routeProps }));

    return this;
  }

  go(pathname: string) {
    this._history.pushState({}, "", pathname);

    this._onRoute(pathname);
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
}

export const router = new Router();
