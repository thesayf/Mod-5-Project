import React from 'react';
import Login from './Login'
import SignUp from './SignUp'
import AddPost from './components/AddPost'
import AppContainer from './AppContainer'
import {Route, Redirect} from 'react-router-dom'
import API from './adapters/API';
import axios from 'axios'

class App extends React.Component {

  state = {
    user: undefined,
    longitude: null,
    latitude: null,
    posts: [],
    currentLocation: true,
    altPosts: []
  }

  componentDidMount() {
    API.validateUser()
      .then(user => {
        if(!user.error) this.setState({user: user})
      })
    console.log("getting locations")
    this.getLocation()
  }

  getLocation = () => {
    this.setState({currentLocation: true})
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  }

  showPosition = (position) => {
    console.log(position)
    this.getPostsBySearch(position)
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
    console.log(state)

    const h = new Headers();
    h.append('Accept', 'application/json');
    let fd = new FormData();
    fd.append("title", state.title)
    fd.append("description", state.description)
    fd.append("userID", this.state.user.id)
    fd.append("longitude", this.state.longitude)
    fd.append("latitude", this.state.latitude)
    // fd.append('image', state.img, "avatar.png")
    if(state.recordedImage){
      fd.append("image", state.recordedImage)
    }
    else{
      fd.append('image', state.img, "avatar.png")
    }


    let req = new Request("http://localhost:3000/newpost", {
      method: 'POST',
      headers: h,
      body: fd
    })

    fetch(req).then(res => res.json()).then(post => this.setState({posts: [...this.state.posts, post]})).then(this.props.history.push('/app'))
  }

  getPostsBySearch = (position) => {
    console.log("searching locations ")
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
        }).then(res => res.json()).then(posts => this.setState({currentLocation: false, altPosts: posts}))
  }

  posts = () => {
    if(this.state.currentLocation){
      return this.state.posts
    }else{
      return this.state.altPosts
    }
  }

  render() {

    return (
      <React.Fragment>

      <Route path="/" exact component={() => <Login login={this.login} />}/>
        {
          !this.state.user ? <Redirect to="/"></Redirect> : <Redirect to="/app"></Redirect> 
        }
      <Route path="/app" exact component={() => <AppContainer getLocation={this.getLocation} user={this.state.user} changeLocation={this.changeLocation} logOut={this.logOut} posts={this.posts()} getLocation={this.getLocation} />} />
      <Route path="/signUp" exact component={() => <SignUp signUp={this.signUp}/>} />
      <Route path="/addPost" exact component={() => <AddPost addPost={this.addPost} />} />
      </React.Fragment>
    );
  }
}

export default App;
