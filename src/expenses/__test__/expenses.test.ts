import { DateUtils } from "../../utils/date";
import { Expenses } from "../domain";
import { Expense, ExpenseIds } from "../validations/types";

const expect = require("chai").expect;

const keyword = "expense";
const date = "8-15-2022";
const expenseIdsToUpdate: ExpenseIds = {
  iduser: 9,
  idexpense: 21,
};
const expenseIdsToDelete: ExpenseIds = {
  iduser: 9,
  idexpense: 26,
};
const expenseToUpdate: Expense = {
  idexpense: 21,
  iduser: 9,
  title: "Test Expense change",
  description: "This was changed again",
  date: date,
  amount: Date.now(),
};
const expenseToAdd: Expense = {
  idexpense: undefined,
  iduser: 9,
  title: "Test Expense",
  description: "This is a test Expense",
  date: "08-15-2022",
  amount: 1000,
};

describe("Expenses Module", () => {
  it("Should create one expense", async () => {
    const newExpense = await Expenses.create(expenseToAdd);

    expenseIdsToDelete.idexpense = newExpense.idexpense;
    expenseIdsToDelete.iduser = newExpense.iduser;

    expect(newExpense).to.have.property("idexpense");
  }),
    it("Should update one expense from the DB", async () => {
      const expenseToEdit = await Expenses.find(expenseIdsToUpdate);
      await Expenses.update(expenseToUpdate);
      const editedExpense = await Expenses.find(expenseIdsToUpdate);
      expect(
        expenseToEdit,
        "Please be sure to fill expenseToUpdate with different data"
      ).to.be.deep.not.equal(editedExpense);
    }),
    it("Should list all expenses per page for one user ID", async () => {
      const expenses = await Expenses.listPerPage(9, 1);
      expect(expenses.every((expense) => expense.iduser === 9)).to.be.true;
    }),
    it("Should list all expenses per page for one user ID and from a specific date", async () => {
      const expenses = await Expenses.listPerPage(9, 1, undefined, date);
      expect(
        expenses.every(
          (expense) =>
            expense.iduser === 9 &&
            DateUtils.getDateString(expense.date) == date
        )
      ).to.be.true;
    }),
    it("Should list all expenses per page for one user ID and with an specific keyword", async () => {
      const expenses = await Expenses.listPerPage(9, 1, keyword, undefined);
      expect(
        expenses.every(
          (expense) =>
            expense.iduser === 9 &&
            (expense.title.toLowerCase().includes(keyword) ||
              expense.description.toLowerCase().includes(keyword))
        )
      ).to.be.true;
    }),
    it("Should list all expenses per page for one user ID, with an specific keyword and from a specific date", async () => {
      const expenses = await Expenses.listPerPage(9, 1, keyword, date);
      expect(
        expenses.every(
          (expense) =>
            expense.iduser === 9 &&
            (expense.title.toLowerCase().includes(keyword) ||
              expense.description.toLowerCase().includes(keyword)) &&
            DateUtils.getDateString(expense.date) == date
        )
      ).to.be.true;
    }),
    it("Should return an empty array for an user that doesn't exist", async () => {
      const expenses = await Expenses.listPerPage(12312321, 1);
      expect(expenses).to.be.empty;
    }),
    it("Should delete an existing expense", async () => {
      const expenseToDelete = await Expenses.find(expenseIdsToDelete);
      if (expenseToDelete) {
        await Expenses.erase(expenseIdsToDelete);
        const deletedExpense = await Expenses.find(expenseIdsToDelete);

        expect(deletedExpense).to.not.exist;
      } else {
        expect(
          expenseToDelete,
          "Please be sure that the expenseIdsToDelete are valid IDs"
        ).to.exist;
      }
    });
});
