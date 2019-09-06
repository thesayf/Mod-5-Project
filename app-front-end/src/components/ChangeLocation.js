import React from 'react';

class ChangeLocation extends React.Component {

    state = {
        longitude: '',
        latitude: '',
        searchInput: ''
    }

    handleChange = (e) => {      
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick = () => {
      // this.props.changeLocation(this.state)
      this.props.changeLocation(this.state.searchInput)
    }
  
    render() {
        
      return (
        <React.Fragment>
            <div className="ui container">
            <div className="ui form">
                <div className="field">
                    {/* <label>latitude</label>
                    <input onChange={this.handleChange} name="latitude" type="text"></input>
                    <label>longitude</label>
                    <input onChange={this.handleChange} name="longitude" type="text"></input> */}
                    <input onChange={this.handleChange} name="searchInput" type="text"></input>
                    <button onClick={this.handleClick} class="ui button" type="submit">Submit</button>
                </div>
            </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
  export default ChangeLocation;