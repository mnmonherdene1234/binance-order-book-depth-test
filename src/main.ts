import { Request, Response } from "express";
import express = require("express");
import morgan = require("morgan");
import dotenv = require("dotenv");
import { startCronJobs } from "./cron.jobs";
import account from "./routers/account";
import { client } from "./binance";

dotenv.config();
startCronJobs();

const app = express();
const port = process.env.PORT || 7777;

app.use(morgan("dev"));

app.use("/account", account);

app.get("/", async (req: Request, res: Response) => {
  const result = await client.getAccountTradeList({ symbol: "BTCUSDT" });

  res.send({ length: result.length });
});

app.get("/orders/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;

  const orders = client.getAllOrders({ symbol: symbol });
  res.send(orders);
});

app.get(
  "/24h-change-statististics/:symbol",
  async (req: Request, res: Response) => {
    const { symbol } = req.params;
    const statististics = await client.get24hrChangeStatististics({ symbol });
    res.send(statististics);
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
