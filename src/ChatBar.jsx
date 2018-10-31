import React, {Component} from 'react';

class ChatBar extends Component {

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      const newMessageInput = event.target;
      this.props.addNewMessage(newMessageInput.value);
      newMessageInput.value = " ";


    }
}

  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder = "Your name (optional)" defaultValue={this.props.currentUser.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.enterPressed.bind(this)}/>
      </footer>
    );
  }
}

export default ChatBar;
