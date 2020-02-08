import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from '../../../axios.js';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../UI/Button/Button.js';

class ShowDoctor extends Component {

  state = {
    show_first: true,
    doctors: [],
    services: [],
    selected_service: null,
    selected_date: null,
    selected_doc : null,
    // exam_time : null,
    //
    exam_time_hrs : 0,
    exam_time_mins : 0

  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('/doctor/getAll', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        console.log(res)
        this.setState({ doctors: res.data})
      })
      .catch(err => console.log(err));

    // VRACA SVE SERVISE
    // axios.get('service/getAllNotDeleted', {
    //   headers: { 'Authorization': 'Bearer ' + token }
    // })
    //   .then(res => {
    //     console.log('DESI SE')
    //     console.log(res)
    //     this.setState({services : res.data})
    //   })
    //   .catch(err => console.log(err));
  }



// when doctor is selected
selectDoctorHandler = (row) => {
      axios.post('/service/getAllFromDoctor/' + row.id)
          .then(response => {
              console.log('UDJE');
              console.log(response.data)
              this.setState({show_first: false});
              this.setState({services: response.data});
              this.setState({selected_doc: row.id});
          })
          .catch(err => alert('There are no services for selected doctor'));
  }

//handle change in react date
selectTimeHandler = date => {
      this.setState({
          selected_date: date.getTime()
      });
      this.setState({
          exam_time_hrs: date.getHours()
      });
      this.setState({
          exam_time_mins: date.getMinutes()
      });
            console.log(date.getTime());
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
    else if (this.selected_doc === null){
      alert('Doctor must be selected');
      return;
    }
    //AKO SVE PRODJE POSALJI NA PRETRAGU
    let pod_service_id = this.state.selected_service;
    let pod_date = +this.state.selected_date;
    let pod_doc = this.state.selected_doc;
    let pod_hours = this.state.exam_time_hrs;
    let pod_min = this.state.exam_time_mins;

    console.log('Servis: ' + pod_service_id);
    console.log('Vreme: ' + pod_date);
    console.log('Ocena: ' + pod_doc);
    // this.setState({show_first: false});
    const token = localStorage.getItem('token');
    axios.post('appointment/reserve/' + pod_date + '/' + pod_hours + '/' + pod_min + '/' + pod_doc + '/' + pod_service_id, {
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

    // Columns za inicijalnu tabelu doctors
    const columns = [{
      id: 'name',
      Header: 'Name',
      accessor: d => d.name
    },
    {
      id: 'lastname',
      Header: 'Last name',
      accessor: d => d.lastname
    },
    {
      id : 'score',
      Header : 'Score',
      accessor : f => Number((f.review / f.reviewCount).toFixed(2))
    },
    {
      Header: "",
      Cell: ({ original }) => (
          <center><Button type='green' click={() => this.selectDoctorHandler(original)}>Select</Button></center>),
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



    if(this.state.show_first){
      content = (
        <div className = "container">
          <div class = "row">
            {/*OVO JE DIV ZA REACT TABLE SA LISTOM SVIH KLINIKA */}
            <div class = "col-sm-12 col-md-12 col-lg-12" style={{height: 'calc(100vh - 100px)', width: '50%'}}>
              {<ReactTable data={this.state.doctors}
                pageSize={(this.state.doctors.length > 10) ? 10 : this.state.doctors.length}
                columns={columns}
                filterable={true} />}
            </div>
          </div>
        </div>
      );
    }


    else{
      content = (
        <div className="col-sm-8 col-md-8 col-lg-8 login-form-1" style={{marginBottom: '2.5%', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '2.5%'}}>

            {/*OVO JE DIV ZA FORMU ZA PRETRAGU PO DATUMU I TIPU PREGLEDA i opciono lokacija klinike i ocena*/}
            <div>
              <form>
                {/*TYPEAHEAD ZA ODABIR SERVISA*/}
                <div class = "form-group">
                  <h5>Select a service</h5>
                  <Typeahead id = "my_typeahead" placeholder="Choose a service..." onChange={(selected) => {
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
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="Time"
                    selected={this.state.selected_date}
                    onChange={this.selectTimeHandler}
                    dateFormat="dd-MMM-yyyy" />
                </div>


                {/*BUTTON TO PERFORM SEARCH - SHOULD RETURN SELECT FOR DOCTORS AND TIMES*/}
                <Button type="green" click={evt => this.submitSearch(evt)}>Submit</Button>
              </form>
            </div>

        </div>
      );
    }




    return content;
  }
}

export default ShowDoctor;
