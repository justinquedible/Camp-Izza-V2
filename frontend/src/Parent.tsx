// Page for parents to view their children that they registered to be campers

import "./Dashboard.css";
import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Button,
  CardDeck,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";

// import {Router, Switch, Route} from "react-router-dom";

// import NavBarInstance from './NavBar';
// import FooterInstance from './Footer';
// import campersIcon from './AdminIcons/campers-icon.png';
// import homeIcon from './AdminIcons/home-icon.png';
import Campers from "./components/Campers";
// import AuthService from "./services/auth-service";

export default function ParentDashboard() {
  const [disableAddCamper, setDisableAddCamper] = React.useState(true);
  const [campers, setCampers] = React.useState([]);
  const auth = getAuth();
  const history = useHistory();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((res) => {
          // console.log(res.data);
          setDisableAddCamper(!!!res.data.firstName);
          axios.get(process.env.REACT_APP_API + "api/campers/getCampersByParentID/" + user.uid).then((res) => {
            // console.log(res.data);
            setCampers(res.data);
          });
        });
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleAddCamper = async (e: { preventDefault: () => void }) => {
    sessionStorage.setItem("camper_id", "");
    history.push("/parent/camperForm");
  };

  return (
    <div className="Parent">
      <br />
      <Container className="Admin-Buttons">
        <Button variant="primary" className="householdProfileButton" href="/#/parent/householdForm">
          Household Profile
        </Button>
        <br />
        <br />
        <br />
        <h3> Parent Dashboard </h3>
        <div className="row">
          <div className="col text-center">
            <br />
            My Campers
            <br />
            <br />
            {/* {console.log(campers)} */}
            <Campers campers={campers} />
            <br />
            <Button variant="success" className="addCamperButton" onClick={handleAddCamper} disabled={disableAddCamper}>
              + Add New Camper
            </Button>
            {disableAddCamper && <p>Please fill out the Household Profile to add a camper</p>}
          </div>
        </div>
      </Container>
    </div>
  );
}
