import client from "../../database/knex";
import { Expense, ExpenseIds } from "../validations/types";

const limit = 10;

/**
 * @description This function adds to the database a row to expenses table
 * @param {Expense} expense
 * @returns
 */
const create = (expense: Expense) =>
  client
    .insert({ ...expense })
    .into("expenses")
    .then(([id]) =>
      client
        .select()
        .from("expenses")
        .where({
          idexpense: id,
          iduser: expense.iduser,
        })
        .first()
    );

/**
 * @description This function retrieves a list of expenses based on filters
 * @param {number} iduser //Identity of user
 * @param {number} page //# of page he is on
 * @param {string} keyword //A Keyword for title and description
 * @param {string} date // A date (This might change to from and ill add a until param for date ranges)
 * @returns
 */
const listPerPage = (
  iduser: number,
  page: number,
  keyword: string = "",
  date: string = ""
) => {
  const listPerPage = client
    .select()
    .from("expenses")
    .limit(limit)
    .offset(limit * (page - 1))
    .where({
      iduser: iduser,
    });

  if (keyword.length) {
    listPerPage.where(
      client.raw(`title LIKE '%${keyword}%' OR description LIKE '%${keyword}%'`)
    );
  }
  if (date.length) {
    listPerPage.where({
      date: date,
    });
  }

  return listPerPage;
};

/**
 * @description This function updates an earning on the database
 * @param {Expense} expense
 * @returns
 */
const update = (expense: Expense) =>
  client
    .from("expenses")
    .where({
      iduser: expense.iduser,
      idexpense: expense.idexpense,
    })
    .first()
    .update({
      title: expense.title,
      description: expense.description,
      date: expense.date,
      amount: expense.amount,
    })
    .then(() =>
      client
        .select()
        .from("expenses")
        .where({
          iduser: expense.iduser,
          idexpense: expense.idexpense,
        })
        .first()
    );

/**
 * @description This function erase an expense from the database
 * @param {ExpenseIds} expenseIds
 * @returns
 */
const erase = (expenseIds: ExpenseIds) =>
  client
    .from("expenses")
    .where({
      iduser: expenseIds.iduser,
      idexpense: expenseIds.idexpense,
    })
    .first()
    .del();

export const ExpenseRepository = {
  create,
  listPerPage,
  update,
  erase,
};
