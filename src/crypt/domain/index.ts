import { cryptRepository } from "./repo";

const encryptPassword = async (password: string) => {
  //Here goes validations rules
  return await cryptRepository.encryptPassword(password);
};

const comparePassword = async (userPassword: string, toCompare: string) => {
  if (!userPassword || !toCompare) return Promise.resolve(false);
  return await cryptRepository.comparePassword(userPassword, toCompare);
};

const generateJWT = async (uid: number, name: string) => {
  if (uid < 0) return Promise.resolve(null);
  return await cryptRepository.generateJWT(uid, name);
};

export const crypt = {
  encryptPassword,
  generateJWT,
  comparePassword,
};
