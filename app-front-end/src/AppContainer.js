import React from 'react';
import NavBar from './components/NavBar'
import ArticleFeed from './components/ArticleFeed'
import ChangeLocation from './components/ChangeLocation'


class AppContainer extends React.Component {

  state = {
    showform: false
  }

    toggleForm = () => this.setState({showform: !this.state.showform})
  
    render() {
      const imageInline = {
          marginLeft: "110px"
      }
      return ( 
        <React.Fragment>
            <div style={imageInline} className="ui small image header-margin-top"> 
            <img className="margin-left-100" src={require('./logo_transparent_background_no_background.png')}></img>
            </div>
            <NavBar getLocation={this.props.getLocation} logOut={this.props.logOut} changeLocation={this.props.changeLocation} toggleForm={this.toggleForm} />
           {
             this.state.showform ? <ChangeLocation changeLocation={this.props.changeLocation} /> : null
           }
            <ArticleFeed user={this.props.user} posts={this.props.posts} />
        </React.Fragment>
      );
    }
  }
  
  export default AppContainer;
  