import { Store } from "../store";

describe("core/Store", () => {
  it("should set state", () => {
    const store = new Store({});

    store.set({ userId: 123 });

    expect(store.getState()).toStrictEqual({ userId: 123 });
  });

  it("should emit event after store was update", () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();
    store.on("changed", mock);

    store.set({ userId: 123 });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 }, { userId: 123 });
  });

  it("should work dispatch when it is state", () => {
    const store = new Store({ userId: -1 });

    store.dispatch({ userId: 123 });

    expect(store.getState()).toStrictEqual({ userId: 123 });
  });

  it("should call callback with store and dispatch when it is function", () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.dispatch(mock, "PAYLOAD_PARAMS");

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), "PAYLOAD_PARAMS");
  });
});
