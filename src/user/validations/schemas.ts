import joi from "joi";
import { UserLogin, UserRegister } from "./types";

/**
 * @description Joi schema for UserRegister type
 */
export const userRegisterSchema: joi.ObjectSchema<UserRegister> = joi.object({
  username: joi.string().min(4).max(20).alphanum().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(20)
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./)
    .required(),
});

/**
 * @description Joi schema for UserLogin type
 */
export const userLoginSchema: joi.ObjectSchema<UserLogin> = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(20)
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./)
    .required(),
});
