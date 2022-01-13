import { v4 } from "uuid";
import { Bets } from "../database/models/bets";

require("dotenv").config();
const Bull = require("bull");

const ShootBet = new Bull("ShootBet", {
  redis: { port: +process.env.REDIS_PORT, host: process.env.REDIS_HOST },
  limiter: {
    max: 1,
    duration: 1000,
  },
});

ShootBet.process(async (job, done) => {
  try {
    const bets = new Bets();
    await bets.create({ ...job.data, secured_id: v4() });
  } catch (error) {
    // console.log(error);
  }

  done();
});

module.exports = ShootBet;
