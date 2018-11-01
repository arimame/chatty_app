
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
//import { generateRandomId } from "./RandomNum.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages:[], currentUser: {name: "anonymous", colour: "black"}, numberofUsers: 0};
    this.addNewMessage = this.addNewMessage.bind(this)
    this.addNewUser = this.addNewUser.bind(this)
     //this functionality belongs to this component and pass to its children.
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (ev) {
      console.log("Connected to the server");
    }
    //getting message from server
     this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      //console.log(msg);
      if((msg.type === "incomingMessage") || (msg.type === "incomingNotification")) {
        console.log("1", msg)
        const messages = this.state.messages.concat(msg);
        this.setState({messages: messages})
      } else if (msg.type === "userNotification"){
        console.log("2", msg);
        this.setState({numberofUsers: msg.users})
      } else if (msg.type === "colour") {
      console.log("3", msg);
      this.setState({currentUser: {
        ...this.state.currentUser,
        colour: msg.colour
      }})
      console.log(this.state.currentUser);
    }
  }
}


  addNewMessage(message) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: message,
      colour: this.state.currentUser.colour
    };
    //sending message to server
    this.socket.send(JSON.stringify(newMessage));

  }

   addNewUser(name) {
    const postNotification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${name}`
    }
  this.setState({currentUser: {
    ...this.state.currentUser,
    name: name
  }});
   this.socket.send(JSON.stringify(postNotification));
  }

  render() {
    return (
      <div>
      <Navbar numberofUsers ={this.state.numberofUsers} />
      <ChatBar currentUser= {this.state.currentUser} addNewMessage={this.addNewMessage} addNewUser={this.addNewUser}/>
      <MessageList messages={this.state.messages} currentUser= {this.state.currentUser}/>
      </div>
    );
  }
}

class Navbar extends Component {
  render () {
  return (
  <div className = "navbar navbar-brand">Chatty <span className = "users">{this.props.numberofUsers} users online</span>
  </div>
  )
  }
}

export default App;
