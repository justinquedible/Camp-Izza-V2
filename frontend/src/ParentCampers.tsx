// Page for parents to view their children that they registered to be campers

import "./Dashboard.css";
import React from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Campers from "./components/Campers";

export default function ParentDashboard() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [campers, setCampers] = React.useState([]);
  const auth = getAuth();
  const history = useHistory();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(true);
        await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then(async (res) => {
          await axios.get(process.env.REACT_APP_API + "api/campers/getCampersByParentID/" + user.uid).then((res) => {
            setCampers(res.data);
          });
        });
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleAddCamper = async (e: { preventDefault: () => void }) => {
    sessionStorage.setItem("camper_id", "");
    history.push("/parent/camperForm");
  };

  const handleGoBack = () => {
    history.push("/parent");
  };

  return (
    <Container className="Admin-Buttons">
      {isLoading ? (
        <div className="center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <Button variant="primary" className="backButton" onClick={handleGoBack}>
            Back
          </Button>
          <br />
          <br />
          <h3>My Camper(s)</h3>
          <div className="row">
            <div className="col text-center">
              <br />
              <Button variant="success" className="addCamperButton" onClick={handleAddCamper}>
                + Add New Camper
              </Button>
              <br />
              <Campers campers={campers} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
