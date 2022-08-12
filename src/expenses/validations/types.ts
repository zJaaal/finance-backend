export type Expense = {
  idexpense: number | undefined;
  iduser: number;
  title: string;
  description: string;
  date: string;
  amount: number;
};

export type ExpenseListPerPage = {
  iduser: number;
  page: number;
  keyword: string | null;
  date: string | null;
};

export type ExpenseIds = {
  iduser: number;
  idexpense: number;
};
