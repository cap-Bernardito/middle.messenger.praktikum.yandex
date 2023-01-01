import { Block } from "shared/core/block";

declare global {
  export type TFormFields = Block<TInputProps> | Block<TTextareaProps>;
}

export {};
