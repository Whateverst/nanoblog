import React from "react";

//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//registerModal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class UserLoginRegisterModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { nick: "" };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  saveProfileData = username => {
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
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Ustaw swój nick</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nick"
                onChange={this.handleChange("nick")}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => {
                this.saveProfileData(this.state.nick);
                this.props.onHide();
              }}
              style={{ marginRight: "5px" }}
            >
              Zapisz
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UserLoginRegisterModal;
