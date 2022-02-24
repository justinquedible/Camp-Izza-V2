import "./Dashboard.css";
import React from "react";
import { Button, Container, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth, User } from "firebase/auth";
import axios from "axios";
import campersIcon from "./assets/campers-icon.png";
import counselorsIcon from "./assets/counselors-icon.png";

export default function Parent() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [disableParent, setDisableParent] = React.useState(true);
  const [user, setUser] = React.useState<User>();
  const auth = getAuth();
  const history = useHistory();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((res) => {
          setDisableParent(!!!res.data.firstName);
        });
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleHouseholdClick = () => {
    if (user) {
      sessionStorage.setItem("parent_id", user.uid);
    }
    history.push("/parent/householdForm");
  };
  return (
    <Container className="Admin-Buttons" style={{ maxWidth: 500 }}>
      {isLoading ? (
        <div className="center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <br />
          <h3> Parent/Guardian Dashboard </h3>
          <br />
          <div className="Counselor-Buttons">
            <Col>
              <Button variant="outline-success" className="Admin-Button" onClick={handleHouseholdClick}>
                <img src={counselorsIcon} alt="household icon" />
                Household
              </Button>
              <Button
                variant="outline-success"
                className="Admin-Button"
                href="/#/parent/campers"
                disabled={disableParent}
              >
                <img src={campersIcon} alt="campers icon" />
                Campers
              </Button>
              <Button
                variant="outline-success"
                className="Admin-Button"
                href="/#/parent/parentFinances"
                disabled={disableParent}
              >
                💰 Payments
              </Button>
            </Col>
            {disableParent && <p>Please fill out the Household Profile to add a camper</p>}
          </div>
        </div>
      )}
    </Container>
  );
}
