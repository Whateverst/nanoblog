import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.js';

//components
import Topbar from './components/Topbar';

class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {logged: false};
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  userLoggedIn = () => {
    this.setState({logged:true,})
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(email);
      } else {
      }
    });
  }

  render() {
    return (
      <div className="App">
       <Topbar checkLogin={this.userLoggedIn}></Topbar>
      </div>
    );
  }
}

export default App;
