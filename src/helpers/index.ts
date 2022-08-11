const formatDateToISO = (date: string) =>
  new Date(date).toISOString().slice(0, 10);

export const Helpers = {
  formatDateToISO,
};
