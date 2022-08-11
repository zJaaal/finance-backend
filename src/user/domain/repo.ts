import client from "../../database/knex";
import { UserRegister } from "../validations/types";

const find = (email: string) =>
  client
    .select()
    .from("users")
    .where({
      email: email,
    })
    .first();

const create = (user: UserRegister) =>
  client
    .insert({ ...user })
    .into("users")
    .then(([id]) =>
      client
        .select("iduser", "username")
        .from("users")
        .where({
          iduser: id,
        })
        .first()
    );

export const authRepository = {
  find,
  create,
};
