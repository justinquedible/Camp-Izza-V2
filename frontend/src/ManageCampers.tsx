import React from "react";
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import Campers from "./components/Campers";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface CamperTruncated {
  id: number;
  firstName: string;
  lastName: string;
}

export default function ManageCampers() {
  const history = useHistory();
  const [query, setQuery] = React.useState("registeredCurrentYear");
  const [campers, setCampers] = React.useState<CamperTruncated[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const queryRef = React.useRef<any>(null);
  const sortRef = React.useRef<any>(null);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (query === "registeredCurrentYear") {
        await axios.get(process.env.REACT_APP_API + "api/campers/getCampersRegisteredCurrentYear").then((response) => {
          setCampers(response.data);
        });
      } else if (query === "registeredAllYears" && sortRef.current.value !== "registered(mostRecent)") {
        await axios.get(process.env.REACT_APP_API + "api/campers/getCampersRegisteredAllYears").then((response) => {
          setCampers(response.data);
        });
      } else if (query === "unregisteredAllYears") {
        await axios.get(process.env.REACT_APP_API + "api/campers/getCampersUnregistered").then((response) => {
          setCampers(response.data);
        });
      }
      await handleSortOptionChange({ target: { value: "firstName(A-Z)" } });
      if (sortRef) {
        sortRef.current.selectedIndex = 0;
      }
      setIsLoading(false);
    })();
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(e.target.value);
  };

  const handleSortOptionChange = async (e: { target: { value: string } }) => {
    const sortOption = e.target.value;
    if (sortOption === "firstName(A-Z)") {
      setCampers((c) => [...c.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))]);
    } else if (sortOption === "lastName(A-Z)") {
      setCampers((c) => [...c.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))]);
    } else if (sortOption === "registered(mostRecent)") {
      setQuery("registeredAllYears");
      if (queryRef) {
        queryRef.current.selectedIndex = 1;
      }
      await axios
        .get(process.env.REACT_APP_API + "api/campers/getCampersRegisteredAllYearsSortByRegistrationDate")
        .then((res) => {
          setCampers(res.data);
        });
    }
  };

  const onGenerateEmergencyForm = async () => {
    sessionStorage.setItem("camper_id", campers.map((c) => c.id).join(","));
    history.push(`/admin/emergencyForm`);
  };

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
        <Button variant="outline-primary" style={{ float: "right" }} onClick={onGenerateEmergencyForm}>
          Generate Emergency Forms
        </Button>
        <br />
        <Form style={{ marginLeft: "30%", marginRight: "20%" }}>
          <Row>
            <Form.Label>Filter: </Form.Label>
            <Form.Group as={Col} xs="auto" controlId="queryOption">
              <Form.Control ref={queryRef} as="select" style={{ textAlign: "center" }} onChange={handleQueryChange}>
                <option value="registeredCurrentYear">Registered (Current Year)</option>
                <option value="registeredAllYears">Registered (All Years)</option>
                <option value="unregisteredAllYears">Unregistered (All Years)</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Label>Sort by: </Form.Label>
            <Form.Group as={Col} xs="auto" controlId="sortOption">
              <Form.Control ref={sortRef} as="select" style={{ textAlign: "center" }} onChange={handleSortOptionChange}>
                <option value="firstName(A-Z)">First Name (A-Z)</option>
                <option value="lastName(A-Z)">Last Name (A-Z)</option>
                <option value="registered(mostRecent)">Registered (Most Recent)</option>
              </Form.Control>
            </Form.Group>
          </Row>
        </Form>
        <br />
        <Row style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "10%", marginRight: "10%" }}>
          <p>???? Info</p>
          <p>???? Registered Weeks</p>
          <p>???? Attendance</p>
          <p>???? Emergency Form</p>
        </Row>
        <br />
        <div className="col text-center">
          {isLoading ? <Spinner animation="border" variant="primary" /> : <Campers campers={campers} type="admin" />}
        </div>
      </Container>
    </div>
  );
}
