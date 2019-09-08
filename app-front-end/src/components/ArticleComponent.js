import React from 'react';
import '../custom.css';
import Comment from './Comment'

class ArticleComponent extends React.Component {

  state = {
    comments: this.props.post.comments,
    commentInput: "",
    displayComments: false
  }

  handleChange = (e) => {
    this.setState({
      commentInput: e.target.value
    })
  
  }

  handleKeyPress = (e) => {
      if(e.key === 'Enter'){
        const commentObj = {
          commentInput: this.state.commentInput,
          userID: this.props.user.id,
          postID: this.props.post.id
        }

        fetch("http://localhost:3000/newcomment", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(commentObj)
      }).then(res => res.json()).then(comment => this.setState({
        comments: [...this.state.comments, comment], 
        displayComments: true,
        commentInput: null }))
      }
  }

  commentClick = () => {
    this.setState({displayComments: !this.state.displayComments})
  }

  render() {  
    
    return (
      <React.Fragment>
      <div className="ui grid custom-card"> 
      <div className="ui card column 16 wide fulid">
        <div className="content">
          <div className="right floated meta">14h</div>
          <img className="ui avatar image" src={this.props.post.user.image} />
          {
            this.props.post.user.name
          }
        </div>

        <div className="image">
          <img src={this.props.post.image}/>
        </div>
        <div className="content">
        <a class="header">{this.props.post.title}</a>
          <span className="right floated">
            <i className="lemon outline like icon"></i>
            17 Jucy rating
          </span>
          <i onClick={this.commentClick}className="comment icon"></i>
          3 comments
          <div class="description">
            {this.props.post.content}
          </div>
        </div>

        { 
          this.state.displayComments ? 
          this.state.comments.map(comment => <Comment  comment={comment} post={this.props.post} />)
        :
        null
        }
        
        <div className="extra content">
          <div className="ui large transparent left icon input">
            <i className="heart outline icon"></i>
            <input onKeyPress={this.handleKeyPress} onChange={e => this.handleChange(e)} type="text" placeholder="Add Comment..."></input>
          </div>
        </div>
      </div>  
      </div>
      </React.Fragment>
        );


  }
  
}

export default ArticleComponent;
