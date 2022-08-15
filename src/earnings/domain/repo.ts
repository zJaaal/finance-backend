import client from "../../database/knex";
import { Earning, EarningIds } from "../validations/types";

const limit = 10;

/**
 * @description This function adds to the database a row to earnings table
 * @param {Earning} earning
 * @returns
 */
const create = (earning: Earning) =>
  client
    .insert({ ...earning })
    .into("earnings")
    .then(([id]) =>
      client
        .select()
        .from("earnings")
        .where({
          idearnings: id,
          iduser: earning.iduser,
        })
        .first()
    );

/**
 * @description This function retrieves one earning that matches the ids
 * @param earningIds
 * @returns
 */
const find = (earningIds: EarningIds) =>
  client
    .select()
    .from("earnings")
    .where({
      iduser: earningIds.iduser,
      idearnings: earningIds.idearnings,
    })
    .first();
/**
 * @description This function retrieves a list of earnings based on filters
 * @param {number} iduser //Identity of user
 * @param {number} page //# of page he is on
 * @param {string} keyword //A Keyword for title and description
 * @param {string} date // A date (This might change to from and ill add a until param for date ranges)
 * @returns
 */
const listPerPage = (
  iduser: number,
  page: number,
  keyword: string = "",
  date: string = ""
) => {
  const listPerPage = client
    .select()
    .from("earnings")
    .limit(limit)
    .offset(limit * (page - 1))
    .where({
      iduser: iduser,
    });

  if (keyword.length) {
    listPerPage.where(
      client.raw(`title LIKE '%${keyword}%' OR description LIKE '%${keyword}%'`)
    );
  }
  if (date.length) {
    listPerPage.where({
      date: date,
    });
  }
  return listPerPage;
};

/**
 * @description This function updates an earning on the database
 * @param {Earning} earning
 * @returns
 */
const update = (earning: Earning) =>
  client
    .from("earnings")
    .where({
      iduser: earning.iduser,
      idearnings: earning.idearnings,
    })
    .first()
    .update({
      title: earning.title,
      date: earning.date,
      description: earning.description,
      amount: earning.amount,
    })
    .then(() =>
      client
        .select()
        .from("earnings")
        .where({ idearnings: earning.idearnings, iduser: earning.iduser })
        .first()
    );

/**
 * @description This function erase an earning from the database
 * @param {EarningIds} earningIds
 * @returns
 */
const erase = (earningIds: EarningIds) =>
  client
    .from("earnings")
    .where({ iduser: earningIds.iduser, idearnings: earningIds.idearnings })
    .first()
    .del();

export const EarningRepository = {
  create,
  find,
  listPerPage,
  update,
  erase,
};
