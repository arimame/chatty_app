// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log("set size", wss.clients.size);
  const setSize = wss.clients.size;
  let numberOfUsers = {type: "userNotification", users: setSize};
  boardcast(numberOfUsers);

  const colour = ["teal", "pink", "purple", "orange"];
  const random = Math.floor(Math.random()* colour.length);
  const userColour = {type: "colour", colour: colour[random]};
  console.log(userColour);
  ws.send(JSON.stringify(userColour));

  ws.on("message", (data) => {
  let msg = JSON.parse(data);
  if(msg.type === "postMessage") {
    console.log(`${msg.username} says ${msg.content}`);
    //adding uuid to message object
    msg.id = uuid();
    msg.type = "incomingMessage";
  } else if (msg.type === "postNotification") {
      msg.type = "incomingNotification"
  }
    boardcast(msg);
});

//function sends messages to clients
function boardcast (data) {
  wss.clients.forEach(function(client) {
  client.send(JSON.stringify(data));
});
}

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const setSize = wss.clients.size;
    var numberOfUsers = {type: "userNotification", users: setSize};
    boardcast(numberOfUsers);
  });

});


