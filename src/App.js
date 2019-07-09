import React, { Component } from 'react';
import './App.css';
import Ticket from './components/Ticket';

class App extends Component {
  render() {
    return (
      <div className="App">    
        <Ticket id="A1b2C3d4E5f6" />
      </div>
    );
  }
}

export default App;
