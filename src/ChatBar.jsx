import React, {Component} from 'react';

class ChatBar extends Component {

  onMessageSent(e){
    if(e.key === 'Enter'){
      this.props.sendMessage(e.target.value);
    }
  }
  onUserChange(e){
    if(e.key === 'Enter'){
      this.props.changeUsername(e.target.value);
    }
  }

  render() {
    return (
    <div>
      <footer className="chatbar">
        <input  className="chatbar-username"
                placeholder="Your Name (Optional)"
                onKeyUp={(e) => this.onUserChange(e)}
        />

        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onKeyUp={(e) => this.onMessageSent(e)}
        />
      </footer>
    </div>
    )
  }
}
export default ChatBar;