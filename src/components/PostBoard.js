import React, { Component } from "react";
import Post from "./Post";
import * as firebase from "firebase/app";

class PostBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentWillMount() {
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

  render() {
    const posts = this.state.posts;
    const username = this.props.username;
    const getPosts = this.getPosts;
    if (posts !== []) {
      var items = posts.map(function(post) {
        return (
          <Post
            post={post}
            key={post.id}
            username={username}
            getPosts={getPosts}
          />
        );
      });
      return <div className="post-board">{items}</div>;
    }
  }
}

export default PostBoard;
