import Handlebars from "handlebars";
import { nanoid } from "nanoid";

import { _ } from "shared/utils";

import { EventBus } from ".";

type EventBusEvents = TValues<typeof Block.EVENTS>;

export class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = nanoid(8);
  public refs: TRefs = {};
  public props: P;
  public readonly executableProps: { [propName: string]: any };
  public readonly extractedExecutableProps: { [propName: string]: any } = {};
  public childrenFromProps: { [propName: string]: Block } = {};

  protected _element = this._createDocumentElement("div");
  protected _childrenForReplace: { [id: string]: Block } = {};

  eventBus: () => EventBus<EventBusEvents>;

  public constructor(propsAndChildren?: P) {
    const eventBus = new EventBus<EventBusEvents>();

    const { children, props, refs, executableProps } = this._getChildren(propsAndChildren);

    this.refs = refs;

    // @ts-ignore
    this.props = props || ({} as P);
    this.childrenFromProps = this._makePropsProxy(children);
    this.executableProps = executableProps;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _getChildren(propsAndChildren = {}) {
    const children: { [key: string]: any } = {};
    const props: { [key: string]: any } = {};
    const refs: typeof this.refs = {};
    const executableProps: { [key: string]: any } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        children[key] = [];
        props[key] = [];

        value.forEach((element) => {
          if (element instanceof Block) {
            children[key].push(element);

            if (element.props.ref) {
              refs[element.props.ref] = element;
            }
          } else {
            props[key].push(element);
          }
        });
      } else {
        if (value instanceof Block) {
          children[key] = value;

          if (value.props.ref) {
            refs[value.props.ref] = value;
          }
        } else {
          props[key] = value;

          if (typeof value === "function" && value.name === "execProps") {
            executableProps[key] = value;
          }
        }
      }
    });

    return { children, props, refs, executableProps };
  }

  _registerEvents(eventBus: EventBus<EventBusEvents>) {
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  componentDidMount(props: P) {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const isRenderRequired = this.componentDidUpdate(oldProps, newProps);

    if (!isRenderRequired) {
      return;
    }

    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  setProps = (nextPartialProps: Partial<P>) => {
    if (!nextPartialProps) {
      return;
    }

    const { children, props, refs, executableProps } = this._getChildren(nextPartialProps);

    const prevProps = _.cloneDeep(this.props, (item) => {
      if (item instanceof Block) {
        return item;
      }
    });

    _.merge(this.props, props);
    Object.assign(this.refs, refs);
    Object.assign(this.executableProps, executableProps);
    Object.assign(this.childrenFromProps, children);

    // @ts-ignore
    if (!_.isEqual(prevProps, this.props)) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, this.props);
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    const newElement = this._compile();

    this._removeEvents();
    this._element.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
  }

  protected render(): string {
    return "";
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 10);
    }

    return this.element;
  }

  _makePropsProxy = (props: any): any => {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        if (prop.startsWith("_")) {
          throw new Error("Нет прав");
        }

        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        if (prop.startsWith("_")) {
          throw new Error("Нет прав");
        }

        if (!target[prop]) {
          target[prop] = value;

          this.eventBus().emit(Block.EVENTS.FLOW_CDU);

          return true;
        }

        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);

        return true;
      },
      deleteProperty() {
        throw new Error("Нет прав");
      },
    }) as unknown as P;
  };

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _handleEvents(isRemove = false) {
    const events: TEvents = this.props.events;

    if (!events) {
      return;
    }

    for (const [event, listener] of Object.entries(events)) {
      const listeners = Array.isArray(listener) ? listener : [listener];

      listeners.forEach((listener) => {
        if (listener) {
          if (isRemove) {
            this._element.removeEventListener(event, listener);
          } else {
            this._element.addEventListener(event, listener);
          }
        }
      });
    }
  }

  _removeEvents() {
    this._handleEvents(true);
  }

  _addEvents() {
    this._handleEvents();
  }

  _compile(): HTMLElement {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());

    const stubs: Record<string, string | string[]> = {};

    for (const [key, value] of Object.entries(this.executableProps)) {
      this.extractedExecutableProps[key] = value.call(this);
    }

    const requiringProcessingProps = Object.assign({}, this.extractedExecutableProps, this.childrenFromProps);

    for (const [key, value] of Object.entries(requiringProcessingProps)) {
      if (Array.isArray(value)) {
        stubs[key] = [];

        value.forEach((item) => {
          if (item instanceof Block) {
            (stubs[key] as string[]).push(`<div data-id="id-${item.id}"></div>`);
            this._childrenForReplace[item.id] = item;
          }
        });
      } else {
        if (value instanceof Block) {
          stubs[key] = `<div data-id="id-${value.id}"></div>`;
          this._childrenForReplace[value.id] = value;
        }
      }
    }

    fragment.innerHTML = template({
      ..._.merge({}, this.props, stubs),
      children: this._childrenForReplace,
      refs: this.refs,
    });

    Object.entries(this._childrenForReplace).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];
      const content = component.getContent();

      stub.replaceWith(content);

      const layoutContent = content.hasAttribute("data-layout-body")
        ? content
        : content.querySelector("[data-layout-body]");

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement | null;

    if (!newElement) {
      // @ts-ignore
      throw new Error(`Метод "${this.constructor.componentName}.render" возвращает невалидное значение`);
    }

    return newElement;
  }
}
