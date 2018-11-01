import React, {Component} from 'react';

class Message extends Component {
  render() {
    let post;
    if (this.props.messages.type === "incomingNotification") {
    post = (<div className="message system">{this.props.messages.content}</div>)
    } else if (this.props.messages.type === "incomingMessage") {
    post =  (<div className="message">
    <span className="message-username">{this.props.messages.username}</span>
    <span className="message-content">{this.props.messages.content}</span>
  </div>)}

    return (
    <div>{post}</div>
    );
  }
}

export default Message;
