import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.js';

//components
import Topbar from './components/Topbar';

//components
import Topbar from './components/Topbar';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }


  render() {
    return (
      <div className="App">
       <Topbar></Topbar>
      </div>
    );
  }
}

export default App;
