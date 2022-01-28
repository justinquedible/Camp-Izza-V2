import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import React from "react";
import { getAuth, User } from "firebase/auth";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "./Original_Logo.png";

const navBarStyle = { color: "black" };

export default function NavBar() {
  const [user, setUser] = React.useState<User | null>(null);
  const auth = getAuth();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

  const handleChangePassword = () => {
    window.location.href = "/#/updatePassword";
  };

  const handleSignOut = () => {
    window.location.href = "/#/login";
    auth.signOut();
    console.log("signed out");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img src={logo} alt={"Camp Izza Logo"} />
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
