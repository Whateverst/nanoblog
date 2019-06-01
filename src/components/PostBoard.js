import React from "react";
import * as firebase from "firebase/app";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Form, Button } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import '../style/css/post.css'

library.add(faPlus);
class PostBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comment: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  showComment = (id) => {
    this.id = id;
    let displayBtn  = document.getElementById(id);
    
    displayBtn.style.display === 'none' ? displayBtn.style.display = 'block' : displayBtn.style.display = 'none';
  }

  addComment = (postId, item) => {
    if (item.text && this.props.logged) {
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
        .then(this.props.updatePosts());
    } else alert("Your comment is empty or you are not logged in");
  };

  upVotePost = (postId, currentVotes) => {
    if (this.props.logged) {
      let db = firebase.firestore();
      let posts = db.collection("posts");
      const post = posts.doc(postId);
      post
        .update({
          votes: currentVotes
        })
        .then(this.props.updatePosts());
    } else alert("You must be logged in");
  };

  render() {
    const posts = this.props.posts;
    const username = this.props.username;
    const handleChange = this.handleChange;
    const addComment = this.addComment;
    const comment = this.state.comment;
    const upVotePost = this.upVotePost;
    const showComment = this.showComment;

    if (posts !== []) {
      var items = posts.map(function(post) {
        let ingredients;
        if (post.ingredients.length !== 0) {
          ingredients = post.ingredients.map(function(ingredient, index) {
            return (
              <ListGroup.Item key={index}>
                Name: {ingredient.name}, Calories: {ingredient.calories},
                Amount: {ingredient.amount}
              </ListGroup.Item>
            );
          });
        } else {
          ingredients = <div />;
        }

        let comments;
        if (post.comments.length !== 0) {
          comments = post.comments.map(function(comment, index) {
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
          <div>
            <Card.Body style={{ width: "100%" }}>
              <Card bg="light" style={{ width: "90vw" }}>
                <Card.Header
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Card.Title>{post.title}</Card.Title>
                  <Button
                    style={{ maxWidth: "50px" }}
                    onClick={() => upVotePost(post.id, post.votes + 1)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "2%" }}
                    />
                    {post.votes}
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle />
                  <Card.Text>{post.text}</Card.Text>
                  <Card.Subtitle>Ingredients</Card.Subtitle>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {ingredients}
                </ListGroup>
                <Card.Footer>
                  Added by: <strong>{post.username} </strong>
                  <div className="add_comment">
                    <Button 
                    className="showComments"
                    onClick={() => showComment(post.id)}>Show comments</Button>
                    </div>
                </Card.Footer>
              </Card>
              <Card id={post.id} className="cardComment" style={{ width: "90vw", display: 'none' }}>
                <Card.Header>Comments</Card.Header>
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
                      onChange={handleChange("comment")}
                    />
                  </Form.Group>
                  <Button
                    onClick={() =>
                      addComment(post.id, {
                        text: comment,
                        username: username
                      })
                    }
                  >
                    Add comment
                  </Button>
                </Card.Body>
              </Card>
            </Card.Body>
          </div>
        );
      });
      return <div className="post-board">{items}</div>;
    }
  }
}

export default PostBoard;
