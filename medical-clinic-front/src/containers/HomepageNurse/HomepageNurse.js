import React, { Component } from 'react';

class HomepageNurse extends Component {

	state = {
    firstName: "",
    lastName: ""
  }

  componentDidMount() {
  	
  }

  render() {
    return (
      <div className="container">
      	<h1>Hello nurse, {this.props.name} {this.props.lastname}</h1>
      	<a href='\#'>My profile</a><br/>
      	<a href='\#'>Work schedule</a><br/>
      	<a href='\#'>Validate prescriptions</a><br/>
      	<a href='\#'>List of patients</a><br/>
      	<a href='\#'>Ask for leave of absence</a><br/>
      </div>
    );
  }

}

export default HomepageNurse;