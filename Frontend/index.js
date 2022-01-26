const socket = io();

const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const messagesHolder = document.querySelector(".messagesHolder")
const messageList = document.getElementById("messageList")
const scrollToBottomMessageBtn = document.getElementById("scrollToBottomMessageBtn")

var doAutoScroll = true;

sendBtn.innerHTML = getRandomEmoji()

messagesHolder.onscroll = function() {
  if (this.oldScroll > this.scrollTop) {
    scrollToBottomMessageBtn.style.display = "block";
    doAutoScroll = false;
  } else if (this.scrollTop < this.oldScrollMax) {
    scrollToBottomMessageBtn.style.display = "block";
    doAutoScroll = false;
  } else {
    scrollToBottomMessageBtn.style.display = "none";
    doAutoScroll = true;
  }
  this.oldScroll = this.scrollTop;
  this.oldScrollMax = (this.scrollTop > (this.oldScrollMax == undefined ? 0 : this.oldScrollMax)) ? this.scrollTop : this.oldScrollMax
}

socket.on('message', text => {

  const msg = document.createElement('li');
  msg.innerText = text;
  messageList.appendChild(msg);
  if (doAutoScroll) scrollToBottomMessage()
});

sendBtn.onclick = () => {

  if (sendBtn.innerText.length != 0) {
    return sendMessage(sendBtn.innerText)
  }
  sendMessage();
  msgInput.value = "";
  document.querySelector('.sendBtn').className += " sendBtnEmoji";
  sendBtn.innerText = getRandomEmoji()

}
document.querySelector('.msgInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
    msgInput.value = "";
    document.querySelector('.sendBtn').className += " sendBtnEmoji";
    sendBtn.innerText = getRandomEmoji()
  }
});

msgInput.addEventListener("input", function(e) {
  if (document.querySelector('.msgInput').value.length == 0) {
    document.querySelector('.sendBtn').className += " sendBtnEmoji";
    sendBtn.innerText = getRandomEmoji()
  } else {
    document.querySelector('.sendBtn').className = "sendBtn";
    sendBtn.innerText = null;

  }
})

function sendMessage(body) {
  if (body != null) {
    return socket.emit('message', body)
  }
  const text = msgInput.value;
  if (text.length == 0) return;
  socket.emit('message', text)
}

function scrollToBottomMessage() {
  messagesHolder.scroll({
    top: messagesHolder.scrollHeight,
    behavior: 'smooth'
  });
}

function getRandomEmoji() {
  var emojis = ["😀", "🤣", "😴", "😙"];
  var random = Math.floor(Math.random() * emojis.length);
  var emoji = emojis[random];
  return emoji;
}