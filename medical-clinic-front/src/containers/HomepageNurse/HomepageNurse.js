import React, { Component } from 'react';
import axios from '../../axios';

class HomepageNurse extends Component {

	state = {
    firstName: "",
    lastName: ""
  }

  componentDidMount() {
  	axios.get(`/users/allNurses`).then(res => {
  		console.log(res)
        const firstNameVar = res.data[0].firstName;
        const lastNameVar = res.data[0].lastName;
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