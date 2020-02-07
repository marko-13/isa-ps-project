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
    show_third: false,
    clinics: [],
    services: [],
    selected_service: null,
    selected_date: null,
    selected_score: null,
    exam_time : null,

    clinics_for_selected_date_and_service: [],
    doctors_for_selected_clinic : [],
    exam_time_hrs : null,
    exam_time_mins : null,
    doc_selected : null,

    // kad klikne na fast appointments dugme klinike prikazi formu
    show_fast_appointments : false,
    list_fast_appointemnts : []
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
            selected_date: date.getTime()
        });
        console.log(date.getTime());
    };

//handle change in react time
  handleChangeTime = date => {
    this.setState({exam_time_hrs: date.getHours()});
    this.setState({exam_time_mins: date.getMinutes()});
    this.setState({exam_time: date});
    console.log(date);
  }

//handle change in min selected_score
  handleInputChange = input_data => {
    console.log(input_data.target.value);
    this.setState({selected_score: input_data.target.value});
  };

//select clinic halnder
selectClinicHandler = (row) => {
    axios.get('/doctor/getAllAvailableForExam/' + row.id + '/' + this.state.selected_date + '/' + this.state.selected_service)
        .then(response => {
            console.log('UDJE');
            console.log(response.data)
            this.setState({show_third: true});
            this.setState({doctors_for_selected_clinic: response.data});
        })
        .catch(err => alert('There are no available doctors'));
}


//select fast clinic halnder
selectClinicFastHandler = (row) => {
    axios.get('/appointment/getAllFastForClinic/' + row.id)
        .then(response => {
            console.log('UDJE U GET FAST APPOINTMENTS FOR CLINIC');
            console.log(response.data)
            this.setState({show_fast_appointments : true});
            this.setState({list_fast_appointemnts: response.data});
        })
        .catch(err => alert('There are no available fast exams for selected clinic: ' + row.name));
}

// selectFastExamHandler
selectFastExamHandler = (row) => {
    axios.post('/appointment/reserveFast/' + row.id)
        .then(response => {
            console.log('UDJE U RESERVE FAST APPOINTMENTS');
            alert('Appointment scheduled');
            //this.setState({show_fast_appointments : true});
            this.props.history.push('/homepage');
        })
        .catch(err => alert('Something went wrong, please try again' + row.id));
}


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
    let pod_date = +this.state.selected_date;
    let pod_score = 0;
    if(this.state.selected_score !== null && this.state.selected_score !== ''){
      pod_score = this.state.selected_score;
    }

    console.log('Servis: ' + pod_service_id);
    console.log('Vreme: ' + pod_date);
    console.log('Ocena: ' + pod_score);
    // this.setState({show_first: false});
    const token = localStorage.getItem('token');
    axios.post('clinics/findCorrespondingClinics/' + pod_service_id + '/' + pod_date + '/' + pod_score, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        console.log(res.data);
        this.setState({show_first: false});
        this.setState({clinics_for_selected_date_and_service: res.data})

      })
      .catch(err => {
        console.log(err);
        alert('Nothing matches your search');
      });
};


