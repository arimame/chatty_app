
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

//   componentDidMount() {
//   console.log("componentDidMount <App />");
//   setTimeout(() => {
//     console.log("Simulating incoming message");
//     // Add a new message to the list of messages in the data store
//     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
//     const messages = this.state.messages.concat(newMessage)
//     // Update the state of the app component.
//     // Calling setState will trigger a call to render() in App and all child components.
//     this.setState({messages: messages})
//   }, 3000);
// }

  addNewMessage(message) {
    const newMessage = {
      id: generateRandomId(),
      username: this.state.currentUser.name,
      content: message
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})

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
