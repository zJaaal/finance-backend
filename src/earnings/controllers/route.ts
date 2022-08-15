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

//Initialization of create endpoint
earning.post(
  "/",
  Middlewares.validateSchemas<Earning>(earningSchema),
  EarningController.create
);

//Initialization of find endpoint
earning.get(
  "/find",
  Middlewares.validateSchemas<EarningIds>(earningIdsSchema),
  EarningController.find
);

//Initialization of listPerPage endpoint
earning.get(
  "/",
  Middlewares.validateSchemas<EarningListPerPage>(earningListPerPageSchema),
  EarningController.listPerPage
);

//Initialization of update endpoint
earning.put(
  "/",
  Middlewares.validateSchemas<Earning>(earningSchema, JoiAlter.put),
  EarningController.update
);

//Initialization of delete endpoint
earning.delete(
  "/",
  Middlewares.validateSchemas<EarningIds>(earningIdsSchema),
  EarningController.erase
);
export default earning;
