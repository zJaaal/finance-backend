import client from "../../database/knex";
import { UserRegister } from "../validations/types";

const find = (email: string) =>
  client.select("email", "password").from("users").where({
    email: email,
  });

const create = (user: UserRegister) =>
  client
    .insert({ ...user })
    .into("users")
    .then(([id]) =>
      client.select("iduser", "username").from("users").where({
        iduser: id,
      })
    );

export const authRepository = {
  find,
  create,
};
