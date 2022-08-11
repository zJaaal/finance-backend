import { number } from "joi";

export type Earning = {
  idearnings: number | undefined;
  iduser: number;
  title: string;
  description: string;
  date: string;
  amount: number;
};

export type EarningListPerPage = {
  iduser: number;
  page: number;
  keyword: string | null;
  date: string | null;
};

export type EarningIds = {
  iduser: number;
  idearnings: number;
};
