import { Form, TFormProps } from "entities";

import { connect } from "shared/utils/connect";

const withChat = connect((state) => {
  if (typeof state.chat === "undefined") {
    return {};
  }

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
