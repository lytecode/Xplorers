const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//make a schema
const UserSchema = new Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
