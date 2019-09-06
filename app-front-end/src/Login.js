import React from 'react'
import {Link} from 'react-router-dom'

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
      <div>
      <div className="ui container">
      <div className="ui inverted segment">
      <div className="ui inverted form">
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
    )
  }
}

export default Login
