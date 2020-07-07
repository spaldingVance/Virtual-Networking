const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  byLine: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'conversation' }],
})

const User = mongoose.model('user', userSchema);

module.exports = User;
