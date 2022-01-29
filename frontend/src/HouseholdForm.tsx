// Page for parents to view and edit their household information

import "./HouseholdForm.css";
import "intl-tel-input/build/css/intlTelInput.css";
import React from "react";
import { Button, Container, Form, FormCheck, Col, Row } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import intlTelInput from "intl-tel-input";
import axios from "axios";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

export default function HouseholdForm() {
  const auth = getAuth();
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSaved, setShowSaved] = React.useState(false);
  const checkbox1 = React.useRef<HTMLInputElement>(null);
  const checkbox2 = React.useRef<HTMLInputElement>(null);

  // Initialize international telephjone input plugin
  const input1 = React.useRef<HTMLInputElement>(null);
  const input2 = React.useRef<HTMLInputElement>(null);
  const input3 = React.useRef<HTMLInputElement>(null);
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
    city: "",
    zipCode: "",
    state: "",
    country: "",
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((res) => {
          setValues((values) => ({
            ...values,
            ...res.data,
          }));
        });
        await axios
          .get(process.env.REACT_APP_API + "api/emergency_contacts/getEmergency_ContactsByUserID/" + user.uid)
          .then((res) => {
            setValues((values) => ({
              ...values,
              emergency1FirstName: res.data[0].firstName,
              emergency1LastName: res.data[0].lastName,
              emergency1Relation: res.data[0].relation,
              emergency1Phone: res.data[0].phone,
              emergency1AuthPickUp: Boolean(res.data[0].authPickUp),
              emergency2FirstName: res.data[1].firstName,
              emergency2LastName: res.data[1].lastName,
              emergency2Relation: res.data[1].relation,
              emergency2Phone: res.data[1].phone,
              emergency2AuthPickUp: Boolean(res.data[1].authPickUp),
            }));
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
    await axios.put(process.env.REACT_APP_API + "api/parents/updateParent/" + auth.currentUser?.uid, {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      zipCode: values.zipCode,
      state: values.state,
      country: values.country,
    });
    await axios
      .get(process.env.REACT_APP_API + "api/emergency_contacts/getEmergency_ContactsByUserID/" + auth.currentUser?.uid)
      .then(async (res) => {
        await axios.put(
          process.env.REACT_APP_API + "api/emergency_contacts/updateEmergency_Contact/" + res.data[0].id,
          {
            firstName: values.emergency1FirstName,
            lastName: values.emergency1LastName,
            relation: values.emergency1Relation,
            phone: values.emergency1Phone,
            authPickUp: values.emergency1AuthPickUp,
          }
        );
        await axios.put(
          process.env.REACT_APP_API + "api/emergency_contacts/updateEmergency_Contact/" + res.data[1].id,
          {
            firstName: values.emergency2FirstName,
            lastName: values.emergency2LastName,
            relation: values.emergency2Relation,
            phone: values.emergency2Phone,
            authPickUp: values.emergency2AuthPickUp,
          }
        );
      });
    setIsSaving(false);
    window.location.reload();
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
        <br />
        <h3>Household Profile</h3>
        <br />
        <p>
          <b>*</b> Indicates a mandatory field.
        </p>

        <Form onSubmit={handleSubmit}>
          <h5>My Information</h5>
          <Row>
            <Form.Group as={Col} controlId="guardian1FirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required defaultValue={values.firstName} onChange={handleChange("firstName")} />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian1LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required defaultValue={values.lastName} onChange={handleChange("lastName")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="guardian1Email">
              <Form.Label>
                <b>* </b>Email
              </Form.Label>
              <Form.Control type="email" readOnly required defaultValue={values.email} />
            </Form.Group>
            <Form.Group as={Col} controlId="guardian1PhoneNumber">
              <div className="phone">
                <Row>
                  <Form.Label>
                    <b>* </b>Phone Number
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    ref={input1}
                    type="tel"
                    required
                    defaultValue={values.phone}
                    onChange={handleChange("phone")}
                  />
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
                defaultValue={values.addressLine1}
                onChange={handleChange("addressLine1")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="address2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apt, suite, unit, etc."
                defaultValue={values.addressLine2}
                onChange={handleChange("addressLine2")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>
                <b>* </b>City
              </Form.Label>
              <Form.Control required defaultValue={values.city} onChange={handleChange("city")} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="state">
              <Form.Label>
                <b>* </b>State
              </Form.Label>
              <Form.Control required defaultValue={values.state} onChange={handleChange("state")} />
            </Form.Group>
            <Form.Group as={Col} xs="2" controlId="postalCode">
              <Form.Label>
                <b>* </b>ZIP Code
              </Form.Label>
              <Form.Control required defaultValue={values.zipCode} onChange={handleChange("zipCode")} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="country">
              <Form.Label>
                <b>* </b>Country
              </Form.Label>
              <Form.Control required defaultValue={values.country} onChange={handleChange("country")} />
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
                defaultValue={values.emergency1FirstName}
                onChange={handleChange("emergency1FirstName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact1LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control
                required
                defaultValue={values.emergency1LastName}
                onChange={handleChange("emergency1LastName")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact1Relation">
              <Form.Label>
                <b>* </b>Relation to Camper(s)
              </Form.Label>
              <Form.Control
                required
                defaultValue={values.emergency1Relation}
                onChange={handleChange("emergency1Relation")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact1Phone">
              <div className="phone">
                <Row>
                  <Form.Label>
                    <b>* </b>Phone Number
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    ref={input2}
                    type="tel"
                    required
                    defaultValue={values.emergency1Phone}
                    onChange={handleChange("emergency1Phone")}
                  />
                </Row>
              </div>
            </Form.Group>
          </Row>
          <Form.Group controlId="check">
            <Row>
              <Col xs="auto">
                <FormCheckInput
                  ref={checkbox1}
                  className="check"
                  type="checkbox"
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
              <Form.Control
                required
                defaultValue={values.emergency2FirstName}
                onChange={handleChange("emergency2FirstName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact2LastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control
                required
                defaultValue={values.emergency2LastName}
                onChange={handleChange("emergency2LastName")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="emergencyContact2Relation">
              <Form.Label>
                <b>* </b>Relation to Camper(s)
              </Form.Label>
              <Form.Control
                required
                defaultValue={values.emergency2Relation}
                onChange={handleChange("emergency2Relation")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emergencyContact2Phone">
              <div className="phone">
                <Row>
                  <Form.Label>
                    <b>* </b>Phone Number
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    ref={input3}
                    type="tel"
                    defaultValue={values.emergency2Phone}
                    required
                    onChange={handleChange("emergency2Phone")}
                  />
                </Row>
              </div>
            </Form.Group>
          </Row>
          <Form.Group controlId="check">
            <Row>
              <Col xs="auto">
                <FormCheckInput
                  ref={checkbox2}
                  className="check"
                  type="checkbox"
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
            <Button type="submit" variant="success" className="buttonTxt" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
