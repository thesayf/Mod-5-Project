import React from 'react';

class Comment extends React.Component {
  
    render() {  
 
      return (
        <React.Fragment>
            <div className="ui container">
            <div class="ui list">
        <div class="item">
        <img className="ui avatar image" src={this.props.comment.user_info.image} />
        <div class="content">
        <a class="header">{this.props.comment.user_info.name}</a>
        <div class="description">{this.props.comment.content}</div>
        </div>
        </div>
        </div> 
        </div>
        </React.Fragment>
      );
    }
  }
  
  export default Comment;