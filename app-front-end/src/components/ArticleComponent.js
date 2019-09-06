import React from 'react';
import '../custom.css';

class ArticleComponent extends React.Component {

  state = {
    comments: [],
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
          userID: this.props.post.user.id,
          postID: this.props.post.id
        }

        fetch("http://localhost:3000/newcomment", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(commentObj)
      }).then(res => res.json()).then(console.log)

      }
  }

  commentClick = () => {
    this.setState({displayComments: !this.state.displayComments})
  }

  render() {

    console.log(this.props.post);
    

    return (
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
            <i className="heart outline like icon"></i>
            17 likes
          </span>
          <i onClick={this.commentClick}className="comment icon"></i>
          3 comments
          <div class="description">
            {this.props.post.content}
          </div>
        </div>
        {
          this.state.displayComments ? 
          <div class="ui list">
        <div class="item">
        <img className="ui avatar image" src={this.props.post.user.image} />
        <div class="content">
        <a class="header">Rachel</a>
        <div class="description">Last seen watching just now.</div>
        </div>
        </div>
        </div> 
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
      
        );


  }
  
}

export default ArticleComponent;
