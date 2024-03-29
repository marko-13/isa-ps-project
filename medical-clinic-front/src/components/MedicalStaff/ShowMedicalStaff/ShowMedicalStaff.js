import React, {Component} from 'react';
import axios from '../../../axios.js';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import jwt from 'jsonwebtoken';
import moment from 'moment';


class ShowMedicalStaff extends Component{

  state = {
    medicalStaff: []
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    axios.get('/patient/getMedicalStaffByPatient/' +     decodedToken.userId, {
      headers: {'Authorization': 'Bearer ' + token}
    } )
      .then(res => {
        console.log(res)
        this.setState({medicalStaff: res.data})
      })
      .catch(err => console.log(err));
  }

  render(){
    // let clinic = this.state.clinics.map(clinic => {
    // });
    const columns = [{
      id: 'name',
      Header: 'Name',
      accessor: d => d.firstName
    },
    {
      id: 'lastName',
      Header: 'Last name',
      accessor: d=> d.lastName
    },
    {
      id: 'email',
      Header: 'Email',
      accessor: d=> d.email
    }]

    return(
      <div className="col-sm-8 col-md-8 col-lg-8 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>

        <ReactTable data={this.state.medicalStaff}
        pageSize={(this.state.medicalStaff.length > 10) ? 10 : this.state.medicalStaff.length}
        columns={columns}
        filterable = {true}/>
      </div>
    );
  }
}

export default ShowMedicalStaff;
