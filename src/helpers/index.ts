/**
 * @description This function takes a date in string format and parse it to YYYY-MM-DD
 * @param {string} date
 * @returns {string}
 */
const formatDateToISO = (date: string): string =>
  new Date(date).toISOString().slice(0, 10);

export const Helpers = {
  formatDateToISO,
};
