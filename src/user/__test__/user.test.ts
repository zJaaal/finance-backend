import { User } from "../domain";
import { UserRegister } from "../validations/types";
const should = require("chai").should();

const registerUser: UserRegister = {
  username: "Jal",
  email: "jalinson@gmail.com",
  password: "Abcd1234%",
};

const newEmail = `jalinson${Date.now()}}@gmail.com`;

describe("User Module", () => {
  it("Should return the created user", async () => {
    const newUser = await User.create(registerUser);

    newUser.should.have.property("iduser");
  }),
    it("Should return a valid user", async () => {
      const user = await User.find("jalinson@gmail.com");
      should.exist(user);
    }),
    it("Should not return a valid user", async () => {
      const user = await User.find("asdasdas@gmail.com");
      should.not.exist(user);
    });
  it("Should create an user if it doesn't exist", async () => {
    const user = await User.find(newEmail);
    if (!user) {
      const newUser = await User.create({
        username: "Jal",
        email: newEmail,
        password: "Abcd1234%",
      });
      newUser.should.have.property("iduser");
    } else {
      should.not.exist(
        user,
        "Please be sure to change the newEmail field to a email that doesn't exist in the database"
      );
    }
  });
});
