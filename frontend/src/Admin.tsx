// Page for Admin Dashboard

import React, {Component} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import './Dashboard.css';
import {Router, Switch, Route} from "react-router-dom";
import AuthService from './services/auth-service';

import NavBarInstance from './NavBar';
import FooterInstance from './Footer'
import campersIcon from './AdminIcons/campers-icon.png';
import groupsIcon from './AdminIcons/groups-icon.png';
import sessionsIcon from './AdminIcons/sessions-icon.png';
import counselorsIcon from './AdminIcons/counselors-icon.png';
import attendanceIcon from './AdminIcons/attendance-icon.png';
import rosterIcon from './AdminIcons/roster-icon.png';

const AdminDashboard: React.FC = () =>  {

        return (
            <div className="Admin">
                <body>
                <br />
                <Container className="Admin-Buttons">
                <h3> Admin Dashboard </h3><br />
                <Row className="Admin-Buttons-rows">
                    <Col>
                        <Button variant="outline-success" className="Admin-Button" href="/#/admin/managecampers">
                            <img src={campersIcon}/>
                            Campers
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="outline-success" className="Admin-Button" href="/#/admin/groups">
                            <img src={groupsIcon}/>
                            Groupings
                        </Button>
                    </Col>
                </Row>
                    <Row className="Admin-Buttons-rows">
                        <Col>
                            <Button variant="outline-success" className="Admin-Button" href="/#/admin/sessions">
                                <img src={sessionsIcon}/>
                                Sessions
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success" className="Admin-Button" href="/#/admin/managecounselors">
                                <img src={counselorsIcon}/>
                                Counselors
                            </Button>
                        </Col>
                    </Row>
                    <Row className="Admin-Buttons-rows">
                        <Col>
                            <Button variant="outline-success" className="Admin-Button" href="/#/admin/attendance">
                                <img src={attendanceIcon}/>
                                Attendance
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success" className="Admin-Button" href="/#/admin/roster">
                                <img src={rosterIcon}/>
                                Roster
                            </Button>
                        </Col>
                    </Row>
                </Container>
                </body>
            </div>
        );


}

export default AdminDashboard;
