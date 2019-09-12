import React from 'react'
import {Link} from 'react-router-dom'
import './custom.css';

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handleClick = () => {
   const userObj = {
      email: this.state.email, 
      password: this.state.password
    }
    this.props.login(userObj)
  }

  render() {
    return (
    <React.Fragment>
    
    <div className="ui Tiny image logo-text-center">
        <img src={require('./logo_transparent_background.png')}></img>
    </div>
    <div className="ui container">
    <div className="ui aligned center login-box-padding">
      <div className="ui segment">
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <label>email</label>
            <input onChange={(e) => this.handleChange(e)} name="email" placeholder="email" type="text"></input>
          </div>
          <div className="field">
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name="password" placeholder="Last Name" type="text"></input>
          </div>
        </div>
        <div className="inline field">
           <Link to={'/signUp'}> Sign Up</Link>
        </div>
        <div onClick={this.handleClick}className="ui submit button">Submit</div>
      </div>
    </div>
    </div> 
    </div>
    </React.Fragment>
    )
  }
}

export default Login
