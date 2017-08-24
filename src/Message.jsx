import React, {Component} from 'react';

class Messages extends Component {
  render() {
    return (
        <div>
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
  }
}
export default Messages;