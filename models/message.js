const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: String,
  user: String,
});

const Availability = mongoose.model("message", messageSchema);

module.exports = Availability;
