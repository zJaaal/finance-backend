import joi from "joi";
import { Expense, ExpenseIds, ExpenseListPerPage } from "./types";

export const expenseSchema: joi.ObjectSchema<Expense> = joi.object({
  idexpense: joi
    .number()
    .min(1)
    .alter({
      put: (schema) => schema.required(),
    }),
  iduser: joi.number().min(1).required(),
  title: joi.string().min(4).max(255).required(),
  description: joi.string().min(0).max(500),
  date: joi.string().min(10).required(),
  amount: joi.number().min(1).required(),
});

export const expenseListPerPageSchema: joi.ObjectSchema<ExpenseListPerPage> =
  joi.object({
    iduser: joi.number().min(1).required(),
    page: joi.number().min(1).required(),
    keyword: joi.string().alphanum().min(1),
    date: joi.string().min(10),
  });

export const expenseIdsSchema: joi.ObjectSchema<ExpenseIds> = joi.object({
  idexpense: joi.number().min(1).required(),
  iduser: joi.number().min(1).required(),
});
