import { store } from "app/store";

import { _ } from "shared/utils";

export function connect<P extends Record<string, unknown>>(mapStateToProps: (state: AppState) => PlainObject) {
  return function (Component: BlockConstructable<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends Component<P> {
      constructor(props: P) {
        const state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on("changed", (_prevState, newState) => {
          const prevState = mapStateToProps(_prevState);
          const nextState = mapStateToProps(newState);

          if (!_.isEqual(prevState, nextState)) {
            // @ts-expect-error this is not typed
            this.setProps({ ...nextState });
          }
        });
      }
    } as BlockConstructable<P>;
  };
}
