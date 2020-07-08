const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: "conversation" }],
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
