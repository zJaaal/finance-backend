import express from "express";
import { crypt } from "../../crypt/domain";
import { User } from "../domain";

/**
 * @description This function is the final action of login endpoint it takes the body of the Request
 *              and look for a coincidence in the database if an user is found, generates a JWT and resolves it
 * @param req
 * @param res
 * @returns
 */

const login = async (req: express.Request, res: express.Response) => {
  try {
    const userFinded = await User.find(req.body.email);
    if (!userFinded) {
      return res.status(401).json({
        status: "Error",
        ErrorMessage: "Email and password doesn't match to an user",
      });
    }

    const isPassword = await crypt.comparePassword(
      req.body.password,
      userFinded.password
    );

    if (!isPassword) {
      return res.status(401).json({
        status: "Error",
        ErrorMessage: "Email and password doesn't match to an user",
      });
    }

    const token = await crypt.generateJWT(
      userFinded.iduser,
      userFinded.username
    );

    res.status(201).json({
      uid: userFinded.iduser,
      username: userFinded.username,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      ErrorMessage: "Please contact an admin.",
    });
  }
};
/**
 * @description This function is the final action of register endpoint it takes the body of the Request
 *              and look for a coincidence in the database if an user is not found, adds the user to the database
 *              and resolves a the JWT, otherwise it stops the operation and answers with an Error
 * @param req
 * @param res
 * @returns
 */
const create = async (req: express.Request, res: express.Response) => {
  try {
    const userFinded = await User.find(req.body.email);
    if (userFinded) {
      return res.status(401).json({
        status: "Error",
        ErrorMessage: "An user already exist with that email",
      });
    }

    const encryptedPassword = await crypt.encryptPassword(req.body.password);

    const user = await User.create({
      ...req.body,
      password: encryptedPassword,
    });

    const token = await crypt.generateJWT(user.iduser, user.username);

    res.status(201).json({
      uid: user.iduser,
      username: user.username,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      ErrorMessage: "Please contact an admin.",
    });
  }
};

/**
 * @description This function is the final action of renew endpoint it takes the body of the Request
 *              and generates the new JWT.
 * @param req
 * @param res
 * @returns
 */
const renewToken = async (req: express.Request, res: express.Response) => {
  const { uid, name } = req.body;
  try {
    const token = await crypt.generateJWT(uid, name);

    return res.status(200).json({
      status: "Completed",
      token,
      uid,
      name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      ErrorMessage: "Please contact an admin",
    });
  }
};

export const UserController = {
  create,
  login,
  renewToken,
};
