import Handlebars from "handlebars";
import { nanoid } from "nanoid";

import { EventBus } from ".";

interface BlockMeta<P = any> {
  props: P;
}

type Events = Values<typeof Block.EVENTS>;

export class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = nanoid(8);
  private readonly _meta: BlockMeta;

  protected _element = this._createDocumentElement("div");
  protected readonly props: P;
  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};
  protected refs: { [key: string]: HTMLElement } = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props,
    };

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props || ({} as P));
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected getStateFromProps(props?: any): void;
  protected getStateFromProps() {
    this.state = {};
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  componentDidMount(props: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
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

        Reflect.set(target, prop, value);

        // TODO: Плохой cloneDeep. В след итерации улучшить
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);

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

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener);
    });
  }

  _compile(): HTMLElement {
    const fragment = document.createElement("template");
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];
      const content = component.getContent();

      stub.replaceWith(content);

      const layoutContent = content.querySelector("[data-layout-body]");

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

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
