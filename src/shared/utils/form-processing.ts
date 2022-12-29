import { Block } from "shared/core/block";

type TFormData = Record<string, string>;
type TKeysCheck = keyof typeof checks;

const passwordCheck = {
  regex: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,40}$/,
  message: "от 8 знаков (EN), прописные, заглавные, цифры",
};

const nameCheck = {
  regex: /^[А-ЯA-ZЁ][А-ЯA-Zа-яa-z-ёЁ]+$/,
  message: "(RU/EN), первая буква прописная, -",
};

const checks = {
  first_name: nameCheck,
  second_name: nameCheck,
  password: passwordCheck,
  password_confirm: passwordCheck,
  oldPassword: passwordCheck,
  newPassword: passwordCheck,
  login: {
    regex: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    message: "От 3 до 20 знаков (EN)",
  },
  email: {
    // eslint-disable-next-line no-useless-escape
    regex: /^[a-zA-Z0-9-_\/=+(){}\[\]$!]+@[a-zA-Z]+\.[a-zA-Z0-9]+$/,
    message: "(EN), непробельные знаки, @..., .домен",
  },
  phone: {
    // eslint-disable-next-line no-useless-escape
    regex: /^[\+]?[0-9]{10,15}$/,
    message: 'от 10 до 15 знаков, можно начать с "+"',
  },
};

const checksIgnoreFields = ["display_name"];

const isValidatedField = (fieldName: TKeysCheck | string): fieldName is TKeysCheck => fieldName in checks;

const getInputValue = (event: Event | null, field: Block): string => {
  const target = event?.target as HTMLInputElement | undefined;

  return target ? target.value : field.refs.inputRef.getContent().getAttribute("value") || "";
};

const checkField = (event: Event | null, field: Block) => {
  const value = getInputValue(event, field);
  const fieldName = field.props.name;

  if (checksIgnoreFields.includes(field.props.name)) {
    return { isValid: true, fieldValue: value, fieldName };
  }

  if (!isValidatedField(fieldName)) {
    throw new Error(`There are no validation rules for the field "${fieldName}"`);
  }

  const checkCase = checks[fieldName];
  let errorMessage = checks[fieldName].message;

  if (checkCase.regex.test(value)) {
    errorMessage = "";
  }

  field.refs.errorRef.setProps({ text: errorMessage });

  return { isValid: !errorMessage, fieldValue: value, fieldName };
};

const setValue = (event: Event, field: Block) => {
  if (!event.target || !(field instanceof Block)) {
    return;
  }

  const value = (event.target as HTMLInputElement).value;

  field.refs.inputRef.getContent().setAttribute("value", value);
};

const checkPasswords = (formData: TFormData) => {
  const { password, newPassword, password_confirm } = formData;
  const firstPassword = password || newPassword;

  if (typeof password_confirm === "undefined") {
    return true;
  }

  return firstPassword === password_confirm;
};

const showPasswordsError = (fields: Block[]) => {
  const comparedPasswords = ["password", "newpassword", "password_confirm"];
  const passwordFields = fields.filter((field) => {
    const fieldName = field.props.name.toLowerCase();

    return comparedPasswords.includes(fieldName);
  });

  passwordFields.forEach((field) => {
    field.refs.errorRef.setProps({ text: "Пароли не совпадают" });
  });
};

const checkForm = (event: Event, fields: Block[]) => {
  event.preventDefault();

  const formData: TFormData = {};
  let isFormValid = true;

  fields.forEach((field) => {
    const { isValid, fieldName, fieldValue } = checkField(null, field);

    formData[fieldName] = fieldValue;

    if (!isValid) {
      isFormValid = false;
    }
  });

  if (!checkPasswords(formData)) {
    isFormValid = false;
    showPasswordsError(fields);
  }

  return { isFormValid, formData };
};

export const formProcess = {
  field: {
    check: checkField,
    setValue,
  },
  form: {
    check: checkForm,
  },
};
