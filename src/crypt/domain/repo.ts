import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const encryptPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  } catch (error) {
    console.log(error);
  }
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
      (error: jwt.error, token: jwt.token) => {
        if (error) {
          console.log(error);
          rej("Couldn't generate token. Please contact an Admin");
        } else res(token);
      }
    );
  });

export const cryptRepository = { encryptPassword, generateJWT };
