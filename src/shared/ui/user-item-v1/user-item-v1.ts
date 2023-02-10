import { store } from "app/store";

import { deleteUser } from "widgets/chat-menu/services/deleteUser";

import { getFile } from "shared/api";
import { Block } from "shared/core";

import "./user-item-v1.scss";

export type TUserItemV1Props = {
  avatar: string;
  firstName: string;
  secondName: string;
  displayName: string;
  id: string;
  chatId: string;
  role: "admin" | "regular";
  needRenderRemoveButton: boolean;
  onClick: (event: Event) => void;
};

export class UserItemV1 extends Block<TUserItemV1Props> {
  static cName = "UserItemV1";

  constructor({ ...props }: TUserItemV1Props) {
    super(props);

    this.setProps({
      needRenderRemoveButton: this.props.role !== "admin",
      onClick: (event: Event) => {
        event.preventDefault();

        const { chatId, id } = this.props;

        store.dispatch(deleteUser, { chatId, userIds: [id] });
      },
    });
  }

  render() {
    const avatar = this.props.avatar !== "null" ? `img="${getFile(this.props.avatar)}"` : "";

    return `
    <div class="user-item-v1 {{#if className}}{{className}}{{/if}}">

    <div class="user-item-v1__avatar">
      {{{Avatar
          ${avatar}
          className="avatar_xs"
      }}}
    </div>

    <div class="user-item-v1__body">
      <div class="user-item-v1__entry">
        <div class="user-item-v1__text user-item-v1__text-title">{{firstName}} {{secondName}}</div>
        <div class="user-item-v1__meta">
          <div class="user-item-v1__date">
            {{#if needRenderRemoveButton}}
              {{{Button
                value="Удалить"
                title="Удалить"
                htmlType="button"
                className="btn-link"
                onClick=onClick
              }}}
            {{/if}}
          </div>
        </div>
      </div>

      <div class="user-item-v1__entry">
        <div class="user-item-v1__text user-item-v1__text-message">{{displayName}}</div>
      </div>
    </div>

  </div>
    `;
  }
}
