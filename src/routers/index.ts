import express = require("express");
const router = express.Router();
import account from "./account";
import exchange from "./exchange";

router.use("/account", account);
router.use("/exchange", exchange);

export default router;
