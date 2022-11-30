import { DailyChangeStatistic } from "binance";
import { Request, Response, Router } from "express";
import { client } from "../binance";

const router = Router();

router.get("/info", async (req: Request, res: Response) => {
  const info: DailyChangeStatistic[] =
    (await client.get24hrChangeStatististics()) as DailyChangeStatistic[];
  const sorted = info.sort((a, b) =>
    +a.quoteVolume < +b.quoteVolume ? 1 : -1
  );
  res.send(sorted);
});

export default router;
