import { EarningIds } from "../../earnings/validations/types";
import { Helpers } from "../../helpers";
import { Expense, ExpenseIds } from "../validations/types";
import { ExpenseRepository } from "./repo";

const create = (expense: Expense) => {
  expense = {
    ...expense,
    date: Helpers.formatDateToISO(expense.date),
  };
  return ExpenseRepository.create(expense);
};

const listPerPage = (
  iduser: number,
  page: number,
  keyword: string = "",
  date: string = ""
) => {
  if (date.length) date = Helpers.formatDateToISO(date);

  return ExpenseRepository.listPerPage(iduser, page, keyword, date);
};

const update = (expense: Expense) => {
  expense = {
    ...expense,
    date: Helpers.formatDateToISO(expense.date),
  };
  return ExpenseRepository.update(expense);
};

const erase = (expenseIds: ExpenseIds) => {
  return ExpenseRepository.erase(expenseIds);
};

export const Expenses = {
  create,
  listPerPage,
  update,
  erase,
};
