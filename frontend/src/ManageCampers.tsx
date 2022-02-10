import React from "react";
import { Container, Button, Form, Row, Col, CardDeck, Card } from "react-bootstrap";
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
        <br />
        <Form>
          <Form.Group as={Col} xs="4" controlId="selectSummer">
            <Form.Control as="select" onChange={(e: { target: { value: any } }) => setQuery(e.target.value)}>
              <option value="all">Registered Current Year</option>
              <option value="registered">Registered All Years</option>
              <option value="unregistered">All Unregistered Campers</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <br />
        <Row style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "10%", marginRight: "10%" }}>
          <p>👤 Info</p>
          <p>📖 Registered Weeks</p>
          <p>📆 Attendance</p>
          <p>📝 Emergency Form</p>
        </Row>
        <br />
        <div className="col text-center">
          <Campers campers={campers} type="admin" />
        </div>
      </Container>
    </div>
  );
}
