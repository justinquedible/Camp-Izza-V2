import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth, User } from "firebase/auth";
import axios from "axios";
import "./Dashboard.css";
import campersIcon from "./assets/campers-icon.png";
import counselorsIcon from "./assets/counselors-icon.png";



export default function Parent() {
    const [disableParent, setDisableParent] = React.useState(true);
    // const [campers, setCampers] = React.useState([]);
    const [user, setUser] = React.useState<User>();
    const auth = getAuth();
    const history = useHistory();
  
    React.useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((res) => {
            // console.log(res.data);
            setDisableParent(!!!res.data.firstName);
            // axios.get(process.env.REACT_APP_API + "api/campers/getCampersByParentID/" + user.uid).then((res) => {
            //   // console.log(res.data);
            //   setCampers(res.data);
            // });
          });
        }
      });
      return unsubscribe;
    }, [auth]);
  
    const handleHouseholdClick = () => {
      if (user){
        sessionStorage.setItem("parent_id", user.uid);
      }
      history.push("/parent/householdForm")
    }
    return (
        <div className="Parent">
        <br />
        <Container className="Admin-Buttons">
            <h3> Parent/Guardian Dashboard </h3>
            <br />
            <div className="Counselor-Buttons">
            <Col>
                <Button variant="outline-success" className="Admin-Button" onClick={handleHouseholdClick}>
                    <img src={counselorsIcon} />
                    Household
                </Button>
                <Button variant="outline-success" className="Admin-Button" href="/#/parent/campers" disabled={disableParent}>
                    <img src={campersIcon} alt="icon" />
                    Campers
                </Button>
                <Button variant="outline-success" className="Admin-Button" href="/#/parent/parentFinances"disabled={disableParent}>
                    {/* <img src={groupsIcon} alt="icon" /> */}
                    💰 Finances 
                </Button>
                
            </Col>
            {disableParent && <p>Please fill out the Household Profile to add a camper</p>}
            </div>
        </Container>
        </div>
    );
}
