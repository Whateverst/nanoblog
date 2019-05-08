import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.js';

// components
import PostBoard from './components/PostBoard';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }


  render() {
    return (
      <PostBoard/>
    );
  }
}

export default App;
