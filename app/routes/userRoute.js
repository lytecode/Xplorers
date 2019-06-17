const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/", userController.register);

module.exports = router;
