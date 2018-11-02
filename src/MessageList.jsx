import React, {Component} from "react";
import Message from "./Message.jsx";



class MessageList extends Component {

  //function to scroll to bottom of feed as messages are sent
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const messages = this.props.messages.map(message => (
      <Message key={message.id} messages={message} currentUser= {this.props.currentUser}/>
    ));
    return (
      <main className="messages"> {messages}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </main>

    );
  }
}

export default MessageList;
