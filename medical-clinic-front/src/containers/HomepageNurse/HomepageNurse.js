import React, { Component } from 'react';
import axios from '../../axios';

class HomepageNurse extends Component {

	state = {
    firstName: "Marija",
    lastName: "Krstic"
  }

  componentDidMount() {
  	axios.get(`/user`).then(res => {
        const firstNameVar = res.data.results[0].firstName;
        const lastNameVar = res.data.results[0].lastName;
        this.setState({
        	firstName: firstNameVar,
        	lastName: lastNameVar
         });
      }).catch(err => {
                console.log(err);
                console.log("Some error");
       });
  }

  render() {
    return (
      <div className="container">
      	<h1>Hello {this.state.firstName} {this.state.lastName}</h1>
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