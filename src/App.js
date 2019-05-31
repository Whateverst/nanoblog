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
    this.state = { logged: false, username: "", posts: [] };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    this.getPosts();
  }

  async getPosts() {
    const snapshot = await firebase
      .firestore()
      .collection("posts")
      .get();
    let data = snapshot.docs.map(function(doc) {
      let post = doc.data();
      post.id = doc.id;
      return post;
    });
    data.sort((a, b) => b.votes - a.votes);
    this.setState({ posts: data });
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
    const updatePosts = this.getPosts;
    return (
      <div className="App">
        <Topbar
          checkLogin={this.userLoggedIn}
          logged={this.state.logged}
          username={this.state.username}
          logout={this.logoutUser}
          updatePosts={updatePosts}
        />
        <PostBoard
          posts={this.state.posts}
          updatePosts={updatePosts}
          username={this.state.username}
          logged={this.state.logged}
        />
      </div>
    );
  }
}

export default App;
