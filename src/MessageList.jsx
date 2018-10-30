import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <Message key={message.id} messages={message} />

    ));
    return (
  <main className="messages"> {messages}
  </main>
    );
  }
}

export default MessageList;
