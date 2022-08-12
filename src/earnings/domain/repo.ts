import client from "../../database/knex";
import earning from "../controllers/route";
import { Earning, EarningIds } from "../validations/types";

const limit = 10;

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
const erase = (earningIds: EarningIds) =>
  client
    .from("earnings")
    .where({ iduser: earningIds.iduser, idearnings: earningIds.idearnings })
    .first()
    .del();

export const EarningRepository = {
  create,
  listPerPage,
  update,
  erase,
};
