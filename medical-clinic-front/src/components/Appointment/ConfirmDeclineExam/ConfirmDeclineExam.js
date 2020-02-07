import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../axios.js';
import queryString from 'query-string';
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom';


class ConfirmDeclineExam extends Component {

  state = {
    id_user: null,
    broj: null,
    app_id: null
  }

  componentDidMount(){
    console.log("Num:" + this.state.broj);
    console.log("App:" + this.state.app_id);

    axios.post('/patient/confirmexam/'+this.state.broj+"/"+this.state.app_id, {
    }).then(response => {
        this.props.history.push('/');
    }).catch(err =>{
      console.log(err);
      //err.data.status
      alert('Error occured')
    })
  }

  render(){

    let url = this.props.location.search;
    let params = queryString.parse(url);

    this.state.broj = params['val'];
    this.state.app_id = params['app'];

    return (
      <form class = "login-form-1">
        <h4>Processing</h4>
      </form>
    );
  }


}

export default withRouter(ConfirmDeclineExam);
