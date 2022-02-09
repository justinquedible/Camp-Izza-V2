// Page for counselors to view their dashboard

import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import campersIcon from "./AdminIcons/campers-icon.png";
import counselorsIcon from "./AdminIcons/counselors-icon.png";
import attendanceIcon from "./AdminIcons/attendance-icon.png";
import groupsIcon from "./AdminIcons/groups-icon.png";


export default function CounselorDashboard() {
  const auth = getAuth();
  const history = useHistory();
  const [disableCounselor, setDisableCounselor] = React.useState(true);


  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        axios.get(process.env.REACT_APP_API + "api/counselors/getCounselor/" + user.uid).then((res) => {
          console.log(res.data);
          setDisableCounselor(!!!res.data);
          console.log(disableCounselor);
          // axios.get(process.env.REACT_APP_API + "api/campers/getCampersByParentID/" + user.uid).then((res) => {
            // console.log(res.data);
            // setCampers(res.data);
          // });
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
            <Button variant="outline-success" className="Admin-Button" href="/#/CounselorForm">
              <img src={counselorsIcon} />
              My Profile
            </Button>

            <Button variant="outline-success" className="Admin-Button" disabled={disableCounselor} href="/#/counselor/myAttendance">
              <img src={attendanceIcon} />
              My Attendance
            </Button>

            <Button variant="outline-success" className="Admin-Button" disabled={disableCounselor} href="/#/counselor/takeAttendance">
              <img src={campersIcon} />
              Camper Attendance
            </Button>

            <Button variant="outline-success" className="Admin-Button" disabled={disableCounselor}
              // href="/#/counselorInfo"
            >
              <img src={groupsIcon} />
              Camper Groups
            </Button>
          </Col>
          
        </div>
        {disableCounselor && <p style={{ textAlign: "center" }}>Please fill out your Profile to to complete your sign up process.</p>}
      </Container>
  );
};

