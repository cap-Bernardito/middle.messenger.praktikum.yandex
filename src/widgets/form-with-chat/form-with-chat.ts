import { Form, TFormProps } from "entities";

import { connect } from "shared/utils/connect";

const withChat = connect((state) => {
  return {
    formError: state.chat.error,
    loading: state.chat.loading,
  };
});

export const FormWithChat = withChat(
  class extends Form {
    constructor(props: TFormProps) {
      super(props);
    }
  }
);
