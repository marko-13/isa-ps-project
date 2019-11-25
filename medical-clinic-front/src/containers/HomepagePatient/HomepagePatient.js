import React, { Component } from 'react';

class HomepagePatient extends Component {

	state = {
    firstName: "",
    lastName: ""
  }

  componentDidMount() {

  }

  render() {
    return (
      // <div className="container">
      // 	<h1>Hello nurse, {this.props.name} {this.props.lastname}</h1>
      // 	<a href='\#'>My profile</a><br/>
      // 	<a href='\#'>Work schedule</a><br/>
      // 	<a href='\#'>Validate prescriptions</a><br/>
      // 	<a href='\#'>List of patients</a><br/>
      // 	<a href='\#'>Ask for leave of absence</a><br/>
      // </div>
      <div>

        <div className="card mb-3" style={{maxWidth: '540px'}}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="../../assets/images/Patient_icon.png" className="card-img" alt="Patient icon"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{this.props.name} {this.props.lastname}</h5>
                <p className="card-text">Patient in medical center</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-deck">

          <div className="card" style={{width: '17rem', maxWidth: '20rem', minWidth: '13rem'}}>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>

          <div className="card" style={{width: '17rem', maxWidth: '20rem', minWidth: '13rem'}}>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>

          <div className="card" style={{width: '17rem', maxWidth: '20rem', minWidth: '13rem'}}>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>

      </div>


        </div>


    );
  }

}

export default HomepagePatient;
