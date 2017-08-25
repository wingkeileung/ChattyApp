import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

 render() {
  const messages = this.props.messages.map(message =>
    {return <Message
      id = { message.id }
      username = { message.username }
      content = { message.content }
    />});

    return (
      <div>
        {messages}
      </div>
    );
  }
}
export default MessageList;