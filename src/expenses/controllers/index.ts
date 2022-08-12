import express from "express";
import { Expenses } from "../domain";
import { Expense } from "../validations/types";

/**
 * @description This function is the final action of create endpoint it
 *              takes the body of the Request and adds a new expense in the database
 * @param req
 * @param res
 * @returns
 */
const create = async (req: express.Request, res: express.Response) => {
  try {
    const newExpense: Expense = await Expenses.create(req.body);

    res.status(201).json({
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

/**
 * @description This function takes the request body to retrieve a list of
 *               coincidences on expenses table based on the filters
 * @param req
 * @param res
 * @returns
 */
const listPerPage = async (req: express.Request, res: express.Response) => {
  try {
    const data: Expense[] = await Expenses.listPerPage(
      req.body.iduser,
      req.body.page,
      req.body.keyword,
      req.body.date
    );

    if (!data.length) {
      res.status(404).json({
        status: "Couldn't find any expenses with those parameters",
      });
    } else
      res.status(200).json({
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

/**
 * @description This function takes the request body to update an Expense
 *              if it doesn't find any expense with the information provided
 *              it will resolve a 404
 * @param req
 * @param res
 * @returns
 */
const update = async (req: express.Request, res: express.Response) => {
  try {
    const newExpense: Expense = await Expenses.update(req.body);
    if (!newExpense) {
      res.status(404).json({
        status: "Couldn't find any expense",
      });
    } else
      res.status(200).json({
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

/**
 * @description This function takes the request body to delete an Expense
 *              if it doesn't find any expense with the information provided
 *              it will resolver a 404
 * @param req
 * @param res
 * @returns
 */
const erase = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await Expenses.erase(req.body);
    if (!deleted) {
      res.status(404).json({
        status: "Couldn't find any Expense.",
      });
    } else
      res.status(200).json({
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
