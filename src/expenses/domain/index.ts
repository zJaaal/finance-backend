import { EarningIds } from "../../earnings/validations/types";
import { DateUtils } from "../../utils/date";
import { Expense, ExpenseIds } from "../validations/types";
import { ExpenseRepository } from "./repo";

/**
 * @description This function is the validation layer
 *              for the function of the same name in repo.ts
 * @param expense
 * @returns
 */
const create = (expense: Expense) => {
  expense = {
    ...expense,
    date: DateUtils.formatDateToISO(expense.date),
  };
  return ExpenseRepository.create(expense);
};
/**
 * @description This function is the validation layer
 *              for the function of the same name in repo.ts
 * @param expenseIds
 * @returns
 */
const find = (expenseIds: ExpenseIds) => {
  return ExpenseRepository.find(expenseIds);
};
/**
 * @description This function is the validation layer
 *              for the function of the same name in repo.ts
 *              In this case transforms the date to a valid MySQL date
 * @param iduser
 * @param page
 * @param keyword
 * @param date
 * @returns
 */
const listPerPage = (
  iduser: number,
  page: number,
  keyword: string = "",
  date: string = ""
) => {
  if (date.length) date = DateUtils.formatDateToISO(date);

  return ExpenseRepository.listPerPage(iduser, page, keyword, date);
};

/**
 @description This function is the validation layer
 *            for the function of the same name in repo.ts
 *            In this case transforms the date to a valid MySQL date
 * @param expense
 * @returns
 */
const update = (expense: Expense) => {
  expense = {
    ...expense,
    date: DateUtils.formatDateToISO(expense.date),
  };
  return ExpenseRepository.update(expense);
};
/**
 @description This function is the validation layer
 *            for the function of the same name in repo.ts
 * @param expenseIds
 * @returns
 */
const erase = (expenseIds: ExpenseIds) => {
  return ExpenseRepository.erase(expenseIds);
};

export const Expenses = {
  create,
  find,
  listPerPage,
  update,
  erase,
};
