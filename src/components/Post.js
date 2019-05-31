import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Form, Button } from "react-bootstrap";
import * as firebase from "firebase/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };

  addComent = (postId, item) => {
    if (item.text) {
      let db = firebase.firestore();
      let posts = db.collection("posts");
      const post = posts.doc(postId);

      post
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            text: item.text,
            username: item.username
          })
        })
        .then(this.props.getPosts());
    } else alert("Comment cannot be empty");
  };

  upVotePost = (postId, currentVotes) => {
    let db = firebase.firestore();
    let posts = db.collection("posts");
    const post = posts.doc(postId);
    post
      .update({
        votes: currentVotes
      })
      .then(this.props.getPosts());
  };

  render() {
    let ingredients;
    if (this.props.post.ingredients.length !== 0) {
      ingredients = this.props.post.ingredients.map(function(
        ingredient,
        index
      ) {
        return (
          <ListGroup.Item key={index}>
            Nazwa: {ingredient.name}, Kalorie: {ingredient.calories}, Ilość:{" "}
            {ingredient.amount}
          </ListGroup.Item>
        );
      });
    } else {
      ingredients = <div />;
    }

    let comments;
    if (this.props.post.comments.length !== 0) {
      comments = this.props.post.comments.map(function(comment, index) {
        return (
          <ListGroup.Item key={index}>
            <span className="font-weight-bold">{comment.username}</span>:{" "}
            {comment.text}
          </ListGroup.Item>
        );
      });
    } else {
      comments = <div />;
    }

    return (
      <div style={{ borderBottom: "10px solid white" }}>
        <Card.Body style={{ width: "100vw" }}>
          <Card bg="light" style={{ width: "90vw" }}>
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Card.Title>{this.props.post.title}</Card.Title>
              <Button
                style={{ maxWidth: "50px" }}
                onClick={() =>
                  this.upVotePost(this.props.post.id, this.props.post.votes + 1)
                }
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "2%" }} />
                {this.props.post.votes}
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle />
              <Card.Text>{this.props.post.text}</Card.Text>
              <Card.Subtitle>Składniki</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">{ingredients}</ListGroup>
            <Card.Footer>
              Added by: <strong>{this.props.post.username} </strong>
            </Card.Footer>
          </Card>
          <Card style={{ width: "90vw" }}>
            <Card.Header>Komentarze</Card.Header>
            <ListGroup
              className="list-group-flush"
              style={{ maxHeight: "200px", overflow: "scroll" }}
            >
              {comments}
            </ListGroup>
            <Card.Body>
              <Form.Group controlId="text">
                <Form.Control
                  type="text"
                  placeholder="Add comment"
                  onChange={this.handleChange("comment")}
                />
              </Form.Group>
              <Button
                onClick={() =>
                  this.addComent(this.props.post.id, {
                    text: this.state.comment,
                    username: this.props.username
                  })
                }
              >
                Dodaj komentarz
              </Button>
            </Card.Body>
          </Card>
        </Card.Body>
      </div>
    );
  }
}

export default Post;
