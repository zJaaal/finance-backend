import joi from "joi";
import { Earning, EarningIds, EarningListPerPage } from "./types";

export const earningSchema: joi.ObjectSchema<Earning> = joi.object({
  idearnings: joi.number().min(1),
  iduser: joi.number().min(1).required(),
  title: joi.string().min(4).max(255).required(),
  description: joi.string().min(0).max(500),
  date: joi.string().min(10).required(),
  amount: joi.number().min(1).required(),
});

export const earningListPerPage: joi.ObjectSchema<EarningListPerPage> =
  joi.object({
    iduser: joi.number().min(1).required(),
    page: joi.number().min(1).required(),
    keyword: joi.string().alphanum().min(1),
    date: joi.string().min(10),
  });

export const earningIds: joi.ObjectSchema<EarningIds> = joi.object({
  idearnings: joi.number().min(1).required(),
  iduser: joi.number().min(1).required(),
});
