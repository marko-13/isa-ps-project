import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from '../../../axios.js';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../UI/Button/Button.js';

class ShowClinics extends Component {

  state = {
    show_first: true,
    clinics: [],
    services: [],
    selected_service: null,
    selected_date: null,
    selected_score: null
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('/clinics/get', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        console.log(res)
        this.setState({ clinics: res.data})
      })
      .catch(err => console.log(err));

    // VRACA SVE SERVISE
    axios.get('service/getAllNotDeleted', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        console.log('DESI SE')
        console.log(res)
        this.setState({services : res.data})
      })
      .catch(err => console.log(err));
  }

//handle change in react date
  handleChange = date => {
        this.setState({
            selected_date: date,
        });
        console.log(date.getTime());
    };

//handle change in min selected_score
  handleInputChange = input_data => {
    console.log(input_data.target.value);
    this.setState({selected_score: input_data.target.value});
  };

//submit search
  submitSearch(evt) {
    evt.preventDefault();

    if(this.state.selected_service === null){
      alert('Service must be selected');
      return;
    }
    else if (this.state.selected_date === null){
      alert('Date must be selected');
      return;
    }
    else if (this.state.selected_score !== null && (this.state.selected_score > 5 || this.state.selected_score < 1)
            && this.state.selected_score !== '') {
        alert('Score must be between 1 and 5');
        return;
    }
    //AKO SVE PRODJE POSALJI NA PRETRAGU
    let pod_service_id = this.state.selected_service;
    let pod_date = this.state.selected_date;
    let pod_score = 0;
    if(this.state.selected_score !== null && this.state.selected_score !== ''){
      pod_score = this.state.selected_score;
    }

    this.setState({show_first: false});
    const token = localStorage.getItem('token');
    // axios.post('clinics/findCorrespondingClinics/' + pod_service_id + '/' + pod_date + '/' + pod_score, {
    //   headers: { 'Authorization': 'Bearer ' + token }
    // })
    //   .then(res => {
    //   })
    //   .catch(err => console.log(err));
};


  render() {
    // let clinic = this.state.clinics.map(clinic => {
    // });
    let content = null;

    const columns = [{
      id: 'name',
      Header: 'Name',
      accessor: d => d.name
    },
    {
      id: 'address',
      Header: 'Address',
      accessor: d => d.address
    }]

    const podaci = this.state.services.map(s => {
      return {
        id : s.id,
        price : s.price,
        serviceType : s.serviceType
      }
    })

    if(this.state.show_first){
      content = (
        <div class="container">
          <div class = "row">
            {/*OVO JE DIV ZA REACT TABLE SA LISTOM SVIH KLINIKA */}
            <div class = "col-sm-6 col-md-6 col-lg-6" style={{height: 'calc(100vh - 100px)', width: '50%'}}>
              {<ReactTable data={this.state.clinics}
                pageSize={(this.state.clinics.length > 10) ? 10 : this.state.clinics.length}
                columns={columns}
                filterable={true} />}
            </div>

            {/*OVO JE DIV ZA FORMU ZA PRETRAGU PO DATUMU I TIPU PREGLEDA i opciono lokacija klinike i ocena*/}
            <div class = "col-sm-6 col-md-6 col-lg-6" style={{height: 'calc(100vh - 100px)', width: '50%'}}>
              <form>
                {/*KALENDAR ZA ODABIR DATUMA KLINIKE*/}
                <div class = "form-group">
                  <h5>Select a service</h5>
                  <Typeahead id = "my_typeahead" placeholder="Choose a service..." onChange={(selected) => {
                      console.log(selected[0].id)
                      this.setState({selected_service : selected.id})
                    }}
                    labelKey={option => `${option.serviceType}`}
                    options = {podaci}
                  />
                </div>

                {/*OVO JE DIV ZA DATE PICKER*/}
                <div class = "form-group">
                  <h5>Select desired date for appointment</h5>
                  <DatePicker
                    class="form-control"
                    selected={this.state.selected_date}
                    onChange={this.handleChange}
                    dateFormat="dd-MMM-yyyy" />
                </div>

                {/*OVO JE DIV ZA MINIMALNU OCENU*/}
                <div class = "form-group">
                  <h5>Input min clinic score(optional)</h5>
                  <input type="number" class="form-control" onChange={this.handleInputChange} placeholder="Input min score..."/>
                </div>

                {/*BUTTON TO PERFORM SEARCH - SHOULD RETURN SELECT FOR DOCTORS AND TIMES*/}
                <Button type="green" click={evt => this.submitSearch(evt)}>Submit</Button>
              </form>
            </div>

          </div>
        </div>
      );
    }else {
      content = <h1>Nesto drugo</h1>;
    }


    return content;
  }
}

export default ShowClinics;
