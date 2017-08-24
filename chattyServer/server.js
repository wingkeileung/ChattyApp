const express = require('express');
const SocketServer = require('ws').Server;
const ws = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

function userCount() {
  const userNum = { type: "count", userNum:wss.clients.size};
  wss.broadcast(JSON.stringify(userNum));
};


wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount();

  ws.on('message', (message) => {
    console.log('Message is here!');
    const receivedMessage = JSON.parse(message);

    if(receivedMessage.type === 'postMessage') {
    const newReceivedMessage = {
      content: receivedMessage.content,
      id: uuidv1(),
      type:'incomingMessage',
      username: receivedMessage.username
    }

    wss.broadcast(JSON.stringify(newReceivedMessage));
  } else if (receivedMessage.type === 'postNotification'){
    const newReceivedMessage ={
      content: receivedMessage.content,
      id: uuidv1(),
      type: 'incomingNotification',
      username: receivedMessage.username
    }
    wss.broadcast(JSON.stringify(newReceivedMessage));
  }
 });
  ws.on('close', () => {
    console.log('Client disconnected')
    userCount();
    });
});