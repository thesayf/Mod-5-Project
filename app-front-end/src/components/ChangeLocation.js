import React from 'react';
import '../custom.css';

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
            <div className="ui container change-location-form">
            <div className="ui form">
                <div className="field">
                    <input placeholder="Find Gossip In a New Location" onChange={this.handleChange} name="searchInput" type="text"></input>
                    <button onClick={this.handleClick} className="ui button input-button-margin-top" type="submit">Submit</button>
                </div>
            </div>
            </div>
        </React.Fragment>
      );
    }
  }
  
  export default ChangeLocation;