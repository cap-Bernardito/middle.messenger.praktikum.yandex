import { authTypes } from "processes/auth";

import { chatTypes } from "pages/messenger/chat";

import { formattedDate } from "shared/utils";

export const transformMessage = (
  data: chatTypes.TDialogMessageDTO | { type: "date"; time: string },
  user: authTypes.User
): any => {
  if (data.type === "date") {
    const monthNames = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    return {
      type: "date",
      date: `${new Date(data.time).getDate()} ${monthNames[new Date(data.time).getMonth()]}`,
    };
  }

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
  const result: chatTypes.TDialogMessage[] = [];

  let date;
  let prevTime;

  for (const message of dataArray) {
    const messageDate = new Date(message.time).getDate();

    if (!date) {
      date = messageDate;
      prevTime = message.time;
    }

    if (date !== messageDate) {
      result.push(
        transformMessage(
          {
            type: "date",
            time: prevTime || message.time,
          },
          user
        )
      );

      date = messageDate;
      prevTime = message.time;
    }

    result.push(transformMessage(message, user));
  }

  if (result.length > 0) {
    result.push(
      transformMessage(
        {
          type: "date",
          // @ts-ignore
          time: prevTime,
        },
        user
      )
    );
  }

  return result.reverse();
};
