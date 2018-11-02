import React, {Component} from 'react';

class Message extends Component {
  render() {

    let post;

    if (this.props.messages.type === "incomingNotification") {
      post = (
        <div className="message system">{this.props.messages.content}</div>
        )

    } else if (this.props.messages.type === "incomingMessage") {
      //looks for url
      var regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      var content = this.props.messages.content;
      var match = content.match(regex);
      if(match) {
        //if there is an image, render this
        var url = match[0];
        post = (
          <div className="message">
            <span className="message-username" style={{color:this.props.messages.colour}}>{this.props.messages.username}</span>
            <span className="message-content">{this.props.messages.content}<img className="message-content" src={url}/></span>
         </div>)
      } else {
        //if there is no image, render this
         post =  (
          <div className="message">
            <span className="message-username" style={{color:this.props.messages.colour}}>{this.props.messages.username}</span>
            <span className="message-content">{this.props.messages.content}</span>
          </div>
          )}
      }

  return (
    <div>{post}</div>
    );
  }
}

export default Message;
