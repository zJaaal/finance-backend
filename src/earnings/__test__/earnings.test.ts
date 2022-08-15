import { DateUtils } from "../../utils/date";
import { Earnings } from "../domain";
import { Earning, EarningIds } from "../validations/types";
const expect = require("chai").expect;

const keyword = "earning";
const date = "8-15-2022";
const earningIdsToUpdate: EarningIds = {
  iduser: 9,
  idearnings: 11,
};
const earningIdsToDelete: EarningIds = {
  iduser: 9,
  idearnings: 11,
};

const earningToUpdate: Earning = {
  idearnings: 11,
  iduser: 9,
  title: "Changed for testing",
  description: "Testing",
  date: "8-15-2022",
  amount: Date.now(),
};
const earningToAdd: Earning = {
  idearnings: undefined,
  iduser: 9,
  title: "Earning testing",
  description: "Testing",
  date: "8-15-2022",
  amount: 1000,
};

describe("Earnings Module", () => {
  it("Should create one earning", async () => {
    const newEarning = await Earnings.create(earningToAdd);

    earningIdsToDelete.idearnings = newEarning.idearnings;
    earningIdsToDelete.iduser = newEarning.iduser;

    expect(newEarning).to.have.property("idearnings");
  }),
    it("Should update one earning from the DB", async () => {
      const earningToEdit = await Earnings.find(earningIdsToUpdate);
      await Earnings.update(earningToUpdate);
      const editedEarning = await Earnings.find(earningIdsToUpdate);
      expect(
        earningToEdit,
        "Please be sure to fill earningToUpdate with differente data"
      ).to.be.deep.not.equal(editedEarning);
    }),
    it("Should list all expenses per page for one user ID", async () => {
      const earnings = await Earnings.listPerPage(9, 1);
      expect(earnings).to.not.be.empty;
    }),
    it("Should list all earnings per page for one user ID and from a specific date", async () => {
      const earnings = await Earnings.listPerPage(9, 1, undefined, date);
      expect(
        earnings.every(
          (earning) =>
            earning.iduser == 9 && DateUtils.getDateString(earning.date) == date
        )
      ).to.be.true;
    }),
    it("Should list all earnings per page for one user ID and for a specific keyword", async () => {
      const earnings = await Earnings.listPerPage(9, 1, keyword);
      expect(
        earnings.every(
          (earning) =>
            earning.iduser == 9 &&
            (earning.title.toLowerCase().includes(keyword) ||
              earning.description.toLowerCase().includes(keyword))
        )
      ).to.be.true;
    }),
    it("Should list all earnings per page for one user ID, from a specific date and for a specific keyword", async () => {
      const earnings = await Earnings.listPerPage(9, 1, keyword, date);
      expect(
        earnings.every(
          (earning) =>
            earning.iduser == 9 &&
            (earning.title.toLowerCase().includes(keyword) ||
              earning.description.toLowerCase().includes(keyword)) &&
            DateUtils.getDateString(earning.date) == date
        )
      ).to.be.true;
    }),
    it("Should delete an existing earning", async () => {
      const earningToDelete = await Earnings.find(earningIdsToDelete);
      if (earningToDelete) {
        await Earnings.erase(earningIdsToDelete);
        const deletedEarning = await Earnings.find(earningIdsToDelete);
        expect(deletedEarning).to.not.exist;
      } else
        expect(
          earningToDelete,
          "Please be sure that the earningIdsToDelete are valid IDs"
        );
    });
});
