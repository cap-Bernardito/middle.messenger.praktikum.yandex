import { chatModel } from "pages/messenger/chat";

import { Form, TFormProps } from "entities";

export const FormWithChat = chatModel.withChat(
  class extends Form {
    constructor(props: TFormProps) {
      super(props);

      this.setProps({
        formError: () => {
          const { error } = chatModel.selectChat();

          return error;
        },
        loading: () => {
          const { loading } = chatModel.selectChat();

          return loading;
        },
      });
    }

    componentDidUpdate() {
      // TODO: разобраться с этим (в формах не отображается статус загрузки)
      return true;
    }
  }
);
