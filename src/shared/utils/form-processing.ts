import { Block } from "shared/core/block";
import { Input } from "shared/ui";

type TFormData = Record<string, string | FileList>;
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
  message: {
    regex: /.*\S.*/,
    message: "Поле не должно быть пустым",
  },
  title: {
    regex: /.*\S.*/,
    message: "Поле не должно быть пустым",
  },
};

const checksIgnoreFields = ["display_name", "avatar", "oldPassword"];

const isValidatedField = (fieldName: TKeysCheck | string): fieldName is TKeysCheck => fieldName in checks;

const isInput = (field: TFormFields): field is Input => field.getContent().tagName.toUpperCase() === "INPUT";

const isFileInput = (field: TFormFields): field is Input => {
  if (!isInput(field)) {
    return false;
  }

  return field.props.type === "file";
};

const getInputValue = (event: Event | null, field: TFormFields) => {
  const target = (event?.target || field.refs.inputRef.getContent()) as HTMLInputElement | undefined;
  const defaultValue = "";

  if (!target) {
    return { value: defaultValue };
  }

  if (target["type"] === "file") {
    return { value: defaultValue, files: target.files };
  }

  return { value: target.value };
};

const checkField = (event: Event | null, field: TFormFields) => {
  const { value, files } = getInputValue(event, field);
  const fieldName = field.props.name;

  if (checksIgnoreFields.includes(field.props.name) || isFileInput(field)) {
    return { isValid: true, fieldValue: value, fieldFiles: files, fieldName };
  }

  if (!isValidatedField(fieldName)) {
    throw new Error(`There are no validation rules for the field "${fieldName}"`);
  }

  const checkCase = checks[fieldName];
  let errorMessage = checks[fieldName].message;

  if (checkCase.regex.test(value)) {
    errorMessage = "";
  }

  field.refs?.errorRef?.setProps({ text: errorMessage });

  return { isValid: !errorMessage, fieldValue: value, fieldName };
};

const setValue = (event: Event, field: TFormFields) => {
  if (!event.target || !(field instanceof Block)) {
    return;
  }

  const input = event.target as HTMLInputElement;
  const value = input.value;
  const files = input.files;

  field.refs.inputRef.getContent().setAttribute("value", value);

  if ("files" in input) {
    (field.refs.inputRef.getContent() as HTMLInputElement).files = files;
  }
};

const checkPasswords = (formData: TFormData) => {
  const { password, newPassword, password_confirm } = formData;
  const firstPassword = password || newPassword;

  if (typeof password_confirm === "undefined") {
    return true;
  }

  return firstPassword === password_confirm;
};

const showPasswordsError = (fields: TFormFields[]) => {
  const comparedPasswords = ["password", "newpassword", "password_confirm"];
  const passwordFields = fields.filter((field) => {
    const fieldName = field.props.name.toLowerCase();

    return comparedPasswords.includes(fieldName);
  });

  passwordFields.forEach((field) => {
    field.refs.errorRef.setProps({ text: "Пароли не совпадают" });
  });
};

const checkForm = (event: Event, fields: TFormFields[]) => {
  event.preventDefault();

  const formData: TFormData = {};
  let isFormValid = true;

  fields.forEach((field) => {
    const { isValid, fieldName, fieldValue, fieldFiles } = checkField(null, field);

    formData[fieldName] = fieldFiles ? fieldFiles : fieldValue;

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
