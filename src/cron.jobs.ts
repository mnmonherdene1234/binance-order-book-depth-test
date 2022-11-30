import { schedule } from "node-cron";
import { client } from "./binance";

export async function startCronJobs() {
  const data = await client.getOrderBook({ symbol: "BTCUSDT", limit: 5000 });
  console.log("Data", data);
}
