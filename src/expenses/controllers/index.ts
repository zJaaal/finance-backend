import express from "express";
import { Expenses } from "../domain";
import { Expense } from "../validations/types";

const create = async (req: express.Request, res: express.Response) => {
  try {
    const newExpense: Expense = await Expenses.create(req.body);

    return res.status(201).json({
      status: "Completed",
      ...newExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      ErrorMessage: "Please contact an admin.",
    });
  }
};

const listPerPage = async (req: express.Request, res: express.Response) => {
  try {
    const data: Expense[] = await Expenses.listPerPage(
      req.body.iduser,
      req.body.page,
      req.body.keyword,
      req.body.date
    );

    if (!data.length) {
      return res.status(404).json({
        status: "Couldn't find any expenses with those parameters",
      });
    }

    return res.status(200).json({
      status: "Completed",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      ErrorMessage: "Please contact an admin.",
    });
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const newExpense: Expense = await Expenses.update(req.body);
    if (!newExpense) {
      return res.status(404).json({
        status: "Couldn't find any expense",
      });
    }
    return res.status(200).json({
      status: "Completed",
      ...newExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      ErrorMessage: "Please contact an admin.",
    });
  }
};

const erase = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await Expenses.erase(req.body);
    if (!deleted) {
      return res.status(404).json({
        status: "Couldn't find any Expense.",
      });
    }
    return res.status(200).json({
      status: "Completed",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      ErrorMessage: "Please contact an admin.",
    });
  }
};

export const ExpenseController = {
  create,
  listPerPage,
  update,
  erase,
};
