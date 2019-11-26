import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import WelcomePage from './components/WelcomePage/WelcomePage';
import Homepage from './components/Homepage/Homepage';
import MyProfile from './containers/MyProfile/MyProfile';
import ClinicInfo from './components/WelcomePage/ClinicInfo/ClinicInfo';

class App extends React.Component {

  render(){

    return(
      <BrowserRouter>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/homepage" exact component={Homepage} />
        <Route path="/homepage/profile" exact component={MyProfile} />
        <Route path="/clinic-info" exact component={ClinicInfo} />
      </BrowserRouter>
    );
    
  }



}

export default App;
