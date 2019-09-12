import React from 'react';
import '../custom.css';
import Comment from './Comment'

class ArticleComponent extends React.Component {

  state = {
    comments: this.props.post.comments,
    likes: this.props.post.ratings.length,
    commentInput: "",
    thisPostsLikes: this.props.post.ratings,
    displayComments: false,
    liked: '',
    thisUserLiked: []
  }

  componentDidMount = () => {
   const liked = this.props.post.ratings.map(r => r.user_info.id).includes(this.props.user.id)
    this.setState({liked: liked})

    let thisusersliked = this.state.thisPostsLikes.map(rating => {
      if(rating.user_id === this.props.user.id) {
        return rating.id
      }
    })

    this.setState({thisUserLiked: thisusersliked})
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
        commentInput: "" }))
      }
  }

  commentClick = () => {
    this.setState({displayComments: !this.state.displayComments})
  }

  addLikes = () => {

   if(this.state.liked){
    const dislikeObj = {
      likeId: this.state.thisUserLiked[0]
    }
    fetch("http://localhost:3000/deleterating", {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(dislikeObj)
          }).then(res => res.json()).then(this.setState({likes: this.state.likes - 1, liked: false}))
   }
   else{
    const likeObj = {
              userID: this.props.user.id,
              postID: this.props.post.id
            }
            fetch("http://localhost:3000/newrating", {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(likeObj)
          })
          .then(res => res.json())
          .then(like => this.setState({
            likes: this.state.likes + 1, 
            liked: true,
            thisPostsLikes: [...this.state.thisPostsLikes, like]
          }))
   }
    
  
  
  }


  render() {  
    // console.log(this.props.post.ratings);
    console.log(this.state.thisPostsLikes);
    
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
        <a className="header">{this.props.post.title}</a>
          <span onClick={this.addLikes} className="right floated">
            <i className="lemon outline like icon"></i>
            {this.state.likes} Jucy rating
          </span>
          <i onClick={this.commentClick}className="comment icon"></i>
          
          {this.props.post.comments.length} comments
          <div className="description">
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
            <input value={this.state.commentInput} onKeyPress={this.handleKeyPress} onChange={e => this.handleChange(e)} type="text" placeholder="Add Comment..."></input>
          </div>
        </div>
      </div>  
      </div>
      </React.Fragment>
        );


  }
  
}

export default ArticleComponent;
