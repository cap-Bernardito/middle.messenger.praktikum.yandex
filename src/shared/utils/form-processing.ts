import { Block } from "shared/core/block";

const checks = {
  login: {
    regex: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    message: "От 3 до 20 знаков (EN)",
  },
  password: {
    regex: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,40}$/,
    message: "от 8 знаков (EN), прописные, заглавные, цифры",
  },
};

type TKeysCheck = keyof typeof checks;

const isValidatedField = (fieldName: TKeysCheck | string): fieldName is TKeysCheck => fieldName in checks;

const checkField = (event: Event, field: Block) => {
  if (!event.target || !(field instanceof Block)) {
    return;
  }

  const value = (event.target as HTMLInputElement).value;
  const fieldName = field.props.name;

  if (!isValidatedField(fieldName)) {
    throw new Error(`There are no validation rules for the field "${fieldName}"`);
  }

  const checkCase = checks[fieldName];
  let errorMessage = checks[fieldName].message;

  if (checkCase.regex.test(value) || value.length === 0) {
    errorMessage = "";
  }

  field.refs.errorRef.setProps({ text: errorMessage });
};

const setValue = (event: Event, field: Block) => {
  if (!event.target || !(field instanceof Block)) {
    return;
  }

  const value = (event.target as HTMLInputElement).value;
  field.refs.inputRef.setProps({ value });
};

export const formProcess = {
  field: {
    check: checkField,
    setValue,
  },
};
