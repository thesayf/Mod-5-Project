import React from 'react';
import {Link} from 'react-router-dom'

class AddPost extends React.Component {

    state = {
        title: '',
        img: '',
        description: '',
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick = () => {
      this.props.addPost(this.state)
    }
  
    render() {
        
      return (
        <React.Fragment>
            <div className="ui container">
            <div className="ui form">
                <div className="field">
                    <label>Title</label>
                    <input onChange={this.handleChange} name="title" type="text"></input>
                    <label>Img URL</label>
                    <input onChange={this.handleChange} name="img" type="text"></input>
                    <label>Description</label>
                    <textarea onChange={this.handleChange} name="description"></textarea>
                    <button onClick={this.handleClick} class="ui button" type="submit">Submit</button>
                    <Link to={'/app'}>back</Link>
                </div>
            </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
  export default AddPost;