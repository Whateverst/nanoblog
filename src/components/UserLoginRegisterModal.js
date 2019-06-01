import React from "react";

//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//registerModal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class UserLoginRegisterModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      registerEmail: "",
      registerPassword: "",
      registerUsername: "",
      loginEmail: "",
      loginPassword: "",
      signUp: true,
      loginButtonColor: "secondary",
      registerButtonColor: "primary",
      googleButtonColor: "danger"
    };
  }

  register = (email, password, username) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        alert("Something went wrong, try again");
        console.log(error.message);
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user
          .updateProfile({
            displayName: username
          })
          .then(function() {})
          .catch(function(error) {
            // An error happened.
          });
      } else {
      }
    });
    firebase.auth().signOut();
  };

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        alert("Something went wrong, try again");
        console.log(error.message);
      });
  };

  loginWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then()
      .catch(function(err) {
        console.log(err);
      });
    this.props.onHide(true);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  showSignUp = () => {
    this.setState({
      signUp: true,
      registerButtonColor: "primary",
      loginButtonColor: "secondary"
    });
  };

  showSignIn = () => {
    this.setState({
      signUp: false,
      registerButtonColor: "secondary",
      loginButtonColor: "primary"
    });
  };

  showGoogleLogin = () => {
    this.setState({
      signUp: false,
      registerButtonColor: "secondary",
      loginButtonColor: "secondary",
      googleButtonColor: "primary"
    });
  };

  render() {
    let modalContent;

    if (this.state.signUp)
      //signUp content
      modalContent = (
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={this.handleChange("registerUsername")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter e-mail"
                  onChange={this.handleChange("registerEmail")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={this.handleChange("registerPassword")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  this.register(
                    this.state.registerEmail,
                    this.state.registerPassword,
                    this.state.registerUsername
                  );
                  this.props.onHide(false);
                }}
                style={{ marginRight: "5px" }}
              >
                Sign up
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      );
    //sign in content
    else
      modalContent = (
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleChange("loginEmail")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={this.handleChange("loginPassword")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  this.login(this.state.loginEmail, this.state.loginPassword);
                  this.props.onHide(true);
                }}
                style={{ marginRight: "5px" }}
              >
                Sign in
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      );

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Row>
            <Col>
              <Button
                variant={this.state.registerButtonColor}
                onClick={this.showSignUp}
              >
                <span style={{ fontSize: "smaller" }}>Register</span>
              </Button>
            </Col>
            <Col>
              <Button
                variant={this.state.loginButtonColor}
                onClick={this.showSignIn}
              >
                <span style={{ fontSize: "smaller" }}>Sign in</span>
              </Button>
            </Col>
            <Col>
              <Button
                variant={this.state.googleButtonColor}
                onClick={this.loginWithGoogle}
              >
                <span style={{ fontSize: "smaller" }}>Google</span>
              </Button>
            </Col>
          </Row>
        </Modal.Header>
        {modalContent}
      </Modal>
    );
  }
}

export default UserLoginRegisterModal;
