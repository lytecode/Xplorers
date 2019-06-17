const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

//db connection
if (process.env.NODE_ENV === "production") {
  mongoose
    .connect(process.env.MongoDB_URI || "mongodb://localhost/xplorer", {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log(`production db started successfully`))
    .catch(err =>
      console.log(`Ooops! Something went wrong with db connection`)
    );
} else if (process.env.NODE_ENV === "test") {
  mongoose
    .connect(process.env.MongoDB_URI || "mongodb://localhost/xplorer-test", {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Using Test db`))
    .catch(err =>
      console.log(`Ooops! Something went wrong with db connection`)
    );
} else {
  mongoose
    .connect(process.env.MongoDB_URI || "mongodb://localhost/xplore", {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log(`db connected successfully`))
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
