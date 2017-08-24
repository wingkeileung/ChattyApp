const express = require('express');
const SocketServer = require('ws').Server;
const ws = require('ws');
const uuidv1 = require('uuid/v1');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');



  ws.on('message', (message) => {
    console.log(message);
    console.log('Got a message');
    const receivedMessage = JSON.parse(message);
    console.log(receivedMessage);
  wss.broadcast(JSON.stringify(receivedMessage));

  });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Got a message!');
    const receivedMessage = JSON.parse(message) ;
    const newReceivedMessage = {
      id: uuidv1(),
      username: receivedMessage.username,
      content: receivedMessage.content
    }
    console.log (newReceivedMessage);
    wss.broadcast(JSON.stringify(newReceivedMessage));
});

  ws.on('close', () => console.log('Client disconnected'));
});