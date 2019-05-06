import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//components
import Topbar from './components/Topbar';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Topbar></Topbar>
      </div>
    );
  }
}

export default App;
