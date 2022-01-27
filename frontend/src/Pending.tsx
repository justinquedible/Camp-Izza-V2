// Page for counselors to see after they create an account and are waiting for approval

import React, {Component} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import './Dashboard.css';
import {Router, Switch, Route} from "react-router-dom";

import NavBarInstance from './NavBar';
import FooterInstance from './Footer'

export default class AdminDashboard extends React.Component {
    render() {
        return (
            <div className="Pending">
                <body>
                <br />
                <Container className="Admin-Buttons">
                <h3> Counselor Status: Pending </h3><br />
                <p className="center"> Your counselor account is currently under review by admin.
                Please return momentarily.</p>
                <p className="center"> For any questions or concerns, please contact Camp Izza at (949) 422-8123. </p>
                <br />
                <hr />
                </Container>
                </body>
            </div>
        );
    }

}
