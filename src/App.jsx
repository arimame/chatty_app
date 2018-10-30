
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
      <Navbar />
      <ChatBar />
      <MessageList />
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
