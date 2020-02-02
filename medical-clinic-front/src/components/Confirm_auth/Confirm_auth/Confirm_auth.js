import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../axios.js';
import queryString from 'query-string';
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom';


class Confirm_auth extends Component {

  state = {
    id_user: null,
    time1: null,
    broj: null,
  }

  componentDidMount(){
    console.log("Timestamp: " + this.state.time1);
    console.log("Id: " + this.state.id_user);
    console.log("Num:" + this.state.broj);
    console.log("Redirect: " + this.state.redir);

    axios.get('/patient/approvedemail/'+this.state.id_user+"/"+this.state.time1+"/"+this.state.broj, {
    }).then(response => {
        this.props.history.push('/');
    }).catch(err => console.log(err));

  }

  render(){

    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params['id']);

    this.state.id_user = params['id'];
    this.state.time1 = params['timestamp'];
    this.state.broj = params['broj'];

    return (
      <form class = "login-form-1">
        <h4>Approving account</h4>
      </form>
    );
  }


}

export default withRouter(Confirm_auth);
