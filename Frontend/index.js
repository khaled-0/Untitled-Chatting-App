const socket = io("https://Untitled-Chatting-App.khaledahmed18.repl.co/");

const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const messagesHolder = document.querySelector(".messagesHolder");
const messageList = document.getElementById("messageList");
const scrollToBottomMessageBtn = document.getElementById(
  "scrollToBottomMessageBtn"
);
const inputHolder = document.querySelector(".inputHolder");
const initializationScreen = document.querySelector(".initializationScreen");
const setUsernameBtn = document.getElementById("setUsernameBtn");

const connectionStatus = document.getElementById("connectionStatus");
const headerSubtitle = document.querySelector(".head-subtitle");
const menuBtn = document.getElementById("header-menubtn");

var savedUserName = localStorage.getItem("username");
var doAutoScroll = true;
sendBtn.innerHTML = getRandomEmoji();

document.body.style.display = null; //This helps hide body before loading scripts

if (!savedUserName || !savedUserName.length) {
  //User is new / no username
  inputHolder.style.display = "none";
  document.querySelector(".header-container").lastElementChild.style.display =
    "none";
  document.querySelector(".header-container div").style =
    "align-items: center;";
  initializationScreen.style.display = null; //Sets to block from none
} else {
  headerSubtitle.innerText += " | Global";

  //User is old / has username
  socket.on("connect", () => {
    connectionStatus.style.display = "none";
    socket.emit("initialize", savedUserName);
  });

  socket.on("disconnect", () => {
    connectionStatus.style.display = "block";
    connectionStatus.style.color = "#ff0000";
  });

  initializationScreen.style.display = "none";
  inputHolder.style.display = null;
}

setUsernameBtn.addEventListener("click", function (event) {
  const nameInput = document.getElementById("nameInput");
  if (nameInput.value.length != 0) {
    localStorage.setItem("username", nameInput.value);
    window.location.reload();
  }
});

window.addEventListener("resize", function (event) {
  //Mobile device soft keyboards 😩😩
  this.scrollMax = Math.round(this.scrollHeight - this.offsetHeight);
  if (doAutoScroll) messagesHolder.scrollTop = messagesHolder.scrollHeight;
});

messagesHolder.addEventListener("scroll", function (e) {
  this.scrollMax = Math.round(this.scrollHeight - this.offsetHeight);
  if (this.scrollMax > Math.round(this.scrollTop)) {
    scrollToBottomMessageBtn.style.display = "block";
    doAutoScroll = false;
  } else {
    scrollToBottomMessageBtn.style.display = "none";
    doAutoScroll = true;
  }
  this.scrollMax = Math.round(this.scrollHeight - this.offsetHeight);
});

/**
 * On message receive
 */

socket.on("message", (message) => {
  const container = document.createElement("li");
  const msgContainer = document.createElement("div");
  msgContainer.className = "singleMessage";
  const username = document.createElement("span");
  username.className = "username";
  const timestamp = document.createElement("span");
  timestamp.className = "timestamp";
  const messageBody = document.createElement("div");
  messageBody.className = "messageBody";

  username.innerText = message.username;
  username.style.color = message.userColor;
  timestamp.innerText = resolveTimestampToReadableTime(message.timestamp);
  messageBody.innerText = message.body;

  container.appendChild(msgContainer);
  msgContainer.appendChild(username);
  msgContainer.appendChild(timestamp);
  msgContainer.appendChild(messageBody);
  messageList.appendChild(container);

  //Autoscroll
  messagesHolder.scrollMax = Math.round(
    messageList.scrollHeight - messageList.offsetHeight
  );
  if (doAutoScroll) messagesHolder.scrollTop = messagesHolder.scrollHeight;
});

sendBtn.addEventListener("click", (event) => {
  if (sendBtn.innerText.length != 0) {
    return sendMessage(sendBtn.innerText);
  }
  sendMessage();
  msgInput.value = "";
  document.querySelector(".sendBtn").className += " sendBtnEmoji";
  sendBtn.innerText = getRandomEmoji();
});

msgInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
    msgInput.value = "";
    sendBtn.className += " sendBtnEmoji";
    sendBtn.innerText = getRandomEmoji();
  }
});

msgInput.addEventListener("input", (e) => {
  if (document.querySelector(".msgInput").value.length == 0) {
    document.querySelector(".sendBtn").className += " sendBtnEmoji";
    sendBtn.innerText = getRandomEmoji();
  } else {
    document.querySelector(".sendBtn").className = "sendBtn";
    sendBtn.innerText = null;
  }
});

/***********************/

menuBtn.addEventListener("click", (event) => {
  document.getElementById("menu-options-container").style.display =
    document.getElementById("menu-options-container").style.display == "none"
      ? "block"
      : "none";
});

menuBtn.addEventListener("focusout", (event) => {
  setTimeout(() => {
    document.getElementById("menu-options-container").style.display = "none";
  }, 50);
});
/**********************/

function sendMessage(body) {
  if (body != null) {
    return socket.emit("message", body);
  }
  const text = msgInput.value;
  if (text.length == 0) return;
  socket.emit("message", text);
}

function scrollToBottomMessage() {
  messagesHolder.scrollMax = Math.round(
    messagesHolder.scrollHeight - messagesHolder.offsetHeight
  );
  doAutoScroll = true;
  messagesHolder.scrollTo({
    top: messagesHolder.scrollMax + 100,
    behavior: "smooth",
  });
}

function resolveTimestampToReadableTime(timestamp) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  };

  const optionsForToday = {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  };

  var today = new Date().setHours(0, 0, 0, 0);
  var maybeToday = new Date(timestamp).setHours(0, 0, 0, 0);

  if (maybeToday === today)
    return new Date(timestamp).toLocaleTimeString(undefined, optionsForToday);
  return new Date(timestamp).toLocaleTimeString(undefined, options);
}

function getRandomEmoji() {
  var emojis = [
    "😄",
    "😃",
    "😀",
    "😊",
    "☺",
    "😉",
    "😍",
    "😘",
    "😚",
    "😗",
    "😙",
    "😜",
    "😝",
    "😛",
    "😳",
    "😁",
    "😔",
    "😌",
    "😒",
    "😞",
    "😣",
    "😢",
    "😂",
    "😭",
    "😪",
    "😥",
    "😰",
    "😅",
    "😓",
    "😩",
    "😫",
    "😨",
    "😱",
    "😠",
    "😡",
    "😤",
    "😖",
    "😆",
    "😋",
    "😷",
    "😎",
    "😴",
    "😵",
    "😲",
    "😟",
    "😦",
    "😧",
    "😈",
    "👿",
    "😮",
    "😬",
    "😐",
    "😕",
    "😯",
    "😶",
    "😇",
    "😏",
    "😑",
    "👲",
    "👳",
    "👮",
    "👷",
    "💂",
    "👶",
    "👦",
    "👧",
    "👨",
    "👩",
    "👴",
    "👵",
    "👱",
    "👼",
    "👸",
    "😺",
    "😸",
    "😻",
    "😽",
    "😼",
    "🙀",
    "😿",
    "😹",
    "😾",
    "👹",
    "👺",
    "🙈",
    "🙉",
    "🙊",
    "💀",
    "👽",
    "💩",
    "🔥",
    "✨",
    "🌟",
    "💫",
    "💥",
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
