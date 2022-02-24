// Page for counselors to view their dashboard

import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import "./Dashboard.css";
import { getAuth } from "firebase/auth";
import axios from "axios";
import campersIcon from "./assets/campers-icon.png";
import counselorsIcon from "./assets/counselors-icon.png";
import attendanceIcon from "./assets/attendance-icon.png";
import groupsIcon from "./assets/groups-icon.png";

export default function CounselorDashboard() {
  const auth = getAuth();
  const [disableCounselor, setDisableCounselor] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        axios.get(process.env.REACT_APP_API + "api/counselors/getCounselor/" + user.uid).then((res) => {
          setDisableCounselor(!!!res.data.firstName);
        });
      }
    });
    return unsubscribe;
  }, [auth]);

  return (
    <Container className="Admin-Buttons">
      <br />
      <br />
      <h3> Counselor Dashboard </h3>
      <div className="Counselor-Buttons">
        <Col>
          <Button variant="outline-success" className="Admin-Button" href="/#/counselor/CounselorForm">
            <img src={counselorsIcon} alt="profile icon" />
            My Profile
          </Button>

          <Button
            variant="outline-success"
            className="Admin-Button"
            disabled={disableCounselor}
            href="/#/counselor/myAttendance"
          >
            <img src={attendanceIcon} alt="my attendance icon" />
            My Attendance
          </Button>

          <Button
            variant="outline-success"
            className="Admin-Button"
            disabled={disableCounselor}
            href="/#/counselor/takeAttendance"
          >
            <img src={campersIcon} alt="camper attendance icon" />
            Camper Attendance
          </Button>

          <Button
            variant="outline-success"
            className="Admin-Button"
            disabled={disableCounselor}
            // href="/#/counselorInfo"
          >
            <img src={groupsIcon} alt="groups icon" />
            Camper Groups
          </Button>
        </Col>
      </div>
      {disableCounselor && (
        <p style={{ textAlign: "center" }}>Please fill out your Profile to to complete your sign up process.</p>
      )}
    </Container>
  );
}
