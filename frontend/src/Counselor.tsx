// Page for counselors to view their dashboard

import "./Dashboard.css";
import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import LoadingIcon from "./components/LoadingIcon";
import axios from "axios";
import campersIcon from "./assets/campers-icon.png";
import counselorsIcon from "./assets/counselors-icon.png";
import attendanceIcon from "./assets/attendance-icon.png";
import groupsIcon from "./assets/groups-icon.png";

export default function CounselorDashboard() {
  const auth = getAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [disableCounselor, setDisableCounselor] = React.useState(true);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(true);
        await axios.get(process.env.REACT_APP_API + "api/counselors/getCounselor/" + user.uid).then((res) => {
          setDisableCounselor(!!!res.data.firstName || !res.data.approved || !res.data.active);
          if (!!!res.data.firstName) {
            setMessage("Please fill out your Profile to complete your sign up process.");
          } else if (!res.data.approved) {
            setMessage("Your account is pending approval from the admin.");
          } else if (!res.data.active) {
            setMessage("Your account has been archived by the admin.");
          }
        });
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <Container className="Admin-Buttons" style={{ maxWidth: 500 }}>
      <br />
      <br />
      <h3>Counselor Dashboard</h3>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <div className="Counselor-Buttons">
          <Col>
            <Button variant="outline-success" className="Admin-Button" href="/#/counselor/CounselorForm">
              <img src={counselorsIcon} alt="profile icon" />
              My Profile
            </Button>

            <Button
              variant="outline-success"
              className="Admin-Button"
              disabled={true} // change to `disabled={disableCounselor}` when page is finished developing
              // href="/#/counselor/myAttendance"
            >
              <img src={attendanceIcon} alt="my attendance icon" />
              My Attendance (In Development)
            </Button>

            <Button
              variant="outline-success"
              className="Admin-Button"
              disabled={true} // change to `disabled={disableCounselor}` when page is finished developing
              // href="/#/counselor/camperAttendance"
            >
              <img src={campersIcon} alt="camper attendance icon" />
              Camper Attendance (In Development)
            </Button>

            <Button
              variant="outline-success"
              className="Admin-Button"
              disabled={disableCounselor}
              href="/#/counselor/groups"
            >
              <img src={groupsIcon} alt="groups icon" />
              Camper Groups
            </Button>
          </Col>
          {disableCounselor && <p style={{ textAlign: "center" }}>{message}</p>}
        </div>
      )}
    </Container>
  );
}
