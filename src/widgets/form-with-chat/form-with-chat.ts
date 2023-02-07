import { Form, TFormProps } from "entities";

import { connect } from "shared/utils/connect";

const withChatLoadStatus = connect((state) => {
  return {
    formError: state.chat.error,
    loading: state.chat.loading,
  };
});

export const FormWithChatLoadStatus = withChatLoadStatus(
  // @ts-ignore
  class extends Form {
    constructor(props: TFormProps) {
      super(props);
    }
  }
);
