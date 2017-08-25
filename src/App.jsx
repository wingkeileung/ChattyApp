import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'

const ChattyData = {
  currentUser: {name: 'Anonymous'},
  messages: []
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: ChattyData.currentUser.name,
      messages: ChattyData.messages,
    }
  }

  sendMessage(text){
    const newMessage = {
      content: text,
      type: 'postMessage',
      username: this.state.currentUser
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUsername(newUsername){
    const oldUsername = this.state.currentUser;
    this.setState({currentUser: newUsername});
    const newUser = {
      content: oldUsername + " changed their name to " + newUsername,
      type: 'postNotification',
    }
    this.socket.send(JSON.stringify(newUser));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.addEventListener('message', (e) => {
      const newMessages = this.state.messages.concat();
      const messageData = JSON.parse(e.data);

      switch (messageData.type) {
        case 'incomingMessage':
          // fall-through
        case 'incomingNotification':
          newMessages.push(messageData);
          this.setState({messages: newMessages});
          break;
        case 'count':
          this.setState({userNum: messageData.userNum});
          break;
        default:
          console.error("Error: websocket message with invalid type:", type);
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar userNum={this.state.userNum}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar sendMessage={text => this.sendMessage(text)} changeUsername={text => this.changeUsername(text)}/>
      </div>
    );
  }
}

export default App;