// Page for parents to fill out their child's camper form

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

    userID: null,
  });

  React.useEffect(() => {
    const currentUser = AuthService.currentUser();
    let user_id = currentUser.id;
    let name: string | null;
    let named: string | null;
    name = localStorage.getItem("currentChild");
    if (typeof name == "string" && name !== "") {
      named = name;
      CamperService.getInfo(named, user_id).then((response) => {
        if (response.status === 200) {
          setValues(response.data);
          setInitFirstName(response.data.firstName);
          setInitLastName(response.data.lastName);
        } else if (response.status === 400) {
          return false;
        }
      });
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const currentUser = AuthService.currentUser();
    let user_id = currentUser.id;
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
            <Button
              variant="primary"
              className="backButton"
              href="/#/CounselorInfo"
            >
              Back
            </Button>
            <br />
            <br />
            <h3> Edit Profile </h3>
            <br />
            <p>
              <b>* </b>Indicates a mandatory field.
            </p>
            <p>Note: Please email omarezz@gmail.com to change camper's name.</p>
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
              <b>* </b>Are there any camp activities that you cannot participate
              in? If <u>yes</u>, please list activities.
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
              <b>* </b>Have you undergone any medical treatments? If <u>yes</u>,
              please list treatments.
            </p>
            <select
              className="sameRow"
              required
              onChange={handleChange("medical_treatments")}
              value={values.medical_treatments}
            >
              <option value=""> -- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              className="sameRow"
              type="text"
              onChange={handleChange("medical_treatment_names")}
              defaultValue={values.medical_treatment_names}
            />

            <p>
              <b>* </b>Have you received all current immunizations?
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

            <p>
              <b>* </b>What is the date (approximate if necessary) of your last
              tetanus shot?
            </p>
            <input
              type="date"
              required
              onChange={handleChange("tetanus_date")}
              defaultValue={values.tetanus_date}
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
          </form>
        </Container>
      </body>
    </div>
  );
};
export default CounselorForm;
