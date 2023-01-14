import { Block } from "shared/core/block";

declare global {
  export type BlockConstructable<Props = any> = {
    cName: string;
    new (props: Props): Block;
  };

  export type TRefs = { [key: string]: Block };

  export type TRouteObject = {
    path: string;
    element: BlockConstructable;
    title?: string;
    shouldAuthorized?: boolean;
    routeShouldMount?: (route: Route) => boolean;
  };
}

export {};
