import React from "react";

//bootstrap
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

//registerModal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


class UserLoginRegisterModal extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {email:"", password:""};
  }

  register = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      alert("Coś poszło nie tak, spróbuj jeszcze raz!");
      console.log(error.message);
    });
  }

  login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      alert("Coś poszło nie tak, spróbuj jeszcze raz!");
      console.log(error.message);
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
          <Modal.Title id="contained-modal-title-vcenter">
            Zaloguj się lub zarejestruj!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adres e-mail</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange("email")}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handleChange("password")}/>
            </Form.Group>

            <Button variant="primary" onClick={() => {this.register(this.state.email, this.state.password); this.props.onHide();}} style={{marginRight: "5px"}}>
              Zarejestruj się
            </Button>
            
            <Button variant="primary" onClick={() => {this.login(this.state.email, this.state.password); this.props.onHide()}} style={{marginRight: "5px"}}>
              Zaloguj się
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
}

class Topbar extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => {this.setState({ modalShow: false });
                            this.props.checkLogin();};

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavbarBrand href="#home">GastroBlog</NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <NavLink onClick={() => this.setState({ modalShow: true })}>
              Rejestracja / Logowanie
            </NavLink>
            <NavLink href="#add">Dodaj post</NavLink>
          </Nav>
        </Navbar.Collapse>
        <UserLoginRegisterModal show={this.state.modalShow} onHide={modalClose}/>
      </Navbar>
    );
  }
}

export default Topbar;
