import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
// import TimerComponent from './TimerComponent.jsx'
// import UserData from './UserData.jsx'
// import SetUser from './SetUser.jsx'

const ChattyData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor() {
        super();
        this.state = {
            currentUser: ChattyData.currentUser.name,
            messages: ChattyData.messages
        }
    this.index = 3;
  }

  componentDidMount() {
  this.socket = new WebSocket('ws://localhost:3001');

  this.socket.addEventListener('message', (event) => {
      // console.log('Got a broadcast message');
      console.log(event.data);
      const newMessages = this.state.messages;
      const messageObject = JSON.parse(event.data);
      newMessages.push(messageObject);
      this.setState({messages: newMessages});
    });
}
  sendMessage(text){
    console.log(text);
    const newMessage = {
      id: this.index,
      username: this.state.currentUser,
      content: text
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUsername(newUsername){
    this.setState({currentUser: newUsername});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages={ this.state.messages }/>
        <ChatBar changeUsername={ text => this.changeUsername(text)} sendMessage={text => this.sendMessage(text)}/>
      </div>
    );
  }
}
export default App;