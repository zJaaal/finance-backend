import express from "express";
import earning from "./earnings/controllers/route";
import expense from "./expenses/controllers/route";
import user from "./user/controllers/route";
import { Middlewares } from "./middlewares";

//Initialize .env
require("dotenv").config();

//Initialize express
const app = express();

//Initialize json parser
app.use(express.json());

//Initialize app endpoints
app.use("/api/user", user); //User
app.use("/api/earning", Middlewares.validateJWT, earning); //Earnings
app.use("/api/expense", Middlewares.validateJWT, expense); //Expenses

//Start to listen to server port
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
