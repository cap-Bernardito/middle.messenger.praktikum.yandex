import { Form, TFormProps } from "entities";

import { connect } from "shared/utils/connect";

const withAuthLoadStatus = connect((state) => {
  return {
    formError: state.auth.error,
    loading: state.auth.loading,
  };
});

export const FormWithAuthStatus = withAuthLoadStatus(
  class extends Form {
    constructor(props: TFormProps) {
      super(props);
    }
  }
);
