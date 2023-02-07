import { Home, Page_1 } from "./fixtures";

describe("core/Block", () => {
  it("should init with props", () => {
    const component = new Home({ test: "passed" });

    expect(component.props.test).toBe("passed");
  });

  it("should set props with 'setProps' method", () => {
    const component = new Home();

    component.setProps({ test: "passed" });

    expect(component.props.test).toBe("passed");
  });

  it("should separate children from props", () => {
    const component = new Home();

    component.setProps({ test: "passed", child: new Page_1({}) });

    expect(component.childrenFromProps.child).toBeDefined();
    expect(component.childrenFromProps.child.constructor).toBe(Page_1);
  });

  it("should run 'componentDidUpdate' when props changed", () => {
    const mock = jest.fn();
    const component = new Home({ test: "passed", child: new Page_1({}) });

    component.componentDidUpdate = () => {
      mock();
      return true;
    };
    component.setProps({ test: "changed passed" });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should run 'componentDidUpdate' when children changed", () => {
    const mock = jest.fn();
    const component = new Home({ test: "passed", child: new Page_1({}) });

    component.componentDidUpdate = () => {
      mock();
      return true;
    };
    component.setProps({ child: new Page_1({}) });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should do not run 'componentDidUpdate' when props is not changed", () => {
    const mock = jest.fn();
    const component = new Home({ test: "passed", child: new Page_1({}) });

    component.componentDidUpdate = () => {
      mock();
      return true;
    };
    component.setProps({ test: "passed" });

    expect(mock).toHaveBeenCalledTimes(0);
  });

  it("should create HTML element from 'render' method", () => {
    const component = new Home();

    expect(component.getContent().innerHTML).toBe("Home");
  });
});
