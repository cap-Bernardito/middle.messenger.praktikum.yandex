import { templateMessages, TMessagesProps } from "entities/messages";
import { MessagesBody } from "entities/messages-body";
import { MessagesFooter } from "entities/messages-footer";
import { MessagesHeader } from "entities/messages-header";
import { UserCard } from "entities/user-card";
import { templateUserList, TUserListProps } from "entities/user-list";

import { mdiChevronRight, mdiDotsVertical, mdiPaperclip, mdiSend } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { Block } from "shared/core";
import { Avatar, Button } from "shared/ui";
import { renderIcon } from "shared/ui/icon_string";
import { Message } from "shared/ui/message";
import { Search } from "shared/ui/search";
import { Textarea } from "shared/ui/textarea";
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
        users: _.range(10).map(
          (index) =>
            new UserCard({
              avatar: new Avatar({ className: "avatar_sm", img: index % 3 === 0 ? "" : img }),
              name: "Вася Василёк",
              message: "Привет май френдз. Привет! Смотри, тут всплыл",
              date: dateMock[index] || `${index}.12.2022`,
              counter: index > 0 ? String(index) : undefined,
              className: index === 2 ? "active" : undefined,
            })
        ),
      } as TUserListProps),

      ...({
        header: new MessagesHeader({
          left: new UserCard({
            avatar: new Avatar({ className: "avatar_xs", img: img }),
            name: "<span class='text-base'>Алексей</span>",
            message: "<span class='text-base text-gray-500'>был(а) 33 минуты назад</span>",
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
            placeholder: "Написать собщение...",
            ref: "messageInput",
            onBlur: (event) => {
              formProcess.field.setValue(event, this.getFormInputs().messageInput);
            },
          }),
          button: new Button({
            value: `${renderIcon({ value: mdiSend })}`,
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
