import React, { Component } from 'react';
import axios from '../../../axios.js';
import Button from '../../UI/Button/Button';

class ReviewClinic extends Component {

  state = {
    clinics: [],
    clinic_id: null,
    rate_score: 0
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

  send_clinic_review(evt){
    evt.preventDefault();
    console.log('Submit review button clicked');
    if (this.state.clinic_id === null){
      alert('Clinic must be selected');
      return;
    }
    else if(this.state.rate_score >5 || this.state.rate_score < 1){
      alert('Review score must be between 1 and 5');
      return;
    }

    const token = localStorage.getItem('token');
    console.log(this.state.rate_score);
    console.log(this.state.doctor_id);

    axios.post('clinics/reviewed/'+this.state.clinic_id+'/'+this.state.rate_score, {
      headers: {'Authorization' : 'Bearer' + token}
    });
  }

  updateInputValue(evt){
      this.setState({
        rate_score:evt.target.value
      });
      // console.log(this.state.rate_score)
  }

  updateSelectValue(evt){
      this.setState({
        clinic_id:evt.target.value
      });
      // console.log(this.state.clinic_id)
  }
  render() {

    const clinics = this.state.clinics.map(cli => {
      return <option value={cli.id}>{cli.name}</option>;
    })

    return (
      <form class = "login-form-1">
        <h4>Review a clinic</h4>
        <div class="form-row">
          <div class="form-group">
            <select class="form-control" id="clinic_select" onChange={evt => this.updateSelectValue(evt)} value={this.state.clinic_id}>
              <option value="" selected disabled hidden>Choose a clinic</option>
              {clinics}
            </select>
          </div>
          <div class="form-group">
            <input style={{marginLeft:"35px"}} id="score_input" type="number"
              class="form-control" placeholder="Score(1-5)" min="1" max="5"
              value = {this.state.rate_score} onChange={evt => this.updateInputValue(evt)}/>
          </div>

          <div class="form-group">
            <Button style={{marginLeft:"55px", marginTop:"5px"}} click={evt => this.send_clinic_review(evt)}>Submit</Button>
          </div>

        </div>
      </form>
    );
  }
}

export default ReviewClinic;
