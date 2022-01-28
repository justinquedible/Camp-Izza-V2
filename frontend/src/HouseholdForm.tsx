// Page for parents to view and edit their household information

import "./HouseholdForm.css";
import "intl-tel-input/build/css/intlTelInput.css";
import React from "react";
import { Button, Container, Form, FormCheck, Col, Row } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import intlTelInput from "intl-tel-input";
import axios from "axios";
// import { Parent, getParent } from "./models/Parent";

// import { Router, Switch, Route } from "react-router-dom";

// import NavBarInstance from "./NavBar";
// import FooterInstance from "./Footer";
// import axios from "axios";
// import currentUser from "./services/auth-service";
// import authHeader from "./services/auth-header";
// import ParentService from "./services/parent-service";
// import AuthService from "./services/auth-service";

export default function HouseholdForm() {
  //   const [parent, setParent] = React.useState<Parent | null>(null);
  const auth = getAuth();

  // Initialize international telephjone input plugin
  const input1 = React.useRef<HTMLInputElement>(null);
  const input2 = React.useRef<HTMLInputElement>(null);
  const input3 = React.useRef<HTMLInputElement>(null);
  // const input4 = React.useRef<HTMLInputElement>(null);
  // const [telInputs, setTelInputs] = React.useState<intlTelInput.Plugin[]>([]);
  const [telInput1, setTelInput1] = React.useState<intlTelInput.Plugin>();
  const [telInput2, setTelInput2] = React.useState<intlTelInput.Plugin>();
  const [telInput3, setTelInput3] = React.useState<intlTelInput.Plugin>();

  React.useEffect(() => {
    if (input1.current) {
      setTelInput1(
        intlTelInput(input1.current, {
          preferredCountries: ["us"],
          separateDialCode: true,
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js",
        })
      );
    }
    if (input2.current) {
      setTelInput2(
        intlTelInput(input2.current, {
          preferredCountries: ["us"],
          separateDialCode: true,
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js",
        })
      );
    }
    if (input3.current) {
      setTelInput3(
        intlTelInput(input3.current, {
          preferredCountries: ["us"],
          separateDialCode: true,
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js",
        })
      );
    }
  }, []);

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    emergency1FirstName: "",
    emergency1LastName: "",
    emergency1Relation: "",
    emergency1Phone: "",
    emergency1AuthPickUp: false,
    emergency2FirstName: "",
    emergency2LastName: "",
    emergency2Relation: "",
    emergency2Phone: "",
    emergency2AuthPickUp: false,
  });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((res) => {
          console.log(res.data);
          setValues((values) => ({
            ...values,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            phone: res.data.phone,
            addressLine1: res.data.addressLine1,
            addressLine2: res.data.addressLine2,
          }));
        });
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    // console.log(telInput?.getNumber());
    // console.log(telInput?.isValidNumber());
  };

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div className={"HouseholdForm"}>
      <br />
      <Container className="Text-Form">
        <Button variant="primary" className="backButton" href="/#/parent">
          Back
        </Button>
        <h3>Household Profile</h3>
        <br />
        <p>
          <b>*</b> indicates a mandatory field.
        </p>

        <Form onSubmit={handleSubmit}>
          <h5>My Information</h5>
          <Row>
            <Form.Group as={Col} controlId="guardian1FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required onChange={handleChange(values.firstName)} />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian1LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required onChange={handleChange(values.lastName)} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="guardian1Email">
              <Form.Label>
                <b>* </b>Email
              </Form.Label>
              <Form.Control type="email" readOnly required defaultValue={values.email} />
            </Form.Group>
            <Form.Group as={Col} xs="auto" controlId="guardian1PhoneNumber">
              <div className="phone">
                <Row>
                  <Form.Label>
                    <b>* </b>Phone Number
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Control ref={input1} type="tel" required />
                </Row>
              </div>
            </Form.Group>
          </Row>

          {/* <br />
          <h5>Secondary Guardian</h5>
          <Row>
            <Form.Group as={Col} controlId="guardian2FirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian2LastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="guardian2Email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian2PhoneNumber">
              <div className="phone">
                <Row>
                  <Form.Label>Phone Number</Form.Label>
                </Row>
                <Row>
                  <Form.Control ref={input2} type="tel" />
                </Row>
              </div>
            </Form.Group>
          </Row> */}

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
                onChange={handleChange(values.addressLine1)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="address2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apt, suite, unit, etc." onChange={handleChange(values.addressLine2)} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>
                <b>* </b>City
              </Form.Label>
              <Form.Control required onChange={handleChange(values.city)} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="state">
              <Form.Label>
                <b>* </b>State
              </Form.Label>
              <Form.Control required defaultValue="California" onChange={handleChange(values.state)} />
            </Form.Group>
            <Form.Group as={Col} xs="2" controlId="postalCode">
              <Form.Label>
                <b>* </b>ZIP Code
              </Form.Label>
              <Form.Control required onChange={handleChange(values.zipCode)} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="country">
              <Form.Label>
                <b>* </b>Country
              </Form.Label>
              <Form.Control required defaultValue="United States" onChange={handleChange(values.country)} />
            </Form.Group>
          </Row>

          <br />
          <h5>Emergency Contact 1</h5>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact1FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required onChange={handleChange(values.emergency1FirstName)} />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact1LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required onChange={handleChange(values.emergency1LastName)} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact1Relation">
              <Form.Label>
                <b>* </b>Relation to Camper(s)
              </Form.Label>
              <Form.Control required onChange={handleChange(values.emergency1Relation)} />
            </Form.Group>
            <Form.Group as={Col} xs="auto" controlId="emergencyContact1Phone">
              <div className="phone">
                <Row>
                  <Form.Label>
                    <b>* </b>Phone Number
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Control ref={input2} type="tel" required />
                </Row>
              </div>
            </Form.Group>
          </Row>
          <Form.Group controlId="check">
            <Row>
              <Col xs="1">
                <Form.Control
                  className="check"
                  type="checkbox"
                  isValid={values.emergency1AuthPickUp}
                  onChange={() => {
                    setValues((values) => ({ ...values, emergency1AuthPickUp: !values.emergency1AuthPickUp }));
                  }}
                />
              </Col>
              <Col>
                <FormCheck.Label>This person is authorized to pick up my camper(s)</FormCheck.Label>
              </Col>
            </Row>
          </Form.Group>

          <br />
          <h5>Emergency Contact 2</h5>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact2FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required onChange={handleChange(values.emergency2FirstName)} />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact2LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required onChange={handleChange(values.emergency2LastName)} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact2Relation">
              <Form.Label>
                <b>* </b>Relation to Camper(s)
              </Form.Label>
              <Form.Control required onChange={handleChange(values.emergency2Relation)} />
            </Form.Group>
            <Form.Group as={Col} xs="auto" controlId="emergencyContact2Phone">
              <div className="phone">
                <Row>
                  <Form.Label>
                    <b>* </b>Phone Number
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Control ref={input3} type="tel" required />
                </Row>
              </div>
            </Form.Group>
          </Row>
          <Form.Group controlId="check">
            <Row>
              <Col xs="1">
                <Form.Control
                  className="check"
                  type="checkbox"
                  isValid={values.emergency2AuthPickUp}
                  onChange={() => {
                    setValues((values) => ({ ...values, emergency2AuthPickUp: !values.emergency2AuthPickUp }));
                  }}
                />
              </Col>
              <Col>
                <FormCheck.Label>This person is authorized to pick up my camper(s)</FormCheck.Label>
              </Col>
            </Row>
          </Form.Group>

          <div className="center">
            <Button type="submit" variant="success" className="buttonTxt">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
