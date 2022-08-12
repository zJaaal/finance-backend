import joi from "joi";
import { Earning, EarningIds, EarningListPerPage } from "./types";

/**
 * @description This is the Joi schema for Earning main type
 */
export const earningSchema: joi.ObjectSchema<Earning> = joi.object({
  idearnings: joi
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

/**
 * @description This is the Joi schema for EarninglistPerPage type
 */
export const earningListPerPageSchema: joi.ObjectSchema<EarningListPerPage> =
  joi.object({
    iduser: joi.number().min(1).required(),
    page: joi.number().min(1).required(),
    keyword: joi.string().alphanum().min(1),
    date: joi.string().min(10),
  });

/**
 * @description This is the Joi schema for EarningIds type
 */
export const earningIdsSchema: joi.ObjectSchema<EarningIds> = joi.object({
  idearnings: joi.number().min(1).required(),
  iduser: joi.number().min(1).required(),
});
