// Page for parents to fill out their child's camper form

import "./HouseholdForm.css";
import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { dateTimeToDateInput } from "./util/DateTimeUtil";
import { Camper, Camper_Medical_Record } from "./models/models";

export default function CamperForm() {
  const auth = getAuth();
  const history = useHistory();
  const [showDelForm, setDelForm] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isFieldReadOnly, setIsFieldReadOnly] = React.useState(false);
  const camper_id = sessionStorage.getItem("camper_id");

  const [camperValues, setCamperValues] = React.useState<Camper>({
    id: 0,
    parent_id: "",
    firstName: "",
    lastName: "",
    gender: "male",
    dob: "",
    grade: 0,
    school: "",
    shirtSize: "M",
    numShirts: 1,
    paid: 0,
  });

  const [medicalRecordValues, setMedicalRecordValues] = React.useState<Camper_Medical_Record>({
    id: 0,
    camper_id: 0,
    doctorName: "",
    doctorPhone: "",
    insuranceCarrier: "",
    policyHolder: "",
    allergies: "",
    restrictedActivities: "",
    illnesses: "",
    immunizations: "",
    medicalTreatments: "",
    medications: "",
    tetanusDate: "",
    comments: "",
  });

  React.useEffect(() => {
    const camper_id = sessionStorage.getItem("camper_id");
    if (camper_id) {
      axios
        .get(process.env.REACT_APP_API + "api/campers/getCamper/" + camper_id)
        .then((res) => {
          setCamperValues({ ...res.data, dob: dateTimeToDateInput(res.data.dob) });
          setIsFieldReadOnly(true);
        })
        .then(() => {
          axios
            .get(
              process.env.REACT_APP_API + "api/camper_medical_records/getCamper_Medical_RecordByCamperID/" + camper_id
            )
            .then((res) => {
              setMedicalRecordValues({
                ...res.data,
                tetanusDate: dateTimeToDateInput(res.data.tetanusDate),
              });
            });
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (camper_id === "") {
      const res = await axios.post(process.env.REACT_APP_API + "api/campers/addCamper", {
        ...camperValues,
        parent_id: auth.currentUser?.uid,
      });
      await axios.post(process.env.REACT_APP_API + "api/camper_medical_records/addCamper_Medical_Record", {
        ...medicalRecordValues,
        camper_id: res.data.camper_id,
      });
    } else {
      await axios.put(process.env.REACT_APP_API + "api/campers/updateCamper/" + camper_id, {
        ...camperValues,
      });
      await axios.put(
        process.env.REACT_APP_API + "api/camper_medical_records/updateCamper_Medical_Record/" + camper_id,
        {
          ...medicalRecordValues,
        }
      );
    }
    setIsSaving(false);
    sessionStorage.removeItem("camper_id");
    history.push("/parent");
  };

  const handleCamperChange = (name: string) => (e: { target: { value: any } }) => {
    setCamperValues({ ...camperValues, [name]: e.target.value });
  };

  const handleMedicalRecordChange = (name: string) => (e: { target: { value: any } }) => {
    setMedicalRecordValues({ ...medicalRecordValues, [name]: e.target.value });
  };

  const handleDeleteCamper = async (e: { preventDefault: () => void }) => {
    await axios.delete(process.env.REACT_APP_API + "api/campers/deleteCamper/" + sessionStorage.getItem("camper_id"));
    sessionStorage.removeItem("camper_id");
    history.push("/parent");
  };

  const handleDeleteCamperForm = () => {
    setDelForm(true);
  };

  const handleCancelDeleteCamperForm = () => {
    setDelForm(false);
  };

  const handleGoBack = () => {
    sessionStorage.removeItem("camper_id");
    history.goBack();
  };

  const DelForm = () => (
    <div className="form-popup" id="myForm">
      <p> Are you sure you want to delete this camper? </p>
      <Button variant="danger" className="formBtn" onClick={handleDeleteCamper}>
        Delete
      </Button>
      <br />
      <Button variant="secondary" className="formBtn" onClick={handleCancelDeleteCamperForm}>
        Cancel
      </Button>
    </div>
  );

  return (
    <div className="CamperForm">
      <br />
      <Container className="Text-Form">
        <Button variant="primary" className="backButton" onClick={handleGoBack}>
          Back
        </Button>
        <h3>Camper Form</h3>
        <br />
        <p>
          <b>*</b> Indicates a mandatory field.
        </p>
        {camper_id ? <p>Note: Please email info@campizza.com to change camper's <u>name</u> and <u>grade</u>.</p> : null}

        <Form onSubmit={handleSubmit}>
          <h5>Camper Info</h5>
          <Row>
            <Form.Group as={Col} controlId="camperFirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control
                required
                readOnly={isFieldReadOnly}
                value={camperValues.firstName}
                onChange={handleCamperChange("firstName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="camperLirstName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control
                required
                readOnly={isFieldReadOnly}
                value={camperValues.lastName}
                onChange={handleCamperChange("lastName")}
              />
            </Form.Group>
            <Form.Group as={Col} xs="3" controlId="camperGender">
              <Form.Label>
                <b>* </b>Gender
              </Form.Label>
              <Form.Control
                as="select"
                custom
                required
                value={camperValues.gender}
                onChange={handleCamperChange("gender")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="camperDob">
              <Form.Label>
                <b>* </b>Date of Birth
              </Form.Label>
              <input
                className="form-control"
                type="date"
                value={camperValues.dob}
                required
                onChange={handleCamperChange("dob")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="camperShirtSize">
              <Form.Label>
                <b>* </b>Shirt Size
              </Form.Label>
              <Form.Control
                as="select"
                custom
                required
                value={camperValues.shirtSize}
                onChange={handleCamperChange("shirtSize")}
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="camperGrade">
              <Form.Label>
                <b>* </b>Grade Level in Upcoming Fall
              </Form.Label>
              <Form.Control
                as="select"
                custom
                required
                disabled={isFieldReadOnly}
                value={camperValues.grade}
                onChange={handleCamperChange("grade")}
              >
                <option value={0}>Kindergarten</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="camperSchool">
              <Form.Label>
                <b>* </b>School Name
              </Form.Label>
              <Form.Control required value={camperValues.school} onChange={handleCamperChange("school")} />
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
                Does your child have any allergies and/or dietary restrictions? If <u>yes</u>, please list restrictions.
              </Form.Label>
              <Form.Control value={medicalRecordValues.allergies} onChange={handleMedicalRecordChange("allergies")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="restrictedActivities">
              <Form.Label>
                Are there any camp activities that your child cannot participate in? If <u>yes</u>, please list
                activities.
              </Form.Label>
              <Form.Control
                value={medicalRecordValues.restrictedActivities}
                onChange={handleMedicalRecordChange("restrictedActivities")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="illnesses">
              <Form.Label>
                Does your child have any chronic conditions or illnesses? If <u>yes</u>, please list conditions.
              </Form.Label>
              <Form.Control value={medicalRecordValues.illnesses} onChange={handleMedicalRecordChange("illnesses")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="medications">
              <Form.Label>
                Will your child be taking any medication at camp? If <u>yes</u>, please list medications.
              </Form.Label>
              <Form.Control
                value={medicalRecordValues.medications}
                onChange={handleMedicalRecordChange("medications")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="medicalTreatments">
              <Form.Label>
                Has your child undergone any medical treatments? If <u>yes</u>, please list treatments.
              </Form.Label>
              <Form.Control
                value={medicalRecordValues.medicalTreatments}
                onChange={handleMedicalRecordChange("medicalTreatments")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="immunizations">
              <Form.Label>
                <b>* </b>Has your child received all current immunizations?
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
          <Row>
            <Form.Group as={Col} controlId="tetanusDate">
              <Form.Label>
                <b>* </b>What is the date (approximate if necessary) of your child's last tetanus shot?
              </Form.Label>
              <input
                className="form-control"
                type="date"
                required
                value={medicalRecordValues.tetanusDate}
                onChange={handleMedicalRecordChange("tetanusDate")}
              />
            </Form.Group>
          </Row>

          <br />
          <h5>Extra Comments</h5>
          <Row>
            <Form.Group as={Col} controlId="comments">
              <Form.Label>Do you have any additional comments about this camper?</Form.Label>
              <textarea
                className="form-control"
                value={medicalRecordValues.comments}
                onChange={handleMedicalRecordChange("comments")}
              />
            </Form.Group>
          </Row>

          <div className="center">
            <Button type="submit" variant="success" className="buttonTxt" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
          <br />
          <hr />
          <br />
          {sessionStorage.getItem("camper_id") && (
            <div className="center">
              <Button variant="danger" onClick={handleDeleteCamperForm}>
                Delete Camper
              </Button>
            </div>
          )}

          {showDelForm && <DelForm />}
        </Form>
      </Container>
    </div>
  );
}
