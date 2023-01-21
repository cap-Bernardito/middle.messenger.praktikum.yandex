import plural from "plural-ru";

const getDiffDays = (date: Date) => Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

const getFormattedTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

const getFormattedDate = (date: Date): string => {
  const diffDays = getDiffDays(date);
  return `${plural(diffDays, "%d день", "%d дня", "%d дней")} назад, ${getFormattedTime(date)}`;
};

const isToday = (date: Date): boolean => getDiffDays(date) === 0;
const isYesterday = (date: Date): boolean => getDiffDays(date) === 1;

export const formattedDate = (date: Date) => {
  if (isToday(date)) {
    return getFormattedTime(date);
  }

  if (isYesterday(date)) {
    return `Вчера, ${getFormattedTime(date)}`;
  }

  return getFormattedDate(date);
};
