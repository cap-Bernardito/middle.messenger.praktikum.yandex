export type TChatState = {
  loading: boolean;
  error: TNullable<string>;
};

export const chatState: TChatState = {
  loading: false,
  error: null,
};
