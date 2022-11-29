import { Request, Response } from "express";
import { client } from "../binance";
import express = require("express");
const router = express.Router();

router.get("/balances", async (req: Request, res: Response) => {
  const balances = await client.getBalances();

  const cleared = balances.filter((e) => e.free != "0");

  const sorted = cleared.sort((a, b) => (+a.free < +b.free ? 1 : -1));

  res.send(sorted);
});

export default router;
