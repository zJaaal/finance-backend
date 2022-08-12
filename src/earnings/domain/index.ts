import { Helpers } from "../../helpers";
import { Earning, EarningIds } from "../validations/types";
import { EarningRepository } from "./repo";

/**
 * @description This function is the validation layer
 *              for the function of the same name in repo.ts
 * @param earning
 * @returns
 */
const create = (earning: Earning) => {
  earning = {
    ...earning,
    date: Helpers.formatDateToISO(earning.date),
  };
  return EarningRepository.create(earning);
};

/**
 @description This function is the validation layer
 *            for the function of the same name in repo.ts
 *            In this case transforms the date to a valid MySQL date
 * @param iduser
 * @param page
 * @param keyword
 * @param date
 * @returns
 */
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

/**
 @description This function is the validation layer
 *            for the function of the same name in repo.ts
 *            In this case transforms the date to a valid MySQL date
 * @param earning
 * @returns
 */
const update = (earning: Earning) => {
  earning = {
    ...earning,
    date: Helpers.formatDateToISO(earning.date),
  };
  return EarningRepository.update(earning);
};

/**
 @description This function is the validation layer
 *            for the function of the same name in repo.ts
 * @param earningIds
 * @returns
 */
const erase = (earningIds: EarningIds) => {
  return EarningRepository.erase(earningIds);
};

export const Earnings = {
  create,
  listPerPage,
  update,
  erase,
};
