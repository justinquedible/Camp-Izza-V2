// Page for couselors to signup with their information

import React from "react";
import { Button, Container } from "react-bootstrap";
import "./HouseholdForm.css";

import axios from "axios";
import AuthService from "./services/auth-service";
import CamperService from "./services/camper-service";
import ParentService from "./services/parent-service";

interface Props {
  firstName: string;
  lastName: string;
  genderEnum: string;
  dobDate: string;
  schoolName: string;
  gradeNum: number;
  shirtEnum: string;
  doctorName: string;
  doctorPhone: string;
  insurance: string;
  policy_holder: string;
  illnesses: string;
  allergies: string;
  medication: string;
  medication_names: string;
  activities: string;
  activity_names: string;
  medical_treatments: string;
  medical_treatment_names: string;
  immunizations: string;
  tetanus_date: string;
  comment: string;
  parent: number;
  camperName: string;
}

export const CounselorForm: React.FC<Props> = () => {
  // For making first and last names readonly if its already set
  const [initFirstName, setInitFirstName] = React.useState("");
  const [initLastName, setInitLastName] = React.useState("");

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    genderEnum: "-- Select --", // Default to other. If they do not select anything, I don't want it to crash the db due to a val not equaling male,female,other
    dobDate: "",
    phone: "",
    altPhone: "",
    email: "",
    doctorName: "",
    doctorPhone: "",
    insurance: "",
    policy_holder: "",
    illnesses: "-- Select --",
    illnesses_names: "",
    allergies: "-- Select --",
    allergy_names: "",
    medication: "-- Select --",
    medication_names: "",
    activities: "-- Select --",
    activity_names: "",
    medical_treatments: "-- Select --",
    medical_treatment_names: "",
    immunizations: "-- Select --",
    tetanus_date: "",
    emergency_contact_name_1: "",
    emergency_contact_phone_1: "",
    emergency_contact_relation_1: "",
    emergency_contact_name_2: "",
    emergency_contact_phone_2: "",
    emergency_contact_relation_2: "",
    userID: null,
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
    e.preventDefault();
    // const {firstName, lastName, genderEnum, dobDate, doctorName, doctorPhone, insurance, policy_holder, illnesses, illnesses_names, allergy_names,
    //     allergies, medication, medication_names, activities, activity_names, medical_treatments, medical_treatment_names,
    //     immunizations, tetanus_date, comment} = values;

    // await CamperService.addCamper(firstName, lastName, genderEnum, dobDate, doctorName, doctorPhone, insurance,
    //     policy_holder, illnesses,illnesses_names, allergies, allergy_names, medication, medication_names, activities, activity_names, medical_treatments,
    //     medical_treatment_names, immunizations, tetanus_date, comment, user_id);
    // window.location.href = "#/Parent"

    window.location.reload();
  };
  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div className="CamperForm">
      <body>
        <br />
        <Container className="Text-Form">
          <form onSubmit={handleSubmit}>
            <Button variant="primary" className="backButton" href="/#/login">
              Back to Log In
            </Button>
            <br />
            <br />
            <h3> Counselor Sign Up </h3>
            <br />
            <p>
              <b>* </b>Indicates a mandatory field.
            </p>
            <h5> Counselor Info </h5>
            <p>
              <b>* </b>First Name
            </p>
            {initFirstName === "" ? (
              <input
                type="text2"
                required
                readOnly={initFirstName !== ""}
                onChange={handleChange("firstName")}
                defaultValue={values.firstName}
              />
            ) : (
              <p style={{ marginBottom: 15, color: "#949494" }}>
                {values.firstName}
              </p>
            )}
            <p>
              <b>* </b>Last Name
            </p>
            {initLastName === "" ? (
              <input
                type="text2"
                required
                readOnly={initLastName !== ""}
                onChange={handleChange("lastName")}
                defaultValue={values.lastName}
              />
            ) : (
              <p style={{ marginBottom: 15, color: "#949494" }}>
                {values.lastName}
              </p>
            )}
            <p>
              <b>* </b>Gender
            </p>
            <select
              onChange={handleChange("genderEnum")}
              required
              value={values.genderEnum}
            >
              <option value=""> -- Select --</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <p>
              <b>* </b>Date of Birth
            </p>
            <input
              type="date"
              required
              onChange={handleChange("dobDate")}
              defaultValue={values.dobDate}
            />
            <p>
              <b>* </b>Phone Number
            </p>
            <input
              type="text"
              required
              onChange={handleChange("phone")}
              defaultValue={values.phone}
              placeholder={"000-000-0000"}
            />
            <p>
              <b>* </b>Alternative Phone Number
            </p>
            <input
              type="text"
              required
              onChange={handleChange("altPhone")}
              defaultValue={values.altPhone}
              placeholder={"000-000-0000"}
            />
            <p>
              <b>* </b>Email
            </p>
            <input
              type="text"
              required
              onChange={handleChange("email")}
              defaultValue={values.email}
            />
            <h5> Health Info </h5>
            <p>
              <b>* </b>Primary Physician's Name
            </p>
            <input
              type="text"
              required
              onChange={handleChange("doctorName")}
              defaultValue={values.doctorName}
            />
            <p>
              <b>* </b>Primary Physician's Phone Number
            </p>
            <input
              type="text"
              required
              onChange={handleChange("doctorPhone")}
              defaultValue={values.doctorPhone}
              placeholder={"000-000-0000"}
            />
            <p>
              <b>* </b>Insurance Carrier
            </p>
            <input
              type="text"
              required
              onChange={handleChange("insurance")}
              defaultValue={values.insurance}
            />
            <p>
              <b>* </b>Policy Holder's Name
            </p>
            <input
              type="text"
              required
              onChange={handleChange("policy_holder")}
              defaultValue={values.policy_holder}
            />
            <br />
            <h5> Health Questionnaire </h5>
            <p>
              <b>* </b>Do you have any chronic conditions or illnesses? If{" "}
              <u>yes</u>, please list conditions.
            </p>
            <select
              className="sameRow"
              required
              onChange={handleChange("illnesses")}
              value={values.illnesses}
            >
              <option value=""> -- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              className="sameRow"
              type="text"
              onChange={handleChange("illnesses_names")}
              defaultValue={values.illnesses_names}
            />
            <p>
              <b>* </b>Do you have any allergies and/or dietary restrictions? If{" "}
              <u>yes</u>, please list restrictions.
            </p>
            <select
              className="sameRow"
              required
              onChange={handleChange("allergies")}
              value={values.allergies}
            >
              <option value=""> -- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              className="sameRow"
              type="text"
              onChange={handleChange("allergy_names")}
              defaultValue={values.allergy_names}
            />
            <p>
              <b>* </b>Will you be taking any medication at camp? If <u>yes</u>,
              please list medications.
            </p>
            <select
              className="sameRow"
              required
              onChange={handleChange("medication")}
              value={values.medication}
            >
              <option value=""> -- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              className="sameRow"
              type="text"
              onChange={handleChange("medication_names")}
              defaultValue={values.medication_names}
            />
            <p>
              <b>* </b>Do you require any accommodations in order to perform the
              duties of this job? If <u>yes</u>, please list the accommodations
              you require.
            </p>
            <select
              className="sameRow"
              required
              onChange={handleChange("activities")}
              value={values.activities}
            >
              <option value=""> -- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              className="sameRow"
              type="text"
              onChange={handleChange("activity_names")}
              defaultValue={values.activity_names}
            />
            <p>
              <b>* </b>Have you received all required immunizations? Please see
              the job description for a detailed list of the required
              immunizations.
            </p>
            <select
              required
              onChange={handleChange("immunizations")}
              value={values.immunizations}
            >
              <option value=""> -- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <h5> Emergency Contact </h5>
            <p>
              <b>* </b>Emergency Contact Name #1
            </p>
            <input
              type="text"
              required
              onChange={handleChange("emergency_contact_name_1")}
              defaultValue={values.emergency_contact_name_1}
            />
            <p>
              <b>* </b>Emergency Contact's Phone Number #1
            </p>
            <input
              type="text"
              required
              onChange={handleChange("emergency_contact_phone_1")}
              defaultValue={values.emergency_contact_phone_1}
              placeholder={"000-000-0000"}
            />
            <p>
              <b>* </b>Relationship to Emergency Contact #1
            </p>
            <input
              type="text"
              required
              onChange={handleChange("emergency_contact_relation_1")}
              defaultValue={values.emergency_contact_relation_1}
            />
            <p>
              <b>* </b>Emergency Contact Name #2
            </p>
            <input
              type="text"
              required
              onChange={handleChange("emergency_contact_name_2")}
              defaultValue={values.emergency_contact_name_2}
            />
            <p>
              <b>* </b>Emergency Contact's Phone Number #2
            </p>
            <input
              type="text"
              required
              onChange={handleChange("emergency_contact_phone_2")}
              defaultValue={values.emergency_contact_phone_2}
              placeholder={"000-000-0000"}
            />
            <p>
              <b>* </b>Relationship to Emergency Contact #2
            </p>
            <input
              type="text"
              required
              onChange={handleChange("emergency_contact_relation_2")}
              defaultValue={values.emergency_contact_relation_2}
            />
            <p></p>
            <br />
            <br />
            <div
              className="center"
              style={{ marginLeft: "30%", marginRight: "30%" }}
            >
              <Button
                variant="outline-primary"
                className="login-button"
                type="submit"
                href="/#/counselor/pending"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <p className="fineText">
                Upon sign up as a counselor, your account will be pending until
                admin approval is received. If admin approval is not received,
                your account will be deleted. Please contact Camp Izza for
                further details.
              </p>
              <p className="fineText">
                Already a user? <a href="/#/login"> Log In </a>
              </p>
            </div>
            <br />
            <hr />
            <br />
          </form>
        </Container>
      </body>
    </div>
  );
};
export default CounselorForm;