//submit reservation
submitReservation(evt) {
    evt.preventDefault();

    if(this.state.exam_time_hrs === null){
      alert('Time must be selected');
      return;
    }
    else if (this.state.exam_time_mins === null){
      alert('Date must be selected');
      return;
    }
    else if (this.state.doc_selected === null) {
        alert('Doctor must be selected');
        return;
    }

    //AKO SVE PRODJE POSALJI NA PRETRAGU
    let pod_time_hrs = this.state.exam_time_hrs;
    let pod_time_mins = this.state.exam_time_mins;
    let pod_doc_id = this.state.doc_selected;


    console.log('Sati: ' + pod_time_hrs);
    console.log('Minuti: ' + pod_time_mins);
    console.log('Doktor id: ' + pod_doc_id);

    const token = localStorage.getItem('token');
    axios.post('appointment/reserve/'+ this.state.selected_date + '/' + pod_time_hrs + '/' + pod_time_mins + '/' + pod_doc_id + '/' + this.state.selected_service, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        alert('Appointment requested. Please wait for confirmation email');
        this.props.history.push('/homepage');
      })
      .catch(err => {
        console.log(err);
        alert('Doctor is busy for selected time, select another time and try again');
      });
};


  render() {
    // let clinic = this.state.clinics.map(clinic => {
    // });
    let content = null;

    // Columns za inicijalnu tabelu klinika
    const columns = [{
      id: 'name',
      Header: 'Name',
      accessor: d => d.name
    },
    {
      id: 'address',
      Header: 'Address',
      accessor: d => d.address
    },
    {
      Header: "",
      Cell: ({ original }) => (
          <center><Button type='green' click={() => this.selectClinicFastHandler(original)}>Fast exams</Button></center>),
      filterable: false,
      sortable: false
    }]
    // Podaci o svim servisima u klinickom centru
    const podaci = this.state.services.map(s => {
      return {
        id : s.id,
        price : s.price,
        serviceType : s.serviceType
      }
    })
    //POdaci o svim doktorima
    const podaci_doc = this.state.doctors_for_selected_clinic.map(s => {
      return {
        id : s.id,
        name : s.name,
        lastname : s.lastname
      }
    })

    // Columns za tabelu svih fast appointmentsa odabrane klinike
    const columns_fast_appointemnt = [{
        id : 'date',
        Header : 'Date',
        accessor : r => r.date
      },
      {
        id : 'room',
        Header : 'Room',
        accessor : r => r.operationRoom
      },
      {
        id : 'doctor',
        Header : 'Doctor',
        accessor : r => r.doctor
      },
      {
        id : 'service',
        Header : 'Service',
        accessor : r => r.service
      },
      {
        id : 'price',
        Header : 'Price',
        accessor : r => r.price
      },
      {
        id : 'discount',
        Header : 'Discount',
        accessor : r => r.discount

      },
      {
        Header: "",
        Cell: ({ original }) => (
            <center><Button type='green' click={() => this.selectFastExamHandler(original)}>Schedule</Button></center>),
        filterable: false,
        sortable: false
      }]

    // Columns za tabelu svih klinika gde ima mesta za pregled
    const columns_1 = [{
      id : 'name',
      Header : 'Name',
      accessor : f => f.name
    },
    {
      id : 'address',
      Header : 'Address',
      accessor : f => f.address
    },
    {
      id : 'score',
      Header : 'Score',
      accessor : f => Number((f.review / f.reviewCount).toFixed(2))
    },
    {
      id : 'price',
      Header : 'Price',
      accessor : f => f.service_price
    },
    {
      Header: "",
      Cell: ({ original }) => (
          <center><Button type='green' click={() => this.selectClinicHandler(original)}>Select</Button></center>),
      filterable: false,
      sortable: false
    }]
    // if (this.state.clinics_for_selected_date_and_service !== undefined || this.state.clinics_for_selected_date_and_service !== null){
    //   const podaci1 = this.state.clinics_for_selected_date_and_service.map(s => {
    //     return {
    //       id : s.id,
    //       name : s.name,
    //       address : s.address,
    //       price : s.service_price,
    //       score : s.review / s.reviewCount,
    //     }
    //   })
    // }


    if(this.state.show_first && this.state.show_fast_appointments === false){
      content = (
        <div class="container">
          <div class = "row">
            {/*OVO JE DIV ZA REACT TABLE SA LISTOM SVIH KLINIKA */}
            <div id="inspect_clinics_allClinics_table" class = "col-sm-7 col-md-7 col-lg-7" style={{height: 'calc(100vh - 100px)', width: '50%'}}>
              {<ReactTable data={this.state.clinics}
                pageSize={(this.state.clinics.length > 10) ? 10 : this.state.clinics.length}
                columns={columns}
                filterable={true} />}
            </div>

            {/*OVO JE DIV ZA FORMU ZA PRETRAGU PO DATUMU I TIPU PREGLEDA i opciono lokacija klinike i ocena*/}
            <div id='inspect_clinics_appointment_form' class = "col-sm-5 col-md-5 col-lg-5" style={{height: 'calc(100vh - 100px)', width: '50%'}}>
              <form>
                {/*TYPEAHEAD ZA ODABIR SERVISA*/}
                <div class = "form-group">
                  <h5>Select a service</h5>
                  <Typeahead id = "patient_typeahed_service" placeholder="Choose a service..." onChange={(selected) => {
                      if(selected[0] !== null && selected[0] !== undefined){
                        console.log(selected[0].id)
                        this.setState({selected_service : selected[0].id})
                      }
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
    }
    if(this.state.show_first===false && this.state.show_third ===false && this.state.show_fast_appointments === false) {
      content = (
      <div class="container">
        <h1>Select a clinic</h1>
        <div class = "row">
          {/*OVO JE DIV ZA REACT TABLE SA LISTOM SVIH KLINIKA */}
          <div class = "col-sm-12 col-md-12 col-lg-12" style={{height: 'calc(100vh - 100px)', width: '100%'}}>
            {<ReactTable data={this.state.clinics_for_selected_date_and_service}
              pageSize={(this.state.clinics_for_selected_date_and_service.length > 10) ? 10 : this.state.clinics_for_selected_date_and_service.length}
              columns={columns_1}
              filterable={true} />}
          </div>
        </div>
      </div>
      );
    }

    if(this.state.show_third === true && this.state.show_fast_appointments === false){
      content = (
        <form className = "login-form-1" style={{height: 'calc(45vh - 100px)', width: '100%'}}>
          <h3>Select examination doctor and time</h3>

          <div className = "form-row" style={{margin : 'auto'}}>

              {/*SELECT EXAMINATION TIME*/}
              <div className = "form-group col-md-6">
                <h5>Select time</h5>
                <DatePicker selected={this.state.exam_time} onChange={this.handleChangeTime}
                showTimeSelect showTimeSelectOnly timeIntervals={30} timeCaption="Time"
                dateFormat="h:mm aa" placeholderText="Select time"/>
              </div>

              {/*TYPEAHEAD ZA DOKTORE*/}
              <div className = "form-group col-md-6">
                <h5>Select a doctor</h5>
                <Typeahead style = {{width : '80%'}} id = "doc_typeahead" placeholder="Choose a doctor..." onChange={(selected) => {
                  if(selected[0] !== null && selected[0] !== undefined){
                    console.log(selected[0].id)
                    this.setState({doc_selected : selected[0].id})
                  }
                }}
                labelKey={option => `${option.name} ${option.lastname}`}
                options = {podaci_doc}
              />
              </div>
          </div>

          {/*BUTTON TO PERFORM RESERVATION*/}
          <Button type="green" style = {{}} click={evt => this.submitReservation(evt)}>Reserve</Button>
        </form>
      );
    }

    if(this.state.show_fast_appointments === true){
      content = (
        <div class="container">
          <h1>Choose an appointment</h1>
          <div class = "row">
            {/*OVO JE DIV ZA REACT TABLE SA LISTOM SVIH BRZIH PREGLEDA ODABRANE KLINIKE */}
            <div class = "col-sm-12 col-md-12 col-lg-12" style={{height: 'calc(100vh - 100px)', width: '100%'}}>
              {<ReactTable data={this.state.list_fast_appointemnts}
                pageSize={(this.state.list_fast_appointemnts.length > 10) ? 10 : this.state.list_fast_appointemnts.length}
                columns={columns_fast_appointemnt}
                filterable={true} />}
            </div>
          </div>
        </div>
      );
    }


    return content;
  }
}

export default ShowClinics;
