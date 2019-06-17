const express = require("express");

const app = express();
const mongodb = require("./config/mongoDB");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Hello Xplorers"
  });
});

//default error handler
app.use((err, req, res, next) => {
  res.status(500).send("Oops! Something went wrong");
});

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
