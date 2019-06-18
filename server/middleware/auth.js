const config = require("../config/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ code: 401, msg: "Unauthorized" });

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).json({ code: 400, msg: "Token invalid" });
  }
};

module.exports = auth;
