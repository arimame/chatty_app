const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid/v1");

const PORT = 3001;

const server = express()

  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  broadcast(setClientsSize(wss.clients));

  //set client colors
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
    broadcast(msg);
  });

  //function sends data to  all clients
  function broadcast (data) {
    wss.clients.forEach(function(client) {
      client.send(JSON.stringify(data));
    });
  }

  //function sets number of users
  function setClientsSize(clients) {
    const setSize = clients.size;
    var numberOfUsers = {type: "userNotification", users: setSize};
    return numberOfUsers;
  }

  //callback for when a client closes the socket
  ws.on("close", () => {
    console.log("Client disconnected");
    broadcast(setClientsSize(wss.clients));
  });

});



