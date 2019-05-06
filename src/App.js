import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.js';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo}  className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
