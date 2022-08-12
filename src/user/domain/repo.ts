import client from "../../database/knex";
import { UserRegister } from "../validations/types";

/**
 * @description This function retrieve one user from the database
 * @param {string} email
 * @returns the found user
 */
const find = (email: string) =>
  client
    .select()
    .from("users")
    .where({
      email: email,
    })
    .first();

/**
 * @description This function adds an user to the database
 * @param {UserRegister} user
 * @returns the created user
 */
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
