const socket = io("http://localhost:5000")
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input")

const name = prompt("What is your name?");
append("You Joined");

socket.emit("new-user", name);

socket.on("chat-message", data => {
  // console.log(message);
  append(`${data.name}:${data.message}`);
})
socket.on("user-connected", name => {
  // console.log(message);
  append(`${name} joined`);
})
socket.on("user-disconnected", name => {
  // console.log(message);
  append(`${name} left the conversation`);
})



messageForm.addEventListener("submit", e=> {
  e.preventDefault();
  const message = messageInput.value;
  append(`You : ${message}`);
  //console.log("check", message);
  socket.emit('send-chat-message', message);
  
  messageInput.value = '';
});

function append(message){
  var messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}