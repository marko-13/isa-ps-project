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

    <p>Weight: {this.state.medicalHistory == null ? null : this.state.medicalHistory.weight}</p>
    );
  }
}

export default ShowMedicalHistory;
