// Page for parents to view their children that they registered to be campers

import React, {Component, useState} from 'react';
import {ToggleButtonGroup, ToggleButton,ButtonGroup,Button, CardDeck,Card,Container, Row, Col} from 'react-bootstrap';
import './Dashboard.css';
import {Router, Switch, Route} from "react-router-dom";

import NavBarInstance from './NavBar';
import FooterInstance from './Footer';
import campersIcon from './AdminIcons/campers-icon.png';
import homeIcon from './AdminIcons/home-icon.png';
import Campers from './Campers'
import AuthService from "./services/auth-service";

const ParentDashboard = () => {
    const currentUser = AuthService.currentUser();
    console.log(currentUser);

    const handleCamperForm = async (e: {preventDefault: () => void; }) => {
        const currentUser = AuthService.currentUser();
        localStorage.setItem("currentChild", "")
        window.location.href="#/CamperForm"
    }

    return (
        <div className="Parent">
            <body>
            <br />
            <Container className="Admin-Buttons">
                <Button variant="primary" className="householdProfileButton" href="/#/householdform"> Household Profile </Button>
                <br /><br /><br />
                <h3> Parent Dashboard </h3>
                <div className="row">
                    <div className="col text-center">
                        <br /> {currentUser.firstName.slice(0,1).toUpperCase() + currentUser.firstName.slice(1)}'s Campers <br /><br />
                        <Campers/>
                        <br/>
                        <Button variant="outline-success" className="Add-Camper" onClick={handleCamperForm}>
                            + Add New Camper
                        </Button>
                    </div>
                </div>
            </Container>
            </body>
        </div>
    );


}

export default ParentDashboard;