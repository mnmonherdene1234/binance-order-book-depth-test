import express = require("express");
import morgan = require("morgan");
import dotenv = require("dotenv");
import { startCronJobs } from "./cron.jobs";
import routers from "./routers";
import { LongOrShort } from "./utils/functions";

dotenv.config();
// startCronJobs();

LongOrShort("BTCUSDT", 5000);

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan("dev"));

app.use("/v1/api", routers);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
