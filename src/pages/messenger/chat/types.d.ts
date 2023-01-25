export type TDialogMessageDTO = {
  id: "number";
  chat_id: "number";
  time: "string";
  type: "string";
  user_id: "string";
  content: "string";
  file?: {
    id: "number";
    user_id: "number";
    path: "string";
    filename: "string";
    content_type: "string";
    content_size: "number";
    upload_date: "string";
  };
};

export type TDialogMessage = {
  id: "number";
  chatId: "number";
  time: "string";
  type: "string";
  userId: "string";
  content: "string";
  file?: {
    id: "number";
    userId: "number";
    path: "string";
    filename: "string";
    contentType: "string";
    contentSize: "number";
    uploadDate: "string";
  };
};
