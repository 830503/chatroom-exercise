const express = require('express');
const http = require('http');
const app = express();
const clientPath = `${__dirname}/../client`;

const server = http.createServer(app);
const io = require('socket.io')(server);

//set statuc folder
app.use(express.static(clientPath));

let counter = 0;
const users = {};

const port = 9005;


server.listen(port,() => {
    console.log("server running on "+port);
});

//run when clinet connects
io.on('connection', (socket) => {
    

    socket.on('newUser', (username) => {
        socket.username = username
        // socket.broadcast.emit("user-connected", (username));
        counter++;
        console.log(counter + " " + socket.username +  " " + 'connected');
    });

    socket.on('sendToAll', (message) => {
        console.log(message);
        //send to all clients---socket.broadcast.emit();
        io.emit("displayMessage", {username: socket.username, message: message});
    });

    socket.on('sendToMe', (message) => {
        console.log(message);
        //send to single client 
        socket.emit("displayMessage", {username: socket.username, message: message});
    });

    socket.on('disconnet', () => {
        
    })

});

