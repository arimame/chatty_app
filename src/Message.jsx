import React, {Component} from 'react';

class Message extends Component {
  render() {

    let post;
    if (this.props.messages.type === "incomingNotification") {
    post = (<div className="message system">{this.props.messages.content}</div>)
    } else if (this.props.messages.type === "incomingMessage") {
      // var regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i;
      // var content = this.props.messages.content;
      // var match = content.split(regex);
      // console.log(match);
      // console.log(this.props.messages.content)
  //     if(match) {
  //       post = (<div className="message">
  //   <span className="message-username" style={{color:this.props.messages.colour}}>{this.props.messages.username}</span>
  //   <img className="message-content" src={this.props.messages.content}/>
  // </div>)
  //     } else {
         post =  (<div className="message">
    <span className="message-username" style={{color:this.props.messages.colour}}>{this.props.messages.username}</span>
    <span className="message-content">{this.props.messages.content}</span>
  </div>)}
      // }


    return (
    <div>{post}</div>
    );
  }
}

export default Message;
