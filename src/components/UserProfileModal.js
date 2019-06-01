import React from "react";

//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//registerModal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";

class UserLoginRegisterModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { nick: "" };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  saveProfileData = username => {
    if (username) {
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: username
        })
        .then(function() {
          alert("Po ponownym zalogowaniu nick zostanie zmieniony");
        })
        .catch(function(error) {
          // An error happened.
        });
    } else return;
  };

  render() {
    let posts = this.props.posts;
    console.log(posts);
    let postsList = posts
      .filter(post => post.username === this.props.username)
      .map((post, index) => (
        <Card>
          <Accordion.Toggle as={Button} variant="link" eventKey={post.id}>
            <strong>{post.title}</strong>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={post.id}>
            <Card.Body>
              {post.text}
              {post.ingredients.map(ingredient => (
                <ListGroup.Item>
                  {ingredient.amount} {ingredient.name}, Calories:{" "}
                  {ingredient.calories}
                </ListGroup.Item>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ));

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Change your username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new username"
                onChange={this.handleChange("nick")}
              />
            </Form.Group>
            <Accordion>{postsList}</Accordion>

            <Button
              variant="primary"
              onClick={() => {
                this.saveProfileData(this.state.nick);
                this.props.onHide();
              }}
              style={{ marginRight: "5px" }}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UserLoginRegisterModal;
