import joi from "joi";
import { UserRegister } from "./types";

export const userRegisterSchema: joi.ObjectSchema<UserRegister> = joi.object({
  username: joi.string().min(4).max(20).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(20)
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./)
    .required(),
});