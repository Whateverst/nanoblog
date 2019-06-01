import React from "react";

//bootstrap
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

//modals
import UserLoginRegisterModal from "./UserLoginRegisterModal";
import UserProfileModal from "./UserProfileModal";
import AddPostModal from "./AddPostModal";

import '../style/css/home.css';
class Topbar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      registerModalShow: false,
      profileModalShow: false,
      addPostModalShow: false,
      username: ""
    };
  }

  addPostModalClose = () => {};

  render() {
    const updatePosts = this.props.updatePosts;
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

    let addPostModalClose = () => {
      this.setState({ addPostModalShow: false }, () => {
        // elo
      });
      updatePosts();
    };

    let profileButton;
    let signOutButton;
    let addPostButton;
    let posts = this.props.posts;

    if (this.props.logged) {
      profileButton = (
        <NavLink onClick={() => this.setState({ profileModalShow: true })}>
          {" "}
          {this.props.username}{" "}
        </NavLink>
      );
      signOutButton = (
        <NavLink onClick={this.props.logout}> Sign out </NavLink>
      );
    } else {
      profileButton = (
        <NavLink onClick={() => this.setState({ registerModalShow: true })}>
          {" "}
          Sign up / in
        </NavLink>
      );
      signOutButton = null;
    }

    if (this.props.logged) {
      addPostButton = (
        <NavLink onClick={() => this.setState({ addPostModalShow: true })}>
          Add recipe
        </NavLink>
      );
    }

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <NavbarBrand className="logo">GastroBlog</NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            {profileButton}
            {signOutButton}
            {addPostButton}
          </Nav>
        </Navbar.Collapse>

        <UserLoginRegisterModal
          show={this.state.registerModalShow}
          onHide={loginModalClose}
        />

        <UserProfileModal
          show={this.state.profileModalShow}
          onHide={profileModalClose}
          posts={posts}
          username={this.props.username}
        />

        <AddPostModal
          show={this.state.addPostModalShow}
          onHide={addPostModalClose}
          username={this.props.username}
        />
      </Navbar>
    );
  }
}

export default Topbar;
