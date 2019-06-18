require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  DEV_DB: process.env.DEV_DB,
  PROD_DB: process.env.PROD_DB,
  TEST_DB: process.env.TEST_DB,

  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: process.env.EXPIRES_IN
};

module.exports = config;
