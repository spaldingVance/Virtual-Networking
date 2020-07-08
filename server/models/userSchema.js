const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  role: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'conversation' }],
})

const User = mongoose.model('user', userSchema);

module.exports = User;
