import bcrypt from "bcryptjs";
import jwt = require("jsonwebtoken");

const encryptPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (userPassword: string, toCompare: string) => {
  return await bcrypt.compare(userPassword, toCompare);
};

const generateJWT = (uid: number, name: string): Promise<string> =>
  new Promise((res, rej) => {
    const payload = {
      uid,
      name,
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (error: jwt.JsonWebTokenError, token: string) => {
        if (error) {
          console.log(error);
          rej("Couldn't generate token. Please contact an Admin");
        } else res(token);
      }
    );
  });

export const cryptRepository = {
  encryptPassword,
  generateJWT,
  comparePassword,
};
