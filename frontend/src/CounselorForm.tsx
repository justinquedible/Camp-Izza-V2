// Page for parents to fill out their child's camper form

import React from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import "./HouseholdForm.css";
import { Counselor, Counselor_Medical_Record, Emergency_Contact } from "./models/models";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { dateTimeToDateInput } from "./utils/DateTimeUtil";

export default function CounselorForm() {
  const auth = getAuth();
  const [isSaving, setIsSaving] = React.useState(false);

  const [counselorValues, setCounselorValues] = React.useState<Counselor>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    altPhone: "",
    group_id: 0,
    approved: false,
    active: false,
  });

  const [medicalRecordValues, setMedicalRecordValues] = React.useState<Counselor_Medical_Record>({
    id: 0,
    counselor_id: "",
    doctorName: "",
    doctorPhone: "",
    insuranceCarrier: "",
    policyHolder: "",
    allergies: "",
    illnesses: "",
    immunizations: "",
    medications: "",
    accommodations: "",
  });

  const [emergency1Values, setEmergency1Values] = React.useState<Emergency_Contact>({
    id: 0,
    user_id: "",
    firstName: "",
    lastName: "",
    relation: "",
    phone: "",
    authPickUp: true,
  });

  const [emergency2Values, setEmergency2Values] = React.useState<Emergency_Contact>({
    id: 0,
    user_id: "",
    firstName: "",
    lastName: "",
    relation: "",
    phone: "",
    authPickUp: true,
  });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await axios.get(process.env.REACT_APP_API + "api/counselors/getCounselor/" + user.uid).then((res) => {
          setCounselorValues({ ...res.data, dob: dateTimeToDateInput(res.data.dob) });
          console.log(res.data);
        });
        await axios
          .get(process.env.REACT_APP_API + "api/emergency_contacts/getEmergency_ContactsByUserID/" + user.uid)
          .then((res) => {
            setEmergency1Values({ ...res.data[0] });
            setEmergency2Values({ ...res.data[1] });
          });
        await axios
          .get(
            process.env.REACT_APP_API +
              "api/counselor_medical_records/getCounselor_Medical_RecordByCounselorID/" +
              user.uid
          )
          .then((res) => {
            setMedicalRecordValues({ ...res.data });
          });
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSaving(true);
    e.preventDefault();
    await axios.put(process.env.REACT_APP_API + "api/counselors/updateCounselor/" + auth.currentUser?.uid, {
      ...counselorValues,
    });
    // figure out how to grab id from user
    await axios
      .get(process.env.REACT_APP_API + "api/emergency_contacts/getEmergency_ContactsByUserID/" + auth.currentUser?.uid)
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
    await axios
      .get(
        process.env.REACT_APP_API +
          "api/counselor_medical_records/getCounselor_Medical_RecordByCounselorID/" +
          auth.currentUser?.uid
      )
      .then(async (res) => {
        await axios.put(
          process.env.REACT_APP_API + "api/counselor_medical_records/updateCounselor_Medical_Record/" + res.data[2].id,
          {
            ...medicalRecordValues,
          }
        );
      });

    setIsSaving(false);
    // history.push("/counselor");
  };
  const handleCounselorChange = (name: string) => (e: { target: { value: any } }) => {
    setCounselorValues({ ...counselorValues, [name]: e.target.value });
  };

  const handleEmergency1Change = (name: string) => (e: { target: { value: any } }) => {
    setEmergency1Values({ ...emergency1Values, [name]: e.target.value });
  };

  const handleEmergency2Change = (name: string) => (e: { target: { value: any } }) => {
    setEmergency2Values({ ...emergency2Values, [name]: e.target.value });
  };

  const handleMedicalRecordChange = (name: string) => (e: { target: { value: any } }) => {
    setMedicalRecordValues({ ...medicalRecordValues, [name]: e.target.value });
  };

  return (
    <div className={"CounselorForm"}>
      <br />
      <Container className="Text-Form">
        <Button variant="primary" className="backButton" href="/#/counselor">
          Back
        </Button>

        <h3>Profile</h3>
        <br />
        <p>
          <b>*</b> Indicates a mandatory field.
        </p>

        <Form onSubmit={handleSubmit}>
          <h5>Counselor Info</h5>
          <Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required value={counselorValues.firstName} onChange={handleCounselorChange("firstName")} />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required value={counselorValues.lastName} onChange={handleCounselorChange("lastName")} />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="counselorGender">
              <Form.Label>
                <b>* </b>Gender
              </Form.Label>
              <Form.Control
                as="select"
                custom
                required
                value={counselorValues.gender}
                onChange={handleCounselorChange("gender")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="counselorDob">
              <Form.Label>
                <b>* </b>Date of Birth
              </Form.Label>
              <input
                className="form-control"
                type="date"
                value={counselorValues.dob}
                required
                onChange={handleCounselorChange("dob")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="phone">
              <Form.Label>
                <b>* </b>Phone Number
              </Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                required
                value={counselorValues.phone}
                onChange={handleCounselorChange("phone")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="phone">
              <Form.Label>
                <b>* </b> Alternative Phone Number
              </Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                required
                value={counselorValues.altPhone}
                onChange={handleCounselorChange("phone")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="email">
              <Form.Label>
                <b>* </b>Email
              </Form.Label>
              <Form.Control type="email" readOnly required value={counselorValues.email} />
            </Form.Group>
          </Row>
          <br />

          <h5>Health Info</h5>
          <Row>
            <Form.Group as={Col} controlId="doctorName">
              <Form.Label>
                <b>* </b>Primary Physician's Name
              </Form.Label>
              <Form.Control
                required
                value={medicalRecordValues.doctorName}
                onChange={handleMedicalRecordChange("doctorName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="doctorPhone">
              <Form.Label>
                <b>* </b>Primary Physician's Phone Number
              </Form.Label>
              <input
                className="form-control"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="6261234567"
                required
                value={medicalRecordValues.doctorPhone}
                onChange={handleMedicalRecordChange("doctorPhone")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="insuranceCarrier">
              <Form.Label>
                <b>* </b>Insurance Carrier
              </Form.Label>
              <Form.Control
                required
                value={medicalRecordValues.insuranceCarrier}
                onChange={handleMedicalRecordChange("insuranceCarrier")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="policyHolder">
              <Form.Label>
                <b>* </b>Policy Holder's Name
              </Form.Label>
              <Form.Control
                required
                value={medicalRecordValues.policyHolder}
                onChange={handleMedicalRecordChange("policyHolder")}
              />
            </Form.Group>
          </Row>

          <br />
          <h5>Health Questionnaire</h5>
          <p>
            <b>* </b>Please answer the following questions. <u>Leave blank</u> if quesions do not apply.
          </p>
          <br />
          <Row>
            <Form.Group as={Col} controlId="allergies">
              <Form.Label>
                Do you have any allergies and/or dietary restrictions? If <u>yes</u>, please list restrictions.
              </Form.Label>
              <Form.Control value={medicalRecordValues.allergies} onChange={handleMedicalRecordChange("allergies")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="accommodations">
              <Form.Label>
                Do you require any accommodations in order to perform the duties of this job? If <u>yes</u>, please list
                the accommodations you require.
              </Form.Label>
              <Form.Control
                value={medicalRecordValues.accommodations}
                onChange={handleMedicalRecordChange("accommodations")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="illnesses">
              <Form.Label>
                Do you have any chronic conditions or illnesses? If <u>yes</u>, please list conditions.
              </Form.Label>
              <Form.Control value={medicalRecordValues.illnesses} onChange={handleMedicalRecordChange("illnesses")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="medications">
              <Form.Label>
                Will you be taking any medication at camp? If <u>yes</u>, please list medications.
              </Form.Label>
              <Form.Control
                value={medicalRecordValues.medications}
                onChange={handleMedicalRecordChange("medications")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="immunizations">
              <Form.Label>
                Have you received all required immunizations? Please see the job description for a detailed list of the
                required immunizations.
              </Form.Label>
              <Form.Control
                as="select"
                custom
                value={medicalRecordValues.immunizations}
                onChange={handleMedicalRecordChange("immunizations")}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>
          </Row>

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
