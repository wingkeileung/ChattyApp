import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'

const ChattyData = {
  currentUser: {name: 'Anonymous'},
  messages: [
    { id: '1',
      username: 'Bob',
      content: 'Has anyone seen my marbles?',
    },
    { id: '2',
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: ChattyData.currentUser.name,
      messages: ChattyData.messages,
      oldName:null
    }
    this.index = 4;
  }

  sendMessage(text){
   const newMessage = {
    content: text,
    id: this.index,
    type: 'postMessage',
    username: this.state.currentUser
   }
    this.socket.send(JSON.stringify(newMessage), 'message');
  }

  changeUsername(newUsername){
    this.setState({oldName: this.state.currentUser});
    this.setState({currentUser: newUsername});
    const newUser = {
      content: this.state.content,
      id: this.index,
      type: 'postNotification',
      username: newUsername
    }
    this.socket.send(JSON.stringify(newUser), 'message');
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.addEventListener('message', (e) => {
      const newMessages = this.state.messages;
      const messageData = JSON.parse(e.data);

      if(messageData.type === 'incomingMessage'){
        newMessages.push(messageData);
        this.setState({messages: newMessages});
      } else if (messageData.type === 'incomingNotification') {
        newMessages.push({content: this.state.oldName + ' changed their username to ' + messageData.username});
        this.setState({messages: newMessages});
      } else if (messageData.type === 'count') {
        this.setState({userNum: messageData.userNum});
      }
      this.setState({messages: newMessages});
    });
  }

  render() {
    return (
      <div>
        <NavBar userNum ={this.state.userNum}/>
        <MessageList messages={ this.state.messages}/>
        <ChatBar sendMessage={text => this.sendMessage(text)} changeUsername={text => this.changeUsername(text)}/>
      </div>
    );
  }
}

export default App;