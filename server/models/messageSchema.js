const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  text: String
}, {
  timestamps: true
})

module.exports = messageSchema;