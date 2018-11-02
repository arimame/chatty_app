
import React, {Component} from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages:[], currentUser: {name: "anonymous", colour: "black"}, numberofUsers: 0};
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (ev) {
      console.log("Connected to the server");
    }
    //getting data from the server
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if((msg.type === "incomingMessage") || (msg.type === "incomingNotification")) {
        const messages = this.state.messages.concat(msg);
        this.setState({messages: messages})
      } else if (msg.type === "userNotification"){
        this.setState({numberofUsers: msg.users})
      } else if (msg.type === "colour") {
        this.setState({currentUser: {
          ...this.state.currentUser,
          colour: msg.colour
        }})
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
    //sending new message to server
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
    //sending new notification to the server
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

//rendering navbar
class Navbar extends Component {
  render () {
    return (
      <div className = "navbar navbar-brand">Chatty <span className = "users">{this.props.numberofUsers} users online</span>
      </div>
    )
  }
}

export default App;
