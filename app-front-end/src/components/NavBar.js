import React from 'react';
import {Link} from 'react-router-dom'


class NavBar extends React.Component {

  state = {
    longitude: '',
    latitude: ''
}

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

handleClick = () => {
  this.props.changeLocation(this.state)
}

logOut = () => {
      this.props.logOut()
}
  render() {
    return (
      <div className="ui secondary  menu">
    <a className="active item">
        Home
    </a>
    <a className="item">
    <Link to={'/addPost'}>Create Post</Link>
    </a>
    <a onClick={this.props.toggleForm} className="item">
      change location
      {/* change location */}
    {/* <Link to={'/changeLocation'}>change location</Link> */}
    {/* <input onChange={this.handleChange} placeholder="lat" name="latitude" type="text" />
    <input onChange={this.handleChange} type="text" name="longitude" placeholder="long" />
    <a onClick={this.handleClick} className="ui item">
        change
      </a> */}
    </a>
    <div className="right menu">
      <a onClick={this.logOut} className="ui item">
        Logout
      </a>
    </div>
  </div>
    );

  }
}

export default NavBar;


/* <div className="item">
      <div className="ui icon input">
        <input type="text" placeholder="Search..." />
        <i className="search link icon"></i>
      </div>
    </div> */