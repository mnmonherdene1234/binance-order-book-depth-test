import { Request, Response } from "express";
import express = require("express");
import dotenv = require("dotenv");
import { startCronJobs } from "./cron.jobs";
dotenv.config();

startCronJobs();

const app = express();
const port = process.env.PORT || 7777;

app.get("/", (req: Request, res: Response) => {
  res.send({
    data: "hello",
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
