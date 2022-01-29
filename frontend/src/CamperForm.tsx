// Page for parents to fill out their child's camper form

import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "./HouseholdForm.css";

import axios from "axios";
// import AuthService from "./services/auth-service";
// import CamperService from "./services/camper-service";
// import ParentService from "./services/parent-service";

export default function CamperForm() {
  const [showDelForm, setDelForm] = React.useState(false);

  // For making first and last names readonly if its already set
  const [initFirstName, setInitFirstName] = React.useState("");
  const [initLastName, setInitLastName] = React.useState("");

  const DelForm = () => (
    <div className="form-popup" id="myForm">
      <form className="form-container center">
        <p> Are you sure you want to delete this camper? </p>
        <Button variant="danger" className="formBtn" onClick={handleDeleteCamper}>
          Delete
        </Button>
        <br />
        <Button variant="secondary" className="formBtn" onClick={handleCancelDeleteCamperForm}>
          Cancel
        </Button>
      </form>
    </div>
  );

  const handleCancelDeleteCamperForm = () => {
    setDelForm(false);
  };

  const [camperValues, setCamperValues] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    grade: "",
    school: "",
    shirtSize: "",
  });

  const [medicalRecordValues, setMedicalRecordValues] = React.useState({
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
    comment: "",
  });

  React.useEffect(() => {
    // const currentUser = AuthService.currentUser();
    // let user_id = currentUser.id;
    // let name: string | null;
    // let named: string | null;
    // name = localStorage.getItem("currentChild");
    // if (typeof name == "string" && name !== "") {
    //   named = name;
    //   CamperService.getInfo(named, user_id).then((response) => {
    //     if (response.status === 200) {
    //       setValues(response.data);
    //       setInitFirstName(response.data.firstName);
    //       setInitLastName(response.data.lastName);
    //     } else if (response.status === 400) {
    //       return false;
    //     }
    //   });
    // }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // const currentUser = AuthService.currentUser();
    // let user_id = currentUser.id;
    // e.preventDefault();
    // const {
    //   firstName,

    // } = values;

    // await CamperService.addCamper(

    // );
    window.location.href = "#/Parent";

    window.location.reload();
  };

  const handleCamperChange = (name: string) => (e: { target: { value: any } }) => {
    setCamperValues({ ...camperValues, [name]: e.target.value });
  };

  const handleMedicalRecordChange = (name: string) => (e: { target: { value: any } }) => {
    setMedicalRecordValues({ ...medicalRecordValues, [name]: e.target.value });
  };

  const handleDeleteCamper = async (e: { preventDefault: () => void }) => {
    // e.preventDefault();
    // let camperID = localStorage.getItem("currentChildID");
    // if (camperID != null) {
    //   await CamperService.delCamper(parseInt(camperID));
    // }
    // window.location.href = "#/Parent";
    // window.location.reload();
  };

  const handleDeleteCamperForm = () => {
    setDelForm(true);
  };

  return (
    <div className="CamperForm">
      <br />
      <Container className="Text-Form">
        <Button variant="primary" className="backButton" href="/#/parent">
          Back to Dashboard
        </Button>
        <h3>Camper Form</h3>
        <br />
        <p>
          <b>*</b> Indicates a mandatory field.
        </p>
        <p>Note: Please email omarezz@gmail.com to change camper's name.</p>

        <Form onSubmit={handleSubmit}>
          <h5>Camper Info</h5>
          <Row>
            <Form.Group as={Col} controlId="camperFirstName">
              <Form.Label>
                <b>* </b>First Name
              </Form.Label>
              <Form.Control required defaultValue={camperValues.firstName} onChange={handleCamperChange("firstName")} />
            </Form.Group>
            <Form.Group as={Col} controlId="camperLirstName">
              <Form.Label>
                <b>* </b>Last Name
              </Form.Label>
              <Form.Control required defaultValue={camperValues.lastName} onChange={handleCamperChange("lastName")} />
            </Form.Group>
            <Form.Group as={Col} xs="2" controlId="camperGender">
              {/* <Form.Label>
                <b>* </b>Gender
              </Form.Label> */}
              {/* TODO: Dropdown for gender */}
              {/* <Form.Control required defaultValue={camperValues.gender} onChange={handleCamperChange("gender")} /> */}
              {/* <Form.Select aria-label="Gender">
                <option>--Select--</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </Form.Select> */}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="camperDob">
              <Form.Label>
                <b>* </b>Date of Birth
              </Form.Label>
              {/* TODO: Date selector */}
              <Form.Control required defaultValue={camperValues.dob} onChange={handleCamperChange("dob")} />
            </Form.Group>
            <Form.Group as={Col} controlId="camperShirtSize">
              <Form.Label>
                <b>* </b>Shirt Size
              </Form.Label>
              {/* TODO: Dropdown for shirt size */}
              <Form.Control required defaultValue={camperValues.shirtSize} onChange={handleCamperChange("shirtSize")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="camperGrade">
              <Form.Label>
                <b>* </b>Grade Level
              </Form.Label>
              {/* TODO: Dropdown for grade */}
              <Form.Control required defaultValue={camperValues.grade} onChange={handleCamperChange("grade")} />
            </Form.Group>
            <Form.Group as={Col} controlId="camperSchool">
              <Form.Label>
                <b>* </b>School Name
              </Form.Label>
              <Form.Control required defaultValue={camperValues.school} onChange={handleCamperChange("school")} />
            </Form.Group>
          </Row>

          <br />
          <h5>Residence</h5>
          {/* <Row>
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
          </Row> */}

          <div className="center">
            {/* <Button type="submit" variant="success" className="buttonTxt" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button> */}
          </div>
        </Form>
        {/* <form onSubmit={handleSubmit}>
          <Button variant="primary" className="backButton" href="/#/parent">
            Back to Dashboard
          </Button>
          <br />
          <br />
          <h3>Camper Form</h3>
          <br />
          <p>
            <b>* </b>Indicates a mandatory field.
          </p>
          <p>Note: Please email omarezz@gmail.com to change camper's name.</p>
          <h5> Camper Info </h5>

          <p>
            <b>* </b>First Name
          </p>

          {initFirstName === "" ? (
            <input
              type="text2"
              required
              readOnly={initFirstName !== ""}
              onChange={handleCamperChange("firstName")}
              defaultValue={camperValues.firstName}
            />
          ) : (
            <p style={{ marginBottom: 15, color: "#949494" }}>{camperValues.firstName}</p>
          )}

          <p>
            <b>* </b>Last Name
          </p>

          {initLastName === "" ? (
            <input
              type="text2"
              required
              readOnly={initLastName !== ""}
              onChange={handleCamperChange("lastName")}
              defaultValue={camperValues.lastName}
            />
          ) : (
            <p style={{ marginBottom: 15, color: "#949494" }}>{camperValues.lastName}</p>
          )}
          <p>
            <b>* </b>School Name
          </p>
          <input
            type="text"
            required
            onChange={handleCamperChange("schoolName")}
            defaultValue={camperValues.schoolName}
          />

          <p>
            <b>* </b>Grade Level
          </p>
          <select onChange={handleCamperChange("gradeNum")} required value={camperValues.gradeNum}>
            <option value=""> -- Select --</option>
            <option value="-1">Pre-Kindergarten</option>
            <option value="0">Kindergarten</option>
            <option value="1">1st Grade</option>
            <option value="2">2nd Grade</option>
            <option value="3">3rd Grade</option>
            <option value="4">4th Grade</option>
            <option value="5">5th Grade</option>
            <option value="6">6th Grade</option>
            <option value="7">7th Grade</option>
            <option value="8">8th Grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
          </select>

          <p>
            <b>* </b>Gender
          </p>
          <select onChange={handleCamperChange("genderEnum")} required value={values.genderEnum}>
            <option value=""> -- Select --</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <p>
            <b>* </b>Shirt Size
          </p>
          <select onChange={handleCamperChange("shirtEnum")} required value={values.shirtEnum}>
            <option value=""> -- Select --</option>
            <option value="XSMALL">Extra Small</option>
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
            <option value="XLARGE">Extra Large</option>
          </select>

          <p>
            <b>* </b>Date of Birth
          </p>
          <input type="date" required onChange={handleCamperChange("dobDate")} defaultValue={values.dobDate} />

          <h5> Health Info </h5>

          <p>
            <b>* </b>Primary Physician's Name
          </p>
          <input
            type="text"
            required
            onChange={handleMedicalRecordChange("doctorName")}
            defaultValue={values.doctorName}
          />
          <p>
            <b>* </b>Primary Physician's Phone Number
          </p>
          <input
            type="text"
            required
            onChange={handleMedicalRecordChange("doctorPhone")}
            defaultValue={values.doctorPhone}
            placeholder={"000-000-0000"}
          />
          <p>
            <b>* </b>Insurance Carrier
          </p>
          <input
            type="text"
            required
            onChange={handleMedicalRecordChange("insurance")}
            defaultValue={values.insurance}
          />
          <p>
            <b>* </b>Policy Holder's Name
          </p>
          <input
            type="text"
            required
            onChange={handleMedicalRecordChange("policy_holder")}
            defaultValue={values.policy_holder}
          />
          <br />

          <h5> Health Questionnaire </h5>

          <p>
            <b>* </b>Does your child have any chronic conditions or illnesses? If <u>yes</u>, please list conditions.
          </p>
          <select
            className="sameRow"
            required
            onChange={handleMedicalRecordChange("illnesses")}
            value={values.illnesses}
          >
            <option value=""> -- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            className="sameRow"
            type="text"
            onChange={handleMedicalRecordChange("illnesses_names")}
            defaultValue={values.illnesses_names}
          />

          <p>
            <b>* </b>Does your child have any allergies and/or dietary restrictions? If <u>yes</u>, please list
            restrictions.
          </p>
          <select
            className="sameRow"
            required
            onChange={handleMedicalRecordChange("allergies")}
            value={values.allergies}
          >
            <option value=""> -- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            className="sameRow"
            type="text"
            onChange={handleMedicalRecordChange("allergy_names")}
            defaultValue={values.allergy_names}
          />

          <p>
            <b>* </b>Will your child be taking any medication at camp? If <u>yes</u>, please list medications.
          </p>
          <select
            className="sameRow"
            required
            onChange={handleMedicalRecordChange("medication")}
            value={values.medication}
          >
            <option value=""> -- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            className="sameRow"
            type="text"
            onChange={handleMedicalRecordChange("medication_names")}
            defaultValue={values.medication_names}
          />

          <p>
            <b>* </b>Are there any camp activities that your child cannot participate in? If <u>yes</u>, please list
            activities.
          </p>
          <select
            className="sameRow"
            required
            onChange={handleMedicalRecordChange("activities")}
            value={values.activities}
          >
            <option value=""> -- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            className="sameRow"
            type="text"
            onChange={handleMedicalRecordChange("activity_names")}
            defaultValue={values.activity_names}
          />

          <p>
            <b>* </b>Has your child undergone any medical treatments? If <u>yes</u>, please list treatments.
          </p>
          <select
            className="sameRow"
            required
            onChange={handleMedicalRecordChange("medical_treatments")}
            value={values.medical_treatments}
          >
            <option value=""> -- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            className="sameRow"
            type="text"
            onChange={handleMedicalRecordChange("medical_treatment_names")}
            defaultValue={values.medical_treatment_names}
          />

          <p>
            <b>* </b>Has your child received all current immunizations?
          </p>
          <select required onChange={handleMedicalRecordChange("immunizations")} value={values.immunizations}>
            <option value=""> -- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <p>
            <b>* </b>What is the date (approximate if necessary) of your child's last tetanus shot?
          </p>
          <input
            type="date"
            required
            onChange={handleMedicalRecordChange("tetanus_date")}
            defaultValue={values.tetanus_date}
          />

          <h5> Extra Comments </h5>

          <p> Do you have any additional comments about this camper? </p>
          <textarea
            name="paragraph_text"
            onChange={handleMedicalRecordChange("comment")}
            defaultValue={values.comment}
          />

          <br />
          <br />

          <div className="center">
            <Button variant="success" className="buttonTxt" type="submit">
              {" "}
              Save{" "}
            </Button>
          </div>
          <br />
          <hr />
          <br />
          <div className="center">
            <Button variant="danger" onClick={handleDeleteCamperForm}>
              {" "}
              Delete Camper{" "}
            </Button>
          </div>

          {showDelForm ? <DelForm /> : null}
        </form> */}
      </Container>
    </div>
  );
}
