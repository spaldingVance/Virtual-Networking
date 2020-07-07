const mongoose = require('mongoose');
const User = require('./models/userSchema');
const Event = require('./models/eventSchema');
const Conversation = require('./models/conversationSchema');

mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let event1 = new Event({
  eventName: "The Best Event"
})

let conversation1 = new Conversation({
  conversationName: "The Best Conversation"
})

let user1 = new User({
  userName: "Robert",
  byLine: "Socket.io Wizard",
})

conversation1.messages.push({
  user: user1._id,
  text: "Hellooooo"
})

conversation1.users.push(user1);

// conversation1.save();

event1.users.push(user1);
event1.conversations.push(conversation1);

user1.conversations.push(conversation1);


// event1.save();

// user1.save();

Event.findOne()
  .populate('conversations')
  .exec((err, event) => {
    console.log(event.conversations)
  })