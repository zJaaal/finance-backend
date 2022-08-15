import express from "express";
import { Earnings } from "../domain";
import { Earning } from "../validations/types";

/**
 * @description This function is the final action of create endpoint it takes
 *              the body of the Request and adds a new earning in the database
 * @param req
 * @param res
 * @returns
 */
const create = async (req: express.Request, res: express.Response) => {
  try {
    const newEarning: Earning = await Earnings.create(req.body);

    res.status(201).json({
      status: "Completed",
      ...newEarning,
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
 * @description This function takes the request body to find an Earning
 *              if it doesn't find any earning with the information provided
 *              it will resolves a 404
 * @param req
 * @param res
 * @returns
 */
const find = async (req: express.Request, res: express.Response) => {
  try {
    const expense = await Earnings.find(req.body);

    if (!expense) {
      res.status(404).json({
        status: "Couldn't find any Earning.",
      });
    } else
      res.status(200).json({
        status: "Completed",
        ...expense,
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
 *               coincidences on earnings table based on the filters
 * @param req
 * @param res
 * @returns
 */
const listPerPage = async (req: express.Request, res: express.Response) => {
  try {
    const data: Earning[] = await Earnings.listPerPage(
      req.body.iduser,
      req.body.page,
      req.body.keyword,
      req.body.date
    );

    if (!data.length) {
      res.status(404).json({
        status: "Couldn't find any earnings with those parameters",
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
 * @description This function takes the request body to update an Earning
 *              if it doesn't find any earning with the information provided
 *              it will resolve a 404
 * @param req
 * @param res
 * @returns
 */
const update = async (req: express.Request, res: express.Response) => {
  try {
    const newEarning: Earning = await Earnings.update(req.body);

    if (!newEarning) {
      res.status(404).json({
        status: "Couldn't find any earning.",
      });
    } else
      res.status(200).json({
        status: "Completed",
        ...newEarning,
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
 * @description This function takes the request body to delete an Earning
 *              if it doesn't find any earning with the information provided
 *              it will resolves a 404
 * @param req
 * @param res
 * @returns
 */
const erase = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await Earnings.erase(req.body);

    if (!deleted) {
      res.status(404).json({
        status: "Couldn't find any Earning.",
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
export const EarningController = {
  create,
  find,
  listPerPage,
  update,
  erase,
};
