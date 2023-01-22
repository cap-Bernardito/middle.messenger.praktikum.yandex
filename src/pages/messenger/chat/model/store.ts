export type TChatState = {
  users: number;
  loading: boolean;
  error: TNullable<string>;
};

export const chatState: TChatState = {
  users: 0,
  loading: false,
  error: null,
};
