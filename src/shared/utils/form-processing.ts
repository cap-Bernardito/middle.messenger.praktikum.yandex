import { Block } from "shared/core/block";

type TFormData = Record<string, string>;

const checks = {
  login: {
    regex: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    message: "От 3 до 20 знаков (EN)",
  },
  password: {
    regex: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,40}$/,
    message: "от 8 знаков (EN), прописные, заглавные, цифры",
  },
  password_confirm: {
    regex: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,40}$/,
    message: "от 8 знаков (EN), прописные, заглавные, цифры",
  },
  email: {
    // eslint-disable-next-line no-useless-escape
    regex: /^[a-zA-Z0-9-_\/=+(){}\[\]$!]+@[a-zA-Z]+\.[a-zA-Z0-9]+$/,
    message: "(EN), непробельные знаки, @..., .домен",
  },
  first_name: {
    regex: /^[А-ЯA-Z][А-ЯA-Zа-яa-z-]+$/,
    message: "(RU/EN), первая буква прописная, -",
  },
  second_name: {
    regex: /^[А-ЯA-Z][А-ЯA-Zа-яa-z-]+$/,
    message: "(RU/EN), первая буква прописная, -",
  },
  phone: {
    // eslint-disable-next-line no-useless-escape
    regex: /^[\+]?[0-9]{10,15}$/,
    message: 'от 10 до 15 знаков, можно начать с "+"',
  },
};

type TKeysCheck = keyof typeof checks;

const isValidatedField = (fieldName: TKeysCheck | string): fieldName is TKeysCheck => fieldName in checks;

const getInputValue = (event: Event | null, field: Block): string => {
  const target = event?.target as HTMLInputElement | undefined;

  return target ? target.value : field.refs.inputRef.getContent().getAttribute("value") || "";
};

const checkField = (event: Event | null, field: Block) => {
  const value = getInputValue(event, field);
  const fieldName = field.props.name;

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
  const { password, password_confirm } = formData;

  if (typeof password === "undefined" || typeof password_confirm === "undefined") {
    return true;
  }

  return password === password_confirm;
};

const showPasswordsError = (fields: Block[]) => {
  const passwordFields = fields.filter((field) => field.props.name.includes("password"));

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
