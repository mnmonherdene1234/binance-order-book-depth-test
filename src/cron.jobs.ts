import { schedule } from "node-cron";

export function startCronJobs() {
  schedule("* * * * * *", () => {
  });
}
