const locale = navigator.language !== "en-US" ? navigator.language : undefined;
export const formatDate = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium"
});
export const formatTime = new Intl.DateTimeFormat(locale, {
  timeStyle: "short"
});

export const hasTime = (date?: Date | null) => {
  if (!date) return false;
  return !!(date.getHours() || date.getMinutes());
};

export const clearTime = (date: Date) => {
  date.setHours(0, 0, 0);
  return date;
};
