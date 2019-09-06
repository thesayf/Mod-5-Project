import React from 'react'
import {Link} from 'react-router-dom'

class SignUp extends React.Component {

  state = {
      name: '',
      email: '',
      password: '',
      image: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = () => {
    const userObj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      image: this.state.image
    } 

    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userObj)
    }).then(res => res.json()).then(response => localStorage.token = response.token)
  }

  render() {
    
    return (
      <div className="ui container">
      <div className="ui inverted segment">
      <div className="ui inverted form">
        <div className="two fields">
          <div className="field">
            <label>Name</label>
            <input onChange={(e) => this.handleChange(e)} name="name" placeholder="First Name" type="text"></input>
          </div>
          <div className="field">
            <label>Email</label>
            <input onChange={(e) => this.handleChange(e)} name="email" placeholder="email" type="text"></input>
          </div>
          <div className="field">
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name="password" placeholder="Last Name" type="text"></input>
          </div>
          <div className="field">
            <label>Avatar</label>
            <input onChange={(e) => this.handleChange(e)} name="image" placeholder="image" type="text"></input>
          </div>
        </div>
        <div className="inline field">
           <Link to={'/'}> Log In</Link>
        </div>
        <div onClick={this.handleClick}className="ui submit button">Submit</div>
      </div>
    </div>
    </div>
    )
  }
}

export default SignUp
