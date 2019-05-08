<<<<<<< HEAD
import React, { Component } from "react";
import "./App.css";
=======
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
>>>>>>> origin/master
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig.js";

//components
import Topbar from "./components/Topbar";

// components
import PostBoard from './components/PostBoard';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = { logged: false, username: "" };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  userLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.displayName);
        this.setState({ logged: true, username: user.displayName });
      } else {
        this.setState({ logged: false, username: null });
      }
    });
  };

  logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(this.setState({ logged: false, nick: null }));
  };

  render() {
    var posts = [
      {
        id: 1,
        title: 'Mój przepis na pierogi',
        text: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      },
      {
        id: 2,
        title: 'Mój przepis na gofry',
        text: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      },
      {
        id: 3,
        title: 'Mój przepis na beton',
        text: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      }
    ];
    return (
      <div className="App">
        <Topbar
          checkLogin={this.userLoggedIn}
          logged={this.state.logged}
          username={this.state.username}
          logout={this.logoutUser}
        />
         <PostBoard posts={posts}/>
      </div>
    );
  }
}

export default App;
