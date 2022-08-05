import { cryptRepository } from "./repo";

const encryptPassword = async (password: string) => {
  //Here goes validations rules
  return await cryptRepository.encryptPassword(password);
};

const generateJWT = async (uid: number, name: string) => {
  if (uid < 0) return Promise.resolve(null);
  return await cryptRepository.generateJWT(uid, name);
};

export const crypt = {
  encryptPassword,
  generateJWT,
};
