import React, { Component } from 'react';
import './App.css';
import {   BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ticket from './components/Ticket';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">  
          <h1>Welcome to TBA</h1> 
          <br></br>
          <Route path="/ticket/:id" component={Ticket}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
