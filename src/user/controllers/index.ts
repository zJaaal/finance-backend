import express from "express";
import { crypt } from "../../crypt/domain";
import { User } from "../domain";

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

export const UserController = {
  create,
};
