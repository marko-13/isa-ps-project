import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import WelcomePage from './components/WelcomePage/WelcomPage';

class App extends React.Component {

  render(){

    return(
      <BrowserRouter>
        <Route path="/" component={WelcomePage} />
      </BrowserRouter>
    );
    
  }



}

export default App;
