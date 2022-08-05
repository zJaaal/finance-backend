import express from "express";
import { UserController } from ".";
import validateSchemas from "../validations";
import { userRegisterSchema } from "../validations/schemas";
import { UserRegister } from "../validations/types";

const user = express.Router();

user.post(
  "/",
  validateSchemas<UserRegister>(userRegisterSchema),
  UserController.create
);

export default user;
