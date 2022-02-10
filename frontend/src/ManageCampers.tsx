import React from "react";
import { Container, Button, Form, Col, CardDeck, Card } from "react-bootstrap";
// import "./Dashboard.css";
import Campers from "./components/Campers";
import { Camper } from "./models/models";
import axios from "axios";

export default function ManageCampers() {
  const [query, setQuery] = React.useState("all");
  const [campers, setCampers] = React.useState<Camper[]>([]);

  React.useEffect(() => {
    // console.log(query);
    if (query === "all") {
      axios.get(process.env.REACT_APP_API + "/api/campers/getCampers").then((response) => {
        setCampers(response.data);
      });
    }
    // const currentUserID = AuthService.currentUser().id;
    // let camperName = AuthService.currentChild();
    // function currentCamperCredit(userID: number) {
    //   CamperService.getCredit(userID).then((response) => {
    //     setCredit(response.data);
    //   });
    // }
    // // function currentCamperPaid(userID: number) {
    //   // const currentUserID = AuthService.currentUser().id;
    //   // let camperName = AuthService.currentChild();
    //   CamperService.getPaid(userID).then((response) => {
    //     setPaid(response.data);
    //   });
    // }
  }, [query]);

  return (
    <div className="ManageCampers">
      <br />
      <Container className="Admin-Buttons">
        <Button variant="primary" className="backButton" href="/#/admin">
          Back
        </Button>
        <br />
        <br />
        <h3> Manage Campers </h3>
        <h6> Add, remove, and edit camper information. </h6>
        <br />
        <br />
        <Form>
          {/* <p>SUMMER:</p> */}
          <Form.Group as={Col} xs="4" controlId="selectSummer">
            <Form.Control as="select" onChange={(e: { target: { value: any } }) => setQuery(e.target.value)}>
              <option value="all">All Campers</option>
              <option value="registered">Registered Campers</option>
              <option value="unregistered">Unregistered Campers</option>
            </Form.Control>
            {/* <select className={"resize"} defaultValue={queryValues.year} onChange={handleChange("year")}>
            <option disabled value={0}>
              -- Select a summer --
            </option>
            <option value={new Date().getFullYear()}>Currently Registered: {new Date().getFullYear()}</option>

            <option value={-2}>Previous Years</option>
            <option value={-1}>All Years</option> */}
            {/*<option value={"currentAccount"}>Currently Only Made Account: 2021</option>*/}
            {/*<option value={"prev"}>Previous Years</option>*/}
            {/*<option value={"all"}>All Years</option>*/}
            {/* </select> */}
          </Form.Group>
          {/* <Button variant="success" className={"resize"} type="submit" onClick={handleSubmit}>
            Select
          </Button> */}
        </Form>
        <br />
        <div className="col text-center">
          <Campers campers={campers} type="admin" />
        </div>

        {/* <CardDeck style={{ display: "block" }}>
          {campers
            .sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()))
            .map((camper: Camper) => (
              <Card key={camper.id} style={{ marginBottom: 20 }}>
                <Card.Header>
                  <h4>
                    {camper.firstName} {camper.lastName}
                  </h4>
                </Card.Header>
                <Card.Body>
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="overview" onClick={() => handleSetShowOverview(camper)}>
                        Overview
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="registeredWeeks" onClick={() => {}}>
                        Registered Weeks
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="attendance" onClick={() => {}}>
                        Attendance
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="emergencyForm" onClick={() => {}}>
                        Emergency Form
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            ))}
        </CardDeck> */}
        {/* {camper ? <CamperOverview camper={camper} /> : null} */}
        {/* {showVal ? <Campers /> : null} */}
        {/* {showPopup ? <Popup /> : null} */}
      </Container>
    </div>
  );
}
