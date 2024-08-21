const fm = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export const dateFormatter = (date) => {
  if (!date) return;
  if (typeof date === "string") date = new Date(date);
  return fm.format(date);
};
