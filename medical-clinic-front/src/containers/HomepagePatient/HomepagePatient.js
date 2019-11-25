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
              <p className="card-text">Shows a list of all existing clinics in clinical senter</p>
              <a href="#" className="btn btn-primary">Inspect clinics</a>
            </div>
          </div>

          <div className="card" style={{width: '17rem', maxWidth: '20rem', minWidth: '13rem'}}>
            <div className="card-body">
              <p className="card-text">Shows a list of every medical staff member, nurses and doctors</p>
              <a href="#" className="btn btn-primary">Inspect medical staff</a>
            </div>
          </div>

          <div className="card" style={{width: '17rem', maxWidth: '20rem', minWidth: '13rem'}}>
            <div className="card-body">
              <p className="card-text">Shows a list of patients medical history</p>
              <a href="#" className="btn btn-primary">Inspect medical history</a>
            </div>
          </div>

          <div className="card" style={{width: '17rem', maxWidth: '20rem', minWidth: '13rem'}}>
            <div className="card-body">
              <p className="card-text">Shows a list of patients upcoming and past appointments</p>
              <a href="#" className="btn btn-primary">Inspect appointments</a>
            </div>
          </div>
        </div>

        <div>
          <p></p>
          <br/>
          <br/>
          <p>OVDE CE  ICI CONTENT SVIH KLIKOVA</p>
        </div>

      </div>


    );
  }

}

export default HomepagePatient;
