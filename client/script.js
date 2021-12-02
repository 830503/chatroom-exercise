// const { message } = require("statuses");

let socket = io.connect();

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message + '<br>';
});

document.getElementById('sendToAll').addEventListener('click', function(){
    let message = document.getElementById('message').value;
    socket.emit('sendToAll', (message));
})