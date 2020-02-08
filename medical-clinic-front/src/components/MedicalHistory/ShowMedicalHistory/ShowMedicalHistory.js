import React, {Component} from 'react';
import axios from '../../../axios.js';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class ShowMedicalHistory extends Component{

  state = {
    medicalHistory: null
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    axios.get('/medicalHistory/getMedicalHistory', {
      headers: {'Authorization': 'Bearer ' + token}
    } )
      .then(res => {
        console.log('dasdsadasdsa');
        console.log(res)
        this.setState({medicalHistory: res.data})
      })
      .catch(err => console.log(err));
  }

  render(){
    console.log(this.state.medicalHistory)
    return(
      <div className="col-sm-8 col-md-8 col-lg-8 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>
      <h3>Medical history:</h3>
      <p>Weight: {this.state.medicalHistory == null ? null : this.state.medicalHistory.weight}</p>
      <p>Height: {this.state.medicalHistory == null ? null : this.state.medicalHistory.height}</p>
      <p>Dioptre: {this.state.medicalHistory == null ? null : this.state.medicalHistory.dioptre}</p>
      <p>Allergies: {this.state.medicalHistory == null ? null : this.state.medicalHistory.allergies}</p>
    </div>

    );
  }
}

export default ShowMedicalHistory;
