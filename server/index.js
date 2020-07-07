const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const socketio = require('socket.io');
const moment = require ('moment');
const User = require('../models/user');
const Event = require('../models/event');
const Conversation = require('../models/conversation');
const Message = require('../models/message');

mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

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


server.listen(port);
console.log('Server listening on:', port);












const events = [ event ]


const event = {
    id: "string",
    eventName: "string",
    conversations: [ conversation
    ],
    users: [
        user
    ]
}

const user = {
    id: "string",
    username: "String",
    byline: "string"
}

const conversation = {
    id: "string",
    messages: [message],
    users: [id] //populate
}

const message = {
    text: "string",
    time: "timestamp",
    user: "id"
}





