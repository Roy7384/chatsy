const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {v4: uuidv4} = require('uuid');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const db = require('./configs/db.config');

// Users Code
const {getUserInterests} = require('./helpers/queries')(db);
const {parseUser} = require('./helpers/parsers');
const {users, addUser, removeUser, toggleLooking, toggleInCall} = require('./users');

// Users Code - OOP
const ActiveUsers = require('./entities/ActiveUsers');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  const onlineUser = [];

  console.log('Client connected');

  socket.on('peerId', msg => {
    onlineUser.push(msg.peerId);
    console.log(msg);
    socket.broadcast.emit('new_user', { onlineUser });
  });

  socket.on('endCall', () => {
    socket.broadcast.emit('endCall');
  });

});

app.use(cors());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = {app, server};

// DRIVER CODE - USERS
// getUserInterests('lisa.simpson@gmail.com')
//   .then(res => {
//     const peerId = 190228392;
//     const newUser = parseUser(res, peerId);
//     addUser(newUser);
//   });

// getUserInterests('mario@mushroomkindom.jp')
//   .then(res => {
//     const peerId = 882837842;
//     const newUser = parseUser(res, peerId);
//     addUser(newUser);

//     toggleInCall(newUser.userId);
// });

// DRIVER CODE - USERS OOP
const activeUsers = new ActiveUsers();
getUserInterests('lisa.simpson@gmail.com')
  .then(userData => {
    const peerId = 19392891;
    activeUsers.addUser(userData, peerId);
  });

getUserInterests('link@yahoo.com')
.then(userData => {
  const peerId = 81289372;
  activeUsers.addUser(userData, peerId);
  console.log(activeUsers.users);
  activeUsers.removeUser(2);
});
