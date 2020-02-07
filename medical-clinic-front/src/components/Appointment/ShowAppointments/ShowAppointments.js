import React, {Component} from 'react';
import axios from '../../../axios.js';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import jwt from 'jsonwebtoken';
import moment from 'moment';


class ShowAppointments extends Component{

  state = {
    appointments: []
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    axios.get('/appointment/getAllByPatient/' +     decodedToken.userId, {
      headers: {'Authorization': 'Bearer ' + token}
    } )
      .then(res => {
        console.log(res)
        this.setState({appointments: res.data})
      })
      .catch(err => console.log(err));
  }

  render(){
    // let clinic = this.state.clinics.map(clinic => {
    // });
    const columns = [{
      Header: 'List of appointments',
      columns:[{
          id: 'type',
          Header: 'Type',
          accessor: d => d.type
        },
        {
         id: 'clinic',
          Header: 'Clinic',
          accessor: d=> d.clinic
        },
        {
          id: 'date',
          Header: 'Date:',
          accessor: d => {return moment(d.date).format("DD-MM-YYYY");}
        },
        {
          id: 'duration',
          Header: 'Duration',
          accessor: d => d.duration
        },
        {
          id: 'service',
          Header: 'Service',
          accessor: d => d.service,
          width: 175
        },
        {
          id: 'operation_room',
          Header: 'Operation room',
          accessor: d => d.operationRoom,
          width: 150
        }]
    }];

    return(
      <div className="col-md-7 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
        <ReactTable data={this.state.appointments}
        pageSize={(this.state.appointments.length > 10) ? 10 : this.state.appointments.length}
        columns={columns}
        filterable = {true}/>
      </div>
    );
  }
}

export default ShowAppointments;
