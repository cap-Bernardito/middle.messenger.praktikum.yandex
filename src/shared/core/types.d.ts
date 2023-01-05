import { Block } from "shared/core/block";

declare global {
  export type BlockConstructable<Props = any> = {
    cName: string;
    new (props: Props): Block;
  };

  export type TRefs = { [key: string]: Block };
}

export {};
