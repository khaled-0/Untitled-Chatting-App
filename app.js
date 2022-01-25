const express = require("express")
const app = express()
const port = 3000

/**
 * Start the webserver to serve Frontend
 */
app.use(express.static('Frontend'));
let server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

/**
 * Create Websocket
 */
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });
});