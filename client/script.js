// const { message } = require("statuses");

let socket = io.connect();
let target = document.getElementById('target');
const username = prompt('What is your name?');


socket.emit('newUser', (username));
// console.log(username);

socket.on('displayMessage', ({username, message}) => {
    target.innerHTML += username + ': ' + message + '<br>';
});

document.getElementById('sendToAll').addEventListener('click', function(){
    e.preventDefault();
    let message = document.getElementById('msg').value;
    socket.emit('sendToAll', (message));
    
})

document.getElementById('sendToMe').addEventListener('click', function(){
    let message = document.getElementById('msg').value;
    socket.emit('sendToMe', (message));
})