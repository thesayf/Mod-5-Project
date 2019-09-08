import React from 'react';
import NavBar from './components/NavBar'
import ArticleFeed from './components/ArticleFeed'
import ChangeLocation from './components/ChangeLocation'


class AppContainer extends React.Component {

  state = {
    showform: false
  }

    getLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geo Location not supported by browser");
      }
    }

    showPosition = (position) => {
      this.props.getLocation(position)
    }

    componentDidMount = () => {
      this.getLocation()
    }

    toggleForm = () => this.setState({showform: !this.state.showform})
  
    render() {
      return ( 
        <React.Fragment>
            <div> <h1>GossApp</h1></div>
            <NavBar logOut={this.props.logOut} changeLocation={this.props.changeLocation} toggleForm={this.toggleForm} />
           {
             this.state.showform ? <ChangeLocation changeLocation={this.props.changeLocation} /> : null
           }
            <ArticleFeed user={this.props.user} posts={this.props.posts} />
        </React.Fragment>
      );
    }
  }
  
  export default AppContainer;
  