const express = require("express");
const app = express();
const mongodb = require("./config/mongoDB");
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Hello Xplorers"
  });
});

app.use("/api/users", require("./app/routes/userRoute"));

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
