import express from "express";
import { UserController } from ".";
import { Middlewares } from "../../middlewares";

import { userLoginSchema, userRegisterSchema } from "../validations/schemas";
import { UserLogin, UserRegister } from "../validations/types";

const user = express.Router();

//This is the intialization of register endpoint, it validates its schema on a middleware
user.post(
  "/register",
  Middlewares.validateSchemas<UserRegister>(userRegisterSchema),
  UserController.create
);

//This is the intialization of login endpoint, it validates its schema on a middleware
user.post(
  "/login",
  Middlewares.validateSchemas<UserLogin>(userLoginSchema),
  UserController.login
);

//This is the initialization of renew endpoint, it validates the JWT on a middleware
user.get("/renew", Middlewares.validateJWT, UserController.renewToken);

export default user;
