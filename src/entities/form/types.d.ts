import { Input, Textarea } from "shared/ui";

declare global {
  export type TFormFields = Input | Textarea;
}

export {};
