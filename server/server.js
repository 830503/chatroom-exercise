const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`;
const server = http.createServer(app);
const io = require('socket.io')(server);

//set statuc folder
app.use(express.static(clientPath));
let users = [];
let counter = 0;


const port = 9005;


server.listen(port,() => {
    console.log("server running on "+port);
});

//run when clinet connects
io.on('connection', (socket) => {
    counter++;

    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", {username: socket.username, message: message});
    });

    socket.on('sendToMe', (message) => {
        socket.emit("displayMessage", {username: socket.username, message: message});
    });

    socket.on('userList', (username) => {
        users.push({userId: socket.id, username: username});
        console.log(users);
        io.emit('userList', (users));
        console.log(username + 'connected');
    });

    

});

