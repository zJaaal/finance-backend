import express from "express";
import { Earnings } from "../domain";
import { Earning } from "../validations/types";

const create = async (req: express.Request, res: express.Response) => {
  try {
    const newEarning: Earning = await Earnings.create(req.body);

    return res.status(201).json({
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

const listPerPage = async (req: express.Request, res: express.Response) => {
  try {
    const data: Earning[] = await Earnings.listPerPage(
      req.body.iduser,
      req.body.page,
      req.body.keyword,
      req.body.date
    );

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
    const newEarning: Earning = await Earnings.update(req.body);

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
const erase = async (req: express.Request, res: express.Response) => {
  try {
    const deletedEarning = await Earnings.erase(req.body);
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
  listPerPage,
  update,
  erase,
};
