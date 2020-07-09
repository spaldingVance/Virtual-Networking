const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = require('./messageSchema');

const conversationSchema = new Schema({
  conversationName: String,
  messages: [messageSchema],
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  active: Boolean
})

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation;