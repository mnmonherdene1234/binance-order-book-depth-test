import { MainClient } from "binance";
import dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_API_SECRET;

export const client = new MainClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
});
