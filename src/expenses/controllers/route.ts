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

expense.post(
  "/",
  Middlewares.validateSchemas<Expense>(expenseSchema),
  ExpenseController.create
);

expense.get(
  "/",
  Middlewares.validateSchemas<ExpenseListPerPage>(expenseListPerPageSchema),
  ExpenseController.listPerPage
);

expense.put(
  "/",
  Middlewares.validateSchemas<Expense>(expenseSchema, JoiAlter.put),
  ExpenseController.update
);

expense.delete(
  "/",
  Middlewares.validateSchemas<ExpenseIds>(expenseIdsSchema),
  ExpenseController.erase
);

export default expense;
