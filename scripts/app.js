//DOM  queries
const chatList = document.querySelector(".chat-list");
const newchatform = document.querySelector(".new-chat");
const usernameForm = document.querySelector(".new-name");
const message = document.querySelector(".update-message");
const rooms = document.querySelector(".chat-rooms");

//check local storage for username
const username = localStorage.username ? localStorage.username : "Anonymous";

//Class instances
const chatui = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

//get the chat and render
chatroom.getChats((data) => chatui.render(data));

//send new chat
newchatform.addEventListener("submit", (e) => {
  e.preventDefault();

  //sending new chat
  const message = newchatform.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newchatform.reset())
    .catch((err) => console.log(err));
});

//update username
usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //update name via the chatroom class
  const name = usernameForm.name.value.trim();
  chatroom.updateUsername(name);

  //reset the form
  usernameForm.reset();

  //show, the hide after a few second
  message.innerHTML = `Your name was updated to ${name}`;
  setTimeout(() => {
    message.innerHTML = ` `;
  }, 3000);
});

//update rooms
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatui.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatui.render(chat));
  }
});
