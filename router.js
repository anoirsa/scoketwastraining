// Import components
const express = require("express");
const { addUser, getUser, sendFilterMessage, findMessages} = require('./helpers');

var messages  = [];
var rooms = []
var users = [{userId : '0000##' , username : 'admin' , rooms : [] , messages : []}];

module.exports = function(io) {
    let router = express.Router()
    io.use((socket, next) => {
        console.log('Session is about to start');
        next();

    })
    io.on("connection", (socket) => {
        console.log("We have  a new connection!!!");
    
        socket.on('join', ({username , room}, callback) => {
            console.log('username is 20 ' + username)
            const {user, error, userBeen} = addUser(users, {userId : socket.id, username, joinedRoomId : room })
            if (error) {
                callback(error)
            }
            else {
                sendFilterMessage({users , text : `${username} has joined`, room ,sender: 'admin', receiver : username , username, rooms, userBeen})
                socket.to(room).emit('message', ({text :`${username} has joined`, sender : 'admin' }))
                socket.join(room);
            }

            
        })
        socket.on('update' , ({username, room}, callback) => {
            console.log("username is  debuged"+ username)
            console.log("room is "+ room)
            returnedValue = findMessages({users, username, room});
            console.log("returned value for " + username + " is")
            console.log(returnedValue)
            callback(returnedValue);

        })
        socket.on('sendMessage', ({username, message, room}) => {
            const newMessage = {sender : username , text : message , joinedRoomId : room }
            socket.to(room).emit()
        })
        
      
      
        socket.on("disconnect", () => {
          console.log("User had left");
        });
      });
      
    router.get('/',(req, res) => {
        res.send({message : 'This is the other route'})
    })  

    return router
};
