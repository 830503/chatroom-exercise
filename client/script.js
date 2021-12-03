let socket = io.connect();
let target = document.getElementById('target');
let userLi = document.getElementById('userLi');
let username = prompt('What is your name?');

socket.emit('userList', (username));
// console.log(username);

socket.on('displayMessage', ({username, message}) => {
    target.innerHTML += '<br>' + username + ": "+ message + '<br>';
});

document.getElementById('sendToAll').addEventListener('click', function(){
    let message = document.getElementById('msg').value;
    socket.emit('sendToAll', {username, message});
})

document.getElementById('sendToMe').addEventListener('click', function(){
    let message = document.getElementById('msg').value;
    socket.emit('sendToMe', {username, message});
})

socket.on('userList', (users) => {
    userLi.innerHTML = '';
    // console.log(users);
    users.forEach(user => {
        userLi.innerHTML += '<br>' + user.username;
    })
});