import { store } from "app/store";

import { _ } from "shared/utils";

export function connect<P extends Record<string, any> = any>(mapStateToProps: (state: AppState) => PlainObject) {
  return function (Component: BlockConstructable<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends Component<P> {
      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on("changed", (_prevState, newState) => {
          newState = mapStateToProps(newState);

          if (!_.isEqual(state, newState)) {
            // @ts-expect-error this is not typed
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    } as BlockConstructable<P>;
  };
}
