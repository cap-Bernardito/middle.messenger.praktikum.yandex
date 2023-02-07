import { EventBus } from "../event-bus";

describe("core/EventBus", () => {
  it("should add listeners", () => {
    const eventBus = new EventBus();
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    eventBus.on("change", mock1);
    eventBus.on("change", mock2);

    // @ts-ignore
    expect(eventBus.listeners.change?.length).toBe(2);
  });

  it("should remove listeners", () => {
    const eventBus = new EventBus();
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    eventBus.on("change", mock1);
    eventBus.on("change", mock2);

    eventBus.off("change", mock2);

    // @ts-ignore
    expect(eventBus.listeners.change?.length).toBe(1);
  });

  it("should return instance if no listeners", () => {
    const eventBus = new EventBus();
    const mock = jest.fn();

    const result = eventBus.off("change", mock);

    expect(eventBus).toBe(result);
  });

  it("should emit event", () => {
    const eventBus = new EventBus();
    const mock = jest.fn();
    eventBus.on("change", mock);

    eventBus.emit("change");

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
