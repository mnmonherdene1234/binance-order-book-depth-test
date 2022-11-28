import { schedule } from "node-cron";

export function startCronJobs() {
  schedule("* * * * * *", () => {
    console.log("Hello Cron");
  });
}
