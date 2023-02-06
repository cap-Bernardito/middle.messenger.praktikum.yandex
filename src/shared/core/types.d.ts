import { Block } from "shared/core/block";

declare global {
  export type TStateProps = Record<string, unknown>;

  export type TRouteData = {
    pathname: string;
    params: Record<string, string>;
    route: Route;
  };

  export type BlockConstructable<Props = unknown> = {
    cName: string;
    new (props: Props): Block;
  };

  export type TRefs = { [key: string]: Block };

  export type TRouteObject = {
    path: string;
    element?: BlockConstructable;
    title?: string;
    shouldAuthorized?: boolean;
    routeShouldMount?: (route: Route) => boolean;
    routeDidMount?: (routeData: TRouteData) => void;
  };

  export type DispatchStateHandler<TAction> = (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: TAction
  ) => void | Promise<void>;
}

export {};
