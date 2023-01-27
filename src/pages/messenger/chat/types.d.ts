// https://ya-praktikum.tech/api/v2/openapi/ws

export type TWDataText = {
  type: "ping" | "pong" | "get old" | "message" | "file" | "sticker" | "user connected";
  content?: string;
};

export type TDialogMessageDTO = {
  id: number;
  chat_id: number;
  time: string;
  type: TWDataText["type"];
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type TDialogMessage = {
  id: number;
  chatId: number;
  time: string;
  type: TWDataText.type;
  userId: string;
  content: string;
  file?: {
    id: number;
    userId: number;
    path: string;
    filename: string;
    contentType: string;
    contentSize: number;
    uploadDate: string;
  };
};
