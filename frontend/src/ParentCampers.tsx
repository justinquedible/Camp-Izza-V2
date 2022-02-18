// Page for parents to view their children that they registered to be campers

import "./Dashboard.css";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth, User } from "firebase/auth";
import axios from "axios";
import Campers from "./components/Campers";

export default function ParentDashboard() {
  // const [disableAddCamper, setDisableAddCamper] = React.useState(true);
  const [campers, setCampers] = React.useState([]);
  const [user, setUser] = React.useState<User>();
  const auth = getAuth();
  const history = useHistory();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((res) => {
          // console.log(res.data);
          // setDisableAddCamper(!!!res.data.firstName);
          axios.get(process.env.REACT_APP_API + "api/campers/getCampersByParentID/" + user.uid).then((res) => {
            // console.log(res.data);
            setCampers(res.data);
          });
        });
      }
    });
    return unsubscribe;
  }, [auth]);

  // const handleHouseholdClick = () => {
  //   if (user){
  //     sessionStorage.setItem("parent_id", user.uid);
  //   }
  //   history.push("/parent/householdForm")
  // }

  const handleAddCamper = async (e: { preventDefault: () => void }) => {
    sessionStorage.setItem("camper_id", "");
    history.push("/parent/camperForm");
  };

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <div className="Parent">
      <br />
      <Container className="Admin-Buttons">
        <Button variant="primary" className="backButton" onClick={handleGoBack}>
          Back
        </Button>
        {/* <Button variant="primary" className="householdProfileButton" onClick={handleHouseholdClick}>
          Household Profile
        </Button> */}
        {/* <br />
        <br /> */}
        <br />
        <h3> Parent / Guardian Dashboard </h3>
        <div className="row">
          <div className="col text-center">
            {/* <br /> */}
            <p>My Campers</p>
            <p className="fineText">
              To register campers into camp, click on "📆 Scheduling".
            </p>
            {/* <br /> */}
            <br />
            {/* {console.log(campers)} */}
            <Campers campers={campers} />
            <br />
            <Button variant="success" className="addCamperButton" onClick={handleAddCamper}>
              + Add New Camper
            </Button>
            {/* {disableAddCamper && <p>Please fill out the Household Profile to add a camper</p>} */}
          </div>
        </div>
      </Container>
    </div>
  );
}
