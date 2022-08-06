import express from "express";
import { UserController } from ".";
import { Middlewares } from "../../middlewares";

import { userLoginSchema, userRegisterSchema } from "../validations/schemas";
import { UserLogin, UserRegister } from "../validations/types";

const user = express.Router();

user.post(
  "/register",
  Middlewares.validateSchemas<UserRegister>(userRegisterSchema),
  UserController.create
);

user.post(
  "/login",
  Middlewares.validateSchemas<UserLogin>(userLoginSchema),
  UserController.login
);

user.get("/renew", Middlewares.validateJWT, UserController.renewToken);

export default user;
