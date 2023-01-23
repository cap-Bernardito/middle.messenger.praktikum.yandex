import { Form, TFormProps } from "entities";

import { connect } from "shared/utils/connect";

const withAuth = connect((state) => {
  if (typeof state.auth === "undefined") {
    return {};
  }

  return {
    formError: state.auth.error,
    loading: state.auth.loading,
  };
});

export const FormWithAuth = withAuth(
  class extends Form {
    constructor(props: TFormProps) {
      super(props);
    }
  }
);
