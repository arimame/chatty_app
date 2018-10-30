import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <Message key={this.props.messages.id} messages={message} />

    ));
    return (
  <main className="messages"> {messages}
  </main>
    );
  }
}

export default MessageList;
