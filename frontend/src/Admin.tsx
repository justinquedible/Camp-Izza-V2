// Page for Admin Dashboard

import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import campersIcon from "./assets/campers-icon.png";
import groupsIcon from "./assets/groups-icon.png";
import sessionsIcon from "./assets/sessions-icon.png";
import counselorsIcon from "./assets/counselors-icon.png";
import attendanceIcon from "./assets/attendance-icon.png";
import rosterIcon from "./assets/roster-icon.png";

export default function AdminDashboard() {
  return (
    <div className="Admin">
      <br />
      <Container className="Admin-Buttons">
        <h3> Admin Dashboard </h3>
        <br />
        <Row className="Admin-Buttons-rows">
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/manageCampers">
              <img src={campersIcon} alt="icon" />
              Campers
            </Button>
          </Col>
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/groups">
              <img src={groupsIcon} alt="icon" />
              Groupings
            </Button>
          </Col>
        </Row>
        <Row className="Admin-Buttons-rows">
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/sessions">
              <img src={sessionsIcon} alt="icon" />
              Sessions
            </Button>
          </Col>
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/manageCounselors">
              <img src={counselorsIcon} alt="icon" />
              Counselors
            </Button>
          </Col>
        </Row>
        <Row className="Admin-Buttons-rows">
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/attendance">
              <img src={attendanceIcon} alt="icon" />
              Counselor Attendance
            </Button>
          </Col>
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/roster">
              <img src={rosterIcon} alt="icon" />
              Roster
            </Button>
          </Col>
        </Row>
        <Row className="Admin-Buttons-rows">
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/admin/manageParents">
              <img src={groupsIcon} alt="icon" />
              Parents
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
