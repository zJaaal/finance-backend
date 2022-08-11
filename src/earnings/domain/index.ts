import { Helpers } from "../../helpers";
import earning from "../controllers/route";
import { Earning, EarningIds } from "../validations/types";
import { EarningRepository } from "./repo";

const create = (earning: Earning) => {
  earning = {
    ...earning,
    date: Helpers.formatDateToISO(earning.date),
  };
  return EarningRepository.create(earning);
};

const listPerPage = (
  iduser: number,
  page: number,
  keyword: string = "",
  date: string = ""
) => {
  if (date.length) {
    date = Helpers.formatDateToISO(date);
  }

  return EarningRepository.listPerPage(iduser, page, keyword, date);
};

const update = (earning: Earning) => {
  earning = {
    ...earning,
    date: Helpers.formatDateToISO(earning.date),
  };
  return EarningRepository.update(earning);
};

const erase = (earningIds: EarningIds) => {
  return EarningRepository.erase(earningIds);
};

export const Earnings = {
  create,
  listPerPage,
  update,
  erase,
};
