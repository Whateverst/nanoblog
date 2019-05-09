import React from "react";

//bootstrap
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

//modals
import UserLoginRegisterModal from "./UserLoginRegisterModal";
import UserProfileModal from "./UserProfileModal";

class Topbar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      registerModalShow: false,
      profileModalShow: false,
      username: ""
    };
  }

  render() {
    let loginModalClose = signIn => {
      this.setState({ registerModalShow: false });
      if (signIn === true) this.props.checkLogin();
      else this.props.logout();
    };

    let profileModalClose = () => {
      this.setState({ profileModalShow: false }, () => {
        this.props.checkLogin();
      });
    };

    let profileButton;
    let signOutButton;

    if (this.props.logged) {
      profileButton = (
        <NavLink onClick={() => this.setState({ profileModalShow: true })}>
          {" "}
          {this.props.username}{" "}
        </NavLink>
      );
      signOutButton = (
        <NavLink onClick={this.props.logout}> Wyloguj się </NavLink>
      );
    } else {
      profileButton = (
        <NavLink onClick={() => this.setState({ registerModalShow: true })}>
          {" "}
          Rejestracja i logowanie
        </NavLink>
      );
      signOutButton = null;
    }

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <NavbarBrand href="#home">GastroBlog</NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            {profileButton}
            {signOutButton}
            <NavLink>Dodaj post</NavLink>
          </Nav>
        </Navbar.Collapse>

        <UserLoginRegisterModal
          show={this.state.registerModalShow}
          onHide={loginModalClose}
        />

        <UserProfileModal
          show={this.state.profileModalShow}
          onHide={profileModalClose}
        />
      </Navbar>
    );
  }
}

export default Topbar;
