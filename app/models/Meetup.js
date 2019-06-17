const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  group: String,
  topic: String,
  venue: String,
  time: String,
  imageURL: String,
  imageId: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  registered: []
});

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;
