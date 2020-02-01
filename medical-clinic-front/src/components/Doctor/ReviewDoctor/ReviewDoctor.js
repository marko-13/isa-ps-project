import React, { Component } from 'react';
import axios from '../../../axios.js';
import Button from '../../UI/Button/Button';


class ReviewDoctor extends Component {

  state = {
    doctors: [],
    doctor_id: null,
    rate_score: 0
  }

  send_doctor_review(evt){
    evt.preventDefault();
    console.log('Submit review button clicked');
    if (this.state.doctor_id === null){
      alert('Doctor must be selected');
      return;
    }
    else if(this.state.rate_score >5 || this.state.rate_score < 1){
      alert('Review score must be between 1 and 5');
      return;
    }

    const token = localStorage.getItem('token');
    console.log(this.state.rate_score);
    console.log(this.state.doctor_id);

    axios.post('doctor/reviewed/'+this.state.doctor_id+'/'+this.state.rate_score, {
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
        doctor_id:evt.target.value
      });
      // console.log(this.state.doctor_id)
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('/patient/review-doctors', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        console.log(res)
        this.setState({ doctors: res.data })
      })
      .catch(err => console.log(err));
  }

  render() {

    const doctors = this.state.doctors.map(doc => {
      return <option value={doc.id}>{doc.name + ' ' + doc.lastname}</option>;
    })

    return (
      <form class = "login-form-1">
        <h4>Review a doctor</h4>
        <div class="form-row">
          <div class="form-group">
            <select class="form-control" id="doctor_select" onChange={evt => this.updateSelectValue(evt)} value={this.state.doctor_id}>
              <option value="" selected disabled hidden>Choose a doctor</option>
              {doctors}
            </select>
          </div>
          <div class="form-group">
            <input style={{marginLeft:"35px"}} id="score_input" type="number"
              class="form-control" placeholder="Score(1-5)" min="1" max="5"
              value = {this.state.rate_score} onChange={evt => this.updateInputValue(evt)}/>
          </div>

          <div class="form-group">
            <Button style={{marginLeft:"55px", marginTop:"5px"}} click={evt => this.send_doctor_review(evt)}>Submit</Button>
          </div>

        </div>
      </form>
    );
  }
}

export default ReviewDoctor;
