import express from "express";
import { crypt } from "../../crypt/domain";
import { User } from "../domain";

const login = async (req: express.Request, res: express.Response) => {
  try {
    const userFinded = await User.find(req.body.email);
    if (!userFinded.length) {
      return res.status(401).json({
        status: "Error",
        ErrorMessage: "Email and password doesn't match to an user",
      });
    }

    const isPassword = await crypt.comparePassword(
      req.body.password,
      userFinded[0].password
    );

    if (!isPassword) {
      return res.status(401).json({
        status: "Error",
        ErrorMessage: "Email and password doesn't match to an user",
      });
    }

    const token = await crypt.generateJWT(
      userFinded[0].iduser,
      userFinded[0].username
    );

    res.status(201).json({
      uid: userFinded[0].iduser,
      username: userFinded[0].username,
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

const create = async (req: express.Request, res: express.Response) => {
  try {
    const userFinded = await User.find(req.body.email);
    if (userFinded.length) {
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

    const token = await crypt.generateJWT(user[0].iduser, user[0].username);

    res.status(201).json({
      uid: user[0].iduser,
      username: user[0].username,
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
