import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import React from "react";
import { getAuth, User } from "firebase/auth";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "./assets/logo.png";

const navBarStyle = { color: "black" };

export default function NavBar() {
  const auth = getAuth();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const screensWithoutLogin = ["", "login", "signupParent", "signupCounselor", "resetPassword", "resetConfirmation"];
    const redirectToLogin = () => {
      // console.log("function running");
      const pathName = window.location.href.split("/#/")[1];
      if (!screensWithoutLogin.includes(pathName)) {
        window.location.href = "/#/login";
      }
    };
    const interval = setInterval(redirectToLogin, 1000);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        clearInterval(interval);
        setUser(user);
      }
    });

    return unsubscribe;
  }, [auth]);

  const handleChangePassword = () => {
    window.location.href = "/#/updatePassword";
  };

  const handleSignOut = async () => {
    window.location.href = "/#/login";
    await auth.signOut();
    window.location.reload();
    console.log("signed out");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#/login">
        <img src={logo} alt={"Camp Izza Logo"} height="75" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto nav-fill w-70">
          <Nav.Link id="navbar-link" href="https://www.campizza.com/" style={navBarStyle}>
            Home
          </Nav.Link>
          <Nav.Link href="https://www.campizza.com/activities" style={navBarStyle}>
            Activities
          </Nav.Link>
          <Nav.Link href="https://www.campizza.com/about-us" style={navBarStyle}>
            About Us
          </Nav.Link>
          <Nav.Link href="https://www.campizza.com/faq" style={navBarStyle}>
            FAQ
          </Nav.Link>
          <Nav.Link href="https://www.campizza.com/contact" style={navBarStyle}>
            Contact
          </Nav.Link>
          {user ? (
            <NavDropdown title={user.email} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleChangePassword}>Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="/#/login" style={navBarStyle}>
              Log in
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
