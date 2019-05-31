import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

//components
import Topbar from "./components/Topbar";

// components
import PostBoard from "./components/PostBoard";

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = { logged: false, username: "testowyusername", posts: [] };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    //this.downloadPosts();
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
    let posts = this.state.posts;
    return (
      <div className="App">
        <Topbar
          checkLogin={this.userLoggedIn}
          logged={this.state.logged}
          username={this.state.username}
          logout={this.logoutUser}
        />
        <PostBoard username={this.state.username} />
      </div>
    );
  }
}

export default App;
