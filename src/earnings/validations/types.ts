/**
 * @description This is the main type for Earnings
 */
export type Earning = {
  idearnings: number | undefined;
  iduser: number;
  title: string;
  description: string;
  date: string;
  amount: number;
};

/**
 * @description This is the type for listPerPage Database action
 */
export type EarningListPerPage = {
  iduser: number;
  page: number;
  keyword: string | null;
  date: string | null;
};

/**
 * @description This is the type for delete Database action
 */
export type EarningIds = {
  iduser: number;
  idearnings: number;
};
