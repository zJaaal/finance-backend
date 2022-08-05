import joi from "joi";
import express from "express";

const validateSchemas =
  <T>(schema: joi.ObjectSchema<T>) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const newBody: T = await schema.validateAsync(req.body);

      req.body = { ...newBody };

      next();
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: "An error occured",
        errorMessage: e.message,
      });
    }
  };

export default validateSchemas;
