
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { generateRandomId } from "./RandomNum.js";

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: generateRandomId(),
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: generateRandomId(),
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: data.messages, currentUser: data.currentUser};
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
      //id: generateRandomId(),
      username: this.state.currentUser.name,
      content: message
    };
      this.socket.send(JSON.stringify(newMessage));
      //const messages = this.state.messages.concat(newMessage);
      //this.setState({messages: messages})
      this.socket.onmessage = function (event) {
      console.log(JSON.parse(event.data));

      }
    };



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
