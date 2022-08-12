import client from "../../database/knex";
import { Expense, ExpenseIds } from "../validations/types";

const limit = 10;

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
