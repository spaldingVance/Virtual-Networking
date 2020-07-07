const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const mainRoutes = require('./routes/main')
const keys = require('./config/keys');
const socketio = require('socket.io');
const moment = require ('moment');
const User = require('./models/userSchema');
const Event = require('./models/eventSchema');
const Conversation = require('./models/conversationSchema');
const Message = require('./models/messageSchema');
const bodyParser = require('body-parser')

mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(mainRoutes);

//for formatting responses?
const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}
//for auto messages
const botName = 'Virtual Networking Bot';

// Run when client connects
io.on('connection', socket => {

  socket.on('test', data => {
    console.log(data.testMessage)
    io.emit('RECEIVE_MESSAGE', { 
      username: botName, 
      text: `${data.testMessage}`,
      time: moment().format('h:mm a')})
  })

  socket.on('joinEvent', ({ username, byline, eventId }) => {
    //create instance of user model in mongo (set _id as socket.id)
    //add user to users array in selected event
  });
  
  socket.on('getConversations', ({ eventId }) => {
    //return array of conversations existing in event

  })

  socket.on('joinConversation', ({ username, conversation }) => { //not sure about variables
    //add user to users array in conversation mongodb collection
    
    // Welcome current user
    socket.emit('message', { 
      username: botName, 
      text: `Welcome to ${conversation}!`,
      time: moment().format('h:mm a')});

    // Broadcast when a user connects
    socket.broadcast
      .to(conversation) //id? name? 
      .emit(
        'message',
        {
          username: botName, 
          text: `${user.username} has joined the chat`,
          time: moment().format('h:mm a')
        }
      );

    // Send users and room info
    // io.to(conversation).emit('roomUsers', {
    //   room: user.room,
    //   users: getRoomUsers(user.room)
    // });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    //find user 
    //add message to conversation in mongodb

    //diplay message in chat window
    io.to(/*userConversation*/).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    // const user = userLeave(socket.id);
    //find user and remove from conversation in mongodb

    // if (user) {
      io.to(/*conversation*/).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    // }
  });
});

// GENERATE FAKE DATA
  // uncomment the .save() lines to add this data to the database
  // you can use this format to create new fake data and save it as well
  // make sure to comment out the .save() lines when running the server multiple times
    // to avoid duplicate data 

let event1 = new Event({
  eventName: "The Best Event"
})

let conversation1 = new Conversation({
  conversationName: "The Best Conversation"
})

let user1 = new User({
  userName: "Robert",
  byLine: "Socket.io Wizard",
  event: event1._id
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

server.listen(port);
console.log('Server listening on:', port);

