import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import WelcomePage from './components/WelcomePage/WelcomePage';
import Homepage from './components/Homepage/Homepage';
import MyProfile from './containers/MyProfile/MyProfile';
import ClinicInfo from './components/WelcomePage/ClinicInfo/ClinicInfo';
import Confirm_auth from './components/Confirm_auth/Confirm_auth/Confirm_auth'

class App extends React.Component {

  render(){

    return(
      <BrowserRouter>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/profile" exact component={MyProfile} />
        <Route path="/clinic-info" exact component={ClinicInfo} />
        <Route path="/confirm_auth" exact component={Confirm_auth} />
      </BrowserRouter>
    );

  }



}

export default App;
