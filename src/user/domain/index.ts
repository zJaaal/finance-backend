import { UserRegister } from "../validations/types";
import { authRepository } from "./repo";

/**
 * @description This function is the validation layer of the function of the same name in repo.ts
 * @param {string} email
 * @returns
 */
const find = (email: string) => {
  //Here goes the logic
  return authRepository.find(email);
};

/**
 * @description This function is the validation layer of the function of the same name in repo.ts
 * @param {UserRegister} user
 * @returns
 */
const create = (user: UserRegister) => {
  //Here goes the logic
  return authRepository.create(user);
};

export const User = {
  find,
  create,
};
