import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
    <div>
  <div className="message">
    <span className="message-username">{this.props.messages.username}</span>
    <span className="message-content">{this.props.messages.content}</span>
  </div>
  <div className="message system">
    Anonymous1 changed their name to nomnom.
  </div>
  </div>
    );
  }
}

export default Message;