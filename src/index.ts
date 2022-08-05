import express from "express";
import user from "./user/controllers/route";
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/user", user);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
