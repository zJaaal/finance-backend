import express from "express";
import { EarningController } from ".";
import { Middlewares } from "../../middlewares/index";
import { JoiAlter } from "../../types/JoiAlter";
import {
  earningIdsSchema,
  earningListPerPageSchema,
  earningSchema,
} from "../validations/schemas";
import { Earning, EarningIds, EarningListPerPage } from "../validations/types";

const earning = express.Router();

earning.post(
  "/",
  Middlewares.validateSchemas<Earning>(earningSchema),
  EarningController.create
);
earning.get(
  "/",
  Middlewares.validateSchemas<EarningListPerPage>(earningListPerPageSchema),
  EarningController.listPerPage
);

earning.put(
  "/",
  Middlewares.validateSchemas<Earning>(earningSchema, JoiAlter.put),
  EarningController.update
);

earning.delete(
  "/",
  Middlewares.validateSchemas<EarningIds>(earningIdsSchema),
  EarningController.erase
);
export default earning;
