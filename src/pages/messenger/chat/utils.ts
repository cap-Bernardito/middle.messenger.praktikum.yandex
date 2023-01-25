import { authTypes } from "processes/auth";

import { chatTypes } from "pages/messenger/chat";

import { formattedDate } from "shared/utils";

export const transformMessage = (data: chatTypes.TDialogMessageDTO, user: authTypes.User): any => {
  return {
    type: Number(data.user_id) === Number(user.id) ? "out" : "in",
    text: data.content,
    date: formattedDate(new Date(data.time)),
  };

  // const file = data.file && {
  //   id: data.file.id,
  //   userId: data.file.user_id,
  //   path: data.file.path,
  //   filename: data.file.filename,
  //   contentType: data.file.content_type,
  //   contentSize: data.file.content_size,
  //   uploadDate: data.file.upload_date,
  // };

  // return {
  //   id: data.id,
  //   chatId: data.chat_id,
  //   time: data.time,
  //   type: data.type,
  //   userId: data.user_id,
  //   content: data.content,
  //   file: file,
  // };
};

export const transformMessages = (
  dataArray: chatTypes.TDialogMessageDTO[],
  user: authTypes.User
): chatTypes.TDialogMessage[] => {
  return dataArray.map((data) => transformMessage(data, user));
};
