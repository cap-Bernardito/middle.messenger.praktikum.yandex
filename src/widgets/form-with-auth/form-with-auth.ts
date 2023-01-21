import { authModel } from "processes/auth";

import { Form, TFormProps } from "entities";

export const FormWithAuth = authModel.withAuth(
  class extends Form {
    constructor(props: TFormProps) {
      super(props);

      this.setProps({
        formError: () => {
          const { error } = authModel.selectUser();

          return error;
        },
        loading: () => {
          const { loading } = authModel.selectUser();

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
