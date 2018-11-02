import React, {Component} from "react";

class ChatBar extends Component {

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      const newMessageInput = event.target;
      this.props.addNewMessage(newMessageInput.value);
      newMessageInput.value = " ";
    }
  }

  enterPressedName(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      const newUsername = event.target;
      this.props.addNewUser(newUsername.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder = "Your name (optional)" onKeyUp={this.enterPressedName.bind(this)}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.enterPressed.bind(this)}/>
      </footer>
    );
  }
}

export default ChatBar;
