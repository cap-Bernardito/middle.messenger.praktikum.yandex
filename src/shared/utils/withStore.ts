import { store } from "app/store";

import { Store } from "shared/core";

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockConstructable<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static cName = WrappedBlock.cName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: store });
    }

    __onChangeStoreCallback = () => {
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);

      store.on("changed", this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();

      store.off("changed", this.__onChangeStoreCallback);
    }
  } as BlockConstructable<Omit<P, "store">>;
}
