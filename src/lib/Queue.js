const db = require("../database/models/index");
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
    await db.Bets.create(job.data);
  } catch (error) {
    console.log(error);
  }

  done();
});

module.exports = ShootBet;
