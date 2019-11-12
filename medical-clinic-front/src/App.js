import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import WelcomePage from './components/WelcomePage/WelcomePage';
import Homepage from './components/Homepage/Homepage';

class App extends React.Component {

  render(){

    return(
      <BrowserRouter>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/homepage" exact component={Homepage} />
      </BrowserRouter>
    );
    
  }



}

export default App;
