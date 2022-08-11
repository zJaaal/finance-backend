import joi from "joi";
import express from "express";
import JoiErrors from "../types/JoiErrors";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
require("dotenv").config();

const validateSchemas =
  <T>(schema: joi.ObjectSchema<T>) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const newBody: T = await schema.validateAsync(req.body, {
        stripUnknown: true,
      });

      req.body = { ...newBody };

      next();
    } catch (e) {
      console.log(e);
      const error = /(?<=\")(.*?)(?=\")/g.exec(e.message)[0];

      res.status(400).json({
        status: "An error occured",
        errorMessage: JoiErrors[error],
      });
    }
  };

const validateJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(400).json({
      status: "Error",
      ErrorMessage: "Please send a token in the request",
    });
  }

  try {
    const { iduser, name } = jwt.verify(
      token as string,
      process.env.SECRET_KEY
    ) as JwtPayload;

    req.body.iduser = iduser;
    req.body.name = name;
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      ErrorMessage: "Please send a valid token in the request",
    });
  }

  next();
};

export const Middlewares = { validateSchemas, validateJWT };
