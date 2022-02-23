// Page for parents to view and edit their household information

import "./HouseholdForm.css";
import React from "react";
import { Button, Container, Form, FormCheck, Col, Row } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { Parent, Emergency_Contact } from "./models/models";

export default function HouseholdForm() {
  const auth = getAuth();
  const history = useHistory();
  const [isSaving, setIsSaving] = React.useState(false);
  const checkbox1 = React.useRef<HTMLInputElement>(null);
  const checkbox2 = React.useRef<HTMLInputElement>(null);
  const parent_id = sessionStorage.getItem("parent_id");
  const [userRole, setUserRole] = React.useState("");

  const [parentValues, setParentValues] = React.useState<Parent>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    guardian2FirstName: "",
    guardian2LastName: "",
    guardian2Email: "",
    guardian2Phone: "",
    credit: 0,
  });

  const [emergency1Values, setEmergency1Values] = React.useState<Emergency_Contact>({
    id: 0,
    user_id: "",
    firstName: "",
    lastName: "",
    relation: "",
    phone: "",
    authPickUp: false,
  });

  const [emergency2Values, setEmergency2Values] = React.useState<Emergency_Contact>({
    id: 0,
    user_id: "",
    firstName: "",
    lastName: "",
    relation: "",
    phone: "",
    authPickUp: false,
  });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // await fetchCamperData();
        await axios.get(process.env.REACT_APP_API + "api/users/getUser/" + user.uid).then((res) => {
          setUserRole(res.data.role);
        });
        await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + parent_id).then((res) => {
          setParentValues({ ...res.data });
        });
        await axios
          .get(process.env.REACT_APP_API + "api/emergency_contacts/getEmergency_ContactsByUserID/" + parent_id)
          .then((res) => {
            setEmergency1Values({ ...res.data[0], authPickUp: Boolean(res.data[0].authPickUp) });
            setEmergency2Values({ ...res.data[1], authPickUp: Boolean(res.data[1].authPickUp) });
            if (checkbox1.current && checkbox2.current) {
              checkbox1.current.checked = Boolean(res.data[0].authPickUp);
              checkbox2.current.checked = Boolean(res.data[1].authPickUp);
            }
          });
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSaving(true);
    e.preventDefault();
    await axios.put(process.env.REACT_APP_API + "api/parents/updateParent/" + parent_id, {
      ...parentValues,
    });
    await axios
      .get(process.env.REACT_APP_API + "api/emergency_contacts/getEmergency_ContactsByUserID/" + parent_id)
      .then(async (res) => {
        await axios.put(
          process.env.REACT_APP_API + "api/emergency_contacts/updateEmergency_Contact/" + res.data[0].id,
          {
            ...emergency1Values,
          }
        );
        await axios.put(
          process.env.REACT_APP_API + "api/emergency_contacts/updateEmergency_Contact/" + res.data[1].id,
          {
            ...emergency2Values,
          }
        );
      });
    setIsSaving(false);
    history.goBack();
  };

  const handleParentChange = (name: string) => (e: { target: { value: any } }) => {
    setParentValues({ ...parentValues, [name]: e.target.value });
  };

  const handleEmergency1Change = (name: string) => (e: { target: { value: any } }) => {
    setEmergency1Values({ ...emergency1Values, [name]: e.target.value });
  };

  const handleEmergency2Change = (name: string) => (e: { target: { value: any } }) => {
    setEmergency2Values({ ...emergency2Values, [name]: e.target.value });
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={"HouseholdForm"}>
      <br />
      <Container className="Text-Form">
        <Button variant="primary" className="backButton" onClick={handleBack}>
          Back
        </Button>

        <h3>Household Profile</h3>
        <br />
        <p>
          <b>*</b> Indicates a mandatory field.
        </p>

        <Form onSubmit={handleSubmit}>
          <h5>Primary Guardian</h5>
          <Row>
            <Form.Group as={Col} controlId="guardian1FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required value={parentValues.firstName} onChange={handleParentChange("firstName")} />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian1LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required value={parentValues.lastName} onChange={handleParentChange("lastName")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="guardian1Email">
              <Form.Label>
                <b>* </b>Email
              </Form.Label>
              <Form.Control type="email" readOnly required value={parentValues.email} />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian1Phone">
              <Form.Label>
                <b>* </b>Phone Number
              </Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                required
                value={parentValues.phone}
                onChange={handleParentChange("phone")}
              />
            </Form.Group>
          </Row>

          <br />
          <h5>Secondary Guardian</h5>
          <Row>
            <Form.Group as={Col} controlId="guardian2FirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={parentValues.guardian2FirstName}
                onChange={handleParentChange("guardian2FirstName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian2LastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control value={parentValues.guardian2LastName} onChange={handleParentChange("guardian2LastName")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="guardian2Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={parentValues.guardian2Email}
                onChange={handleParentChange("guardian2Email")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian2Phone">
              <Form.Label>Phone Number</Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                value={parentValues.guardian2Phone}
                onChange={handleParentChange("guardian2Phone")}
              />
            </Form.Group>
          </Row>

          <br />
          <h5>Residence</h5>
          <Row>
            <Form.Group as={Col} controlId="address1">
              <Form.Label>
                <b>* </b>Address 1
              </Form.Label>
              <Form.Control
                required
                placeholder="Street address or P.O. Box"
                value={parentValues.addressLine1}
                onChange={handleParentChange("addressLine1")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="address2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apt, suite, unit, etc."
                value={parentValues.addressLine2}
                onChange={handleParentChange("addressLine2")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>
                <b>* </b>City
              </Form.Label>
              <Form.Control required value={parentValues.city} onChange={handleParentChange("city")} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="state">
              <Form.Label>
                <b>* </b>State
              </Form.Label>
              <Form.Control required value={parentValues.state} onChange={handleParentChange("state")} />
            </Form.Group>
            <Form.Group as={Col} xs="2" controlId="postalCode">
              <Form.Label>
                <b>* </b>ZIP Code
              </Form.Label>
              <Form.Control required value={parentValues.zipCode} onChange={handleParentChange("zipCode")} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="country">
              <Form.Label>
                <b>* </b>Country
              </Form.Label>
              <Form.Control required value={parentValues.country} onChange={handleParentChange("country")} />
            </Form.Group>
          </Row>

          <br />
          <h5>Emergency Contact 1</h5>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact1FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control
                required
                value={emergency1Values.firstName}
                onChange={handleEmergency1Change("firstName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact1LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required value={emergency1Values.lastName} onChange={handleEmergency1Change("lastName")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact1Relation">
              <Form.Label>
                <b>* </b>Relation to Camper(s)
              </Form.Label>
              <Form.Control required value={emergency1Values.relation} onChange={handleEmergency1Change("relation")} />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact1Phone">
              <Form.Label>
                <b>* </b>Phone Number
              </Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                required
                value={emergency1Values.phone}
                onChange={handleEmergency1Change("phone")}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="check">
            <Row className="checkbox-row">
              <Col xs="auto">
                <FormCheckInput
                  ref={checkbox1}
                  className="check"
                  type="checkbox"
                  onChange={() => {
                    setEmergency1Values((values) => ({ ...values, authPickUp: !values.authPickUp }));
                  }}
                />
              </Col>
              <Col>
                <FormCheck.Label>This person is authorized to pick up my camper(s)</FormCheck.Label>
              </Col>
            </Row>
          </Form.Group>

          <br />
          <br />
          <h5>Emergency Contact 2</h5>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact2FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control
                required
                value={emergency2Values.firstName}
                onChange={handleEmergency2Change("firstName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact2LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required value={emergency2Values.lastName} onChange={handleEmergency2Change("lastName")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact2Relation">
              <Form.Label>
                <b>* </b>Relation to Camper(s)
              </Form.Label>
              <Form.Control required value={emergency2Values.relation} onChange={handleEmergency2Change("relation")} />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact2Phone">
              <Form.Label>
                <b>* </b>Phone Number
              </Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                required
                value={emergency2Values.phone}
                onChange={handleEmergency2Change("phone")}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="check">
            <Row className="checkbox-row">
              <Col xs="auto">
                <FormCheckInput
                  ref={checkbox2}
                  className="check"
                  type="checkbox"
                  onChange={() => {
                    setEmergency2Values((values) => ({ ...values, authPickUp: !values.authPickUp }));
                  }}
                />
              </Col>
              <Col>
                <FormCheck.Label>This person is authorized to pick up my camper(s)</FormCheck.Label>
              </Col>
            </Row>
          </Form.Group>

          {userRole === "admin" && (
            <div>
              <br />
              <h5>Parent's Credit</h5>
              <Form.Group as={Col} xs={4}>
                <Form.Label>Credit</Form.Label>
                <Form.Control
                  type="number"
                  value={parentValues.credit}
                  required
                  onChange={handleParentChange("credit")}
                />
              </Form.Group>
            </div>
          )}
          <br />

          <div className="center">
            <Button type="submit" variant="success" className="buttonTxt" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
