import React from 'react';
import Login from './Login'
import SignUp from './SignUp'
import AddPost from './components/AddPost'
import AppContainer from './AppContainer'
import {Route, Redirect} from 'react-router-dom'
import API from './adapters/API';

class App extends React.Component {

  state = {
    user: undefined,
    longitude: null,
    latitude: null,
    posts: []
  }

  componentDidMount() {
    API.validateUser()
      .then(user => {
        if(!user.error) this.setState({user: user})
      })
  }

  login = user => {
    API.logIn(user)
    .then(user => this.setState({user: user}))
  }

  signUp = user => {
    API.logIn(user)
    .then(user => this.setState({user: user})).then(this.props.history.push('/app'))
  }

  addPost = state => {
    const postObj = {
          title: state.title,
          img: state.img,
          description: state.description,
          userID: this.state.user.id,
          longitude: this.state.longitude,
          latitude: this.state.latitude
      }
    
    fetch("http://localhost:3000/newpost", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postObj)
      }).then(res => res.json()).then(post => this.setState({posts: [...this.state.posts, post]})).then(this.props.history.push('/app'))
  }

  getLocation = (position) => {

        this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude })
        const postObj = {
        longitude: this.state.longitude,
        latitude: this.state.latitude
        }
    
        fetch("http://localhost:3000/posts", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(postObj)
        }).then(res => res.json()).then(posts => this.setState({posts: posts}))
      
  }

  logOut = () => {
    localStorage.removeItem('token')
    this.setState({ user: undefined })
  }

  changeLocation = (state) => {
      const search ={
        searchInput: state
      }

      fetch("http://localhost:3000/search", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(search)
        }).then(res => res.json()).then(address => this.getSelectedPosts(address))

  }

  getSelectedPosts = (address) => {
    const coords = address

    const postObj = {
      longitude: coords[1],
      latitude: coords[0]
      }

    fetch("http://localhost:3000/posts", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(postObj)
        }).then(res => res.json()).then(posts => this.setState({posts: posts}))

    
  }

  render() {
    return (
      <React.Fragment>

      <Route path="/" exact component={() => <Login login={this.login} />}/>
        {
          !this.state.user ? <Redirect to="/"></Redirect> : <Redirect to="/app"></Redirect> 
        }
      <Route path="/app" exact component={() => <AppContainer changeLocation={this.changeLocation} logOut={this.logOut} posts={this.state.posts} getLocation={this.getLocation} />} />
      <Route path="/signUp" exact component={() => <SignUp signUp={this.signUp}/>} />
      <Route path="/addPost" exact component={() => <AddPost addPost={this.addPost} />} />
      </React.Fragment>
    );
  }
}

export default App;
