import React, { Component } from 'react';
import axios from '../../../axios.js';
import Button from '../../UI/Button/Button';

class ReviewClinic extends Component {

  state = {
    clinics: [],
    clinic_id: null
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('/patient/review-clinics', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        console.log(res)
        this.setState({ clinics: res.data })
      })
      .catch(err => console.log(err));
  }

  render() {

    const clinics = this.state.clinics.map(cli => {
      return <option>{cli.name}</option>;
    })

    return (
      <form>
        <h4>Review a clinic</h4>
        <div class="form-row">
          <div class="form-group">
            <select class="form-control" id="exampleFormControlSelect1">
              <option value="" selected disabled hidden>Choose a clinic</option>
              {clinics}
            </select>
          </div>
          <div class="form-group">
            <input style={{marginLeft:"35px"}} type="number" class="form-control" placeholder="Score(1-5)" min="1" max="5"/>
          </div>

          <div class="form-group">

          </div>

        </div>
      </form>
    );
  }
}

export default ReviewClinic;
