import express from "express";
import { Middlewares } from "../../middlewares";
import { Expense, ExpenseIds, ExpenseListPerPage } from "../validations/types";
import {
  expenseIdsSchema,
  expenseListPerPageSchema,
  expenseSchema,
} from "../validations/schemas";
import { ExpenseController } from ".";
import { JoiAlter } from "../../types/JoiAlter";

const expense = express.Router();

//Initialization of create endpoint
expense.post(
  "/",
  Middlewares.validateSchemas<Expense>(expenseSchema),
  ExpenseController.create
);

//Initialization of listPerPage endpoint
expense.get(
  "/",
  Middlewares.validateSchemas<ExpenseListPerPage>(expenseListPerPageSchema),
  ExpenseController.listPerPage
);

//Initialization of update endpoint
expense.put(
  "/",
  Middlewares.validateSchemas<Expense>(expenseSchema, JoiAlter.put),
  ExpenseController.update
);

//Initialization of delete endpoint
expense.delete(
  "/",
  Middlewares.validateSchemas<ExpenseIds>(expenseIdsSchema),
  ExpenseController.erase
);

export default expense;
