import bcrypt from "bcryptjs";
import jwt = require("jsonwebtoken");

/**
 * @descrition This function takes a password and returns an encryption of it
 * @param {string} password
 * @returns {Promise<string>} encryptedPassword
 */
const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description This function takes the raw password and the password retrieved from the database
 *              and returns a boolean that represents if they are equal or not
 * @param {string} userPassword
 * @param {string} toCompare
 * @returns {Promise<boolean>} isEqual
 */
const comparePassword = async (
  userPassword: string,
  toCompare: string
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, toCompare);
};

/**
 * @description This function takes a uid and user name to generate a JWT
 * @param {string} iduser
 * @param {string} name
 * @returns {Promise<string>} JWT Token
 */

const generateJWT = (iduser: number, name: string): Promise<string> =>
  new Promise((res, rej) => {
    const payload = {
      iduser,
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
