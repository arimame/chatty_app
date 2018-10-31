
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
//import { generateRandomId } from "./RandomNum.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages:[], currentUser: {name: "Bob"}};
    this.addNewMessage = this.addNewMessage.bind(this) //this functionality belongs to this component and pass to its children.
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (ev) {
      console.log("Connected to the server");
    }
}


  addNewMessage(message) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message
    };
    //sending message to server
    this.socket.send(JSON.stringify(newMessage));
    //getting message from server
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const messages = this.state.messages.concat(msg);
      this.setState({messages: messages})
      }
  }



  render() {
    return (
      <div>
      <Navbar />
      <ChatBar currentUser= {this.state.currentUser} addNewMessage={this.addNewMessage}/>
      <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

class Navbar extends Component {
  render () {
  return (
  <div className = "navbar navbar-brand">Chatty</div>)
  }
}

export default App;
