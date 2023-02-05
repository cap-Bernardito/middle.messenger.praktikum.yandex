import { initialState } from "./store";

declare global {
  export type AppState = typeof initialState;

  export type Dispatch<State> = (nextStateOrAction: Partial<State> | Action<State>, payload?: unknown) => void;

  export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: TNullable<any>) => void;
}

export {};
