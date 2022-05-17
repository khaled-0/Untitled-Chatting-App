const express = require("express");
const app = express();
const port = 3000;

const Utils = require("./utils");

/**
 * Start the webserver to serve Frontend
 */
app.use(express.static("Frontend"));
let server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Create Websocket
 */
const io = require("socket.io")(server, {
  cors: { origin: "*" }, // use *:
});

io.on("connection", (socket) => {
  console.log("Somebody connected.");

  var username;
  var socketID = socket.id;
  const userColor = Utils.generateRandomColor();

  socket.on("initialize", (userName) => {
    if (!userName) return;

    if (userName.length > 20) userName = userName.substr(0, 20);
    if (!username) username = userName;
  });

  socket.on("message", (message) => {
    if (!message) return;

    var msg = {
      username: username || socketID,
      userColor: userColor,
      timestamp: Date.now(),
      body: message,
    };

    io.emit("message", msg);
  });
});

/*
 * Prevents app from crashing if exception occurs
 */
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
