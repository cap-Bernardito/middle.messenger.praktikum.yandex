import { store } from "app/store";

import { chatLib } from "pages/messenger/chat/model/lib";

import { addUser } from "widgets/chat-menu/services/addUser";

import { getFile } from "shared/api";
import { Block } from "shared/core";

import "./user-item-v2.scss";

export type TUserItemV2Props = {
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

export class UserItemV2 extends Block<TUserItemV2Props> {
  static cName = "UserItemV2";

  constructor({ ...props }: TUserItemV2Props) {
    super(props);

    this.setProps({
      needRenderRemoveButton: this.props.role !== "admin",
      onClick: (event: Event) => {
        event.preventDefault();

        const { chatId, id } = this.props;
        const { users } = chatLib.selectChat();
        const isExistUser = users?.some((i) => Number(i.id) === Number(id));

        if (!isExistUser) {
          store.dispatch(addUser, { chatId, usersIds: [id] });
        }
      },
    });
  }

  render() {
    const avatar = this.props.avatar !== "null" ? `img="${getFile(this.props.avatar)}"` : "";
    const displayName = this.props.displayName !== "null" ? `img="${getFile(this.props.avatar)}"` : "";

    return `
    <div class="user-item-v2 {{#if className}}{{className}}{{/if}}">

    <div class="user-item-v2__avatar">
      {{{Avatar
          ${avatar}
          className="avatar_xs"
      }}}
    </div>

    <div class="user-item-v2__body">
      <div class="user-item-v2__entry">
        <div class="user-item-v2__text user-item-v2__text-title">{{firstName}} {{secondName}}</div>
        <div class="user-item-v2__meta">
          <div class="user-item-v2__date">
            {{#if needRenderRemoveButton}}
              {{{Button
                value="Пригласить"
                title="Пригласить"
                htmlType="button"
                className="btn-link"
                onClick=onClick
              }}}
            {{/if}}
          </div>
        </div>
      </div>

      ${
        displayName &&
        `
      <div class="user-item-v2__entry">
        <div class="user-item-v2__text user-item-v2__text-message">{{displayName}}</div>
      </div>
      `
      }

    </div>

  </div>
    `;
  }
}
