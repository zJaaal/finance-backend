import { UserRegister } from "../validations/types";
import { authRepository } from "./repo";

const find = (email: string) => {
  //Here goes the logic
  return authRepository.find(email);
};

const create = (user: UserRegister) => {
  //Here goes the logic
  return authRepository.create(user);
};

export const User = {
  find,
  create,
};
