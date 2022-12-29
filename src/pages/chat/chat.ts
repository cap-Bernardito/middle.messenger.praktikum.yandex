import { templateMessages, TMessagesProps } from "entities/messages_block";
import { MessagesBody } from "entities/messages-body_block";
import { MessagesFooter } from "entities/messages-footer_block";
import { MessagesHeader } from "entities/messages-header_block";
import { UserCard } from "entities/user-card_block";
import { templateUserList, TUserListProps } from "entities/user-list_block";

import { mdiArrowRightCircle, mdiChevronRight, mdiDotsVertical, mdiPaperclip } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { Block } from "shared/core";
import { Avatar, Button } from "shared/ui";
import { renderIcon } from "shared/ui/icon";
import { Message } from "shared/ui/message_block";
import { Search } from "shared/ui/search_block";
import { Textarea } from "shared/ui/textarea_block";
import { formProcess } from "shared/utils/form-processing";
import { _ } from "shared/utils/utils";

import { dateMock, messagesMock } from "./mockData";

export class ChatPage extends Block {
  static cName = "ChatPage";

  constructor() {
    super({
      ...({
        header_link: `<a href="/profile" class="link-icon">Профиль ${renderIcon({ value: mdiChevronRight })}</a>`,
        header_search: new Search({ value: "" }),
        users: _.range(14).map(
          (i, index) =>
            new UserCard({
              avatar: new Avatar({ className: "avatar_sm", img: index % 3 === 0 ? "" : img }),
              name: "Алексей",
              message: "Привет май френдз",
              date: dateMock[index] || `${index}.12.2022`,
              counter: index > 0 ? String(index) : undefined,
              className: index === 3 ? "active" : undefined,
            })
        ),
      } as TUserListProps),

      ...({
        header: new MessagesHeader({
          left: new UserCard({
            avatar: new Avatar({ className: "avatar_xs", img: img }),
            name: "<span class='text-base'>Алексей</span>",
            className: "not-interactive",
          }),
          right: `<a href="#" class="link-icon">${renderIcon({ value: mdiDotsVertical })}</a>`,
        }),
        body: new MessagesBody({
          messages: messagesMock
            .map((m) => new Message(m))
            .concat(messagesMock.map((m) => new Message(m)))
            .concat(messagesMock.map((m) => new Message(m))),
        }),
        footer: new MessagesFooter({
          ref: "form",
          onSubmit: (event) => {
            const { isFormValid, formData } = formProcess.form.check(event, Object.values(this.getFormInputs()));

            console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
          },
          file: `<a href="#" class="link-icon link-icon-clip">${renderIcon({ value: mdiPaperclip })}</a>`,
          text: new Textarea({
            name: "message",
            placeholder: "Сообщение",
            ref: "messageInput",
            onBlur: (event) => {
              formProcess.field.setValue(event, this.getFormInputs().messageInput);
            },
          }),
          button: new Button({
            value: `${renderIcon({ value: mdiArrowRightCircle })}`,
            className: "link-icon link-icon-submit",
          }),
        }),
      } as TMessagesProps),
    });
  }

  getFormInputs = () => {
    return this.refs.form.refs || {};
  };

  render() {
    return `
{{#LayoutFullScreen}}

  {{#LayoutFullScreenAside}}
    ${templateUserList}
  {{/LayoutFullScreenAside}}

  {{#LayoutFullScreenMain}}
    ${templateMessages}
  {{/LayoutFullScreenMain}}

{{/LayoutFullScreen}}
    `;
  }
}
