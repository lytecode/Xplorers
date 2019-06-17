const express = require("express");
const cors = require("cors");
const config = require("./config/index");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
const { PORT, DEV_DB, PROD_DB, TEST_DB } = config;

//db connection
if (process.env.NODE_ENV === "production") {
  mongoose
    .connect(PROD_DB, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log(`production db started successfully`))
    .catch(err =>
      console.log(`Ooops! Something went wrong with db connection`)
    );
} else if (process.env.NODE_ENV === "test") {
  mongoose
    .connect(TEST_DB, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Using Test db`))
    .catch(err =>
      console.log(`Ooops! Something went wrong with db connection`)
    );
} else {
  mongoose
    .connect(DEV_DB, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Dev db connected successfully`))
    .catch(err =>
      console.log(`Ooops! Something went wrong with db connection`)
    );
}

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Hello Xplorers"
  });
});

app.use("/api/users", require("./routes/userRoute"));

//default error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    code: 500,
    msg: "Oops! Something went wrong"
  });
});

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

module.exports = app;
