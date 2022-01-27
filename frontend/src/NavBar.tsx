import React, {useState} from 'react';

import './NavBar.css';
import { Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// import '~rsuite/lib/styles/themes/default/index.less'; //The default style file.
// import 'custom-theme-navbar.less'; // Style customization.
import AuthService from './services/auth-service';
import logo from "./Original_Logo.png";
// @TODO The navbar down toggle is not fitting on screen

const navBarStyle = { color: 'black'};
let URL = 'http://localhost:3000';
export default function NavBarInstance() {

    // some code of authentication logic/service that result an isLoggedIn variable/state:
    let isLoggedIn = AuthService.isLoggedin();
    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await AuthService.logout();
        window.location.href="/#/login"
        window.location.reload();
    };

    if(isLoggedIn) {

        const currentUser = AuthService.currentUser();
        return (<Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <img src={logo} alt={'Camp Izza Logo'}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto nav-fill w-70">
                    <Nav.Link id="navbar-link" href="https://www.campizza.com/" style={ navBarStyle } >Home</Nav.Link>
                    <Nav.Link href="https://www.campizza.com/calendar" style={ navBarStyle }>Activities</Nav.Link>
                    <Nav.Link href="https://www.campizza.com/camp-fees" style={ navBarStyle } >Fees</Nav.Link>
                    <Nav.Link href="https://www.campizza.com/contact" style={navBarStyle}>Contact</Nav.Link>

                    <NavDropdown title={currentUser.firstName + " " + currentUser.lastName} id="basic-nav-dropdown">

                        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/#/login" onClick={handleClick} >Sign Out</NavDropdown.Item>

                    </NavDropdown>
                </Nav>

            </Navbar.Collapse>
        </Navbar>);

    } else {
        return (<Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <img src={logo} alt={'Camp Izza Logo'}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto nav-fill w-70">
                    <Nav.Link id="navbar-link" href="https://www.campizza.com/" style={ navBarStyle } >Home</Nav.Link>
                    <Nav.Link href="https://www.campizza.com/calendar" style={ navBarStyle }>Activities</Nav.Link>
                    <Nav.Link href="https://www.campizza.com/camp-fees" style={ navBarStyle } >Fees</Nav.Link>
                    <Nav.Link href="https://www.campizza.com/contact" style={navBarStyle}>Contact</Nav.Link>

                    <Nav.Link href="/#/Login" style={navBarStyle}>Log in</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>);
    }

}

