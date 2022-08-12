import express from "express";
import earning from "./earnings/controllers/route";
import expense from "./expenses/controllers/route";
import user from "./user/controllers/route";
import { Middlewares } from "./middlewares";

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/user", user);
app.use("/api/earning", Middlewares.validateJWT, earning);
app.use("/api/expense", Middlewares.validateJWT, expense);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
