import React from "react";
import AuthService from "./services/auth-service";
import CamperService from "./services/camper-service";
import { Button } from "react-bootstrap";

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

export const CamperInfo: React.FC<Props> = (props: Props) => {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    genderEnum: "",
    dobDate: "",
    schoolName: "",
    gradeNum: 0,
    shirtEnum: "",
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
    comment: "",

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
        } else if (response.status === 400) {
          return false;
        }
      });
    }
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ marginLeft: "2.5%" }}>
        <Button
          variant="outline-primary"
          className="backButton"
          href="/#/parent"
        >
          {" "}
          Back to Dashboard{" "}
        </Button>
      </div>
      <body style={{ textAlign: "center" }}>
        <br />
        <h1>
          {values.firstName} {values.lastName}
        </h1>
        <br />
        <Button
          style={{ backgroundColor: "#3E9724" }}
          variant="primary"
          href="/#/CamperForm"
        >
          {" "}
          Edit Camper{" "}
        </Button>
      </body>

      <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "3%" }}>
        <table>
          {" "}
          <h4>Camper Info</h4>
          <tr>
            <td>Gender</td>
            <td>{values.genderEnum}</td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Date of Birth</td>
            <td>{values.dobDate}</td>
          </tr>
          <tr>
            <td>Shirt Size</td>
            <td>{values.shirtEnum}</td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Grade</td>
            <td>{values.gradeNum}</td>
          </tr>
          <tr>
            <td>Elementary School</td>
            <td>{values.schoolName}</td>
          </tr>
        </table>
        <br />
        <table>
          {" "}
          <h4>Health Info</h4>
          <tr>
            <td>Primary Physician's Name</td>
            <td>{values.doctorName}</td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Primary Physician's Phone #</td>
            <td>{values.doctorPhone}</td>
          </tr>
          <tr>
            <td>Insurance Carrier</td>
            <td>{values.insurance}</td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Policy Holder's Name</td>
            <td>{values.policy_holder}</td>
          </tr>
        </table>
        <br />
        <table>
          {" "}
          <h4>Health Questionaire</h4>
          <tr>
            <td>Chronic Conditions</td>
            <td>{values.illnesses_names ? values.illnesses_names : "N/A"}</td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Allergies/Dietary Restrictions</td>
            <td>{values.allergy_names ? values.allergy_names : "N/A"}</td>
          </tr>
          <tr>
            <td>Medication(s)</td>
            <td>{values.medication_names ? values.medication_names : "N/A"}</td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Restricted Camp Activities</td>
            <td>{values.activity_names ? values.activity_names : "N/A"}</td>
          </tr>
          <tr>
            <td>Medical Treatments</td>
            <td>
              {values.medical_treatment_names
                ? values.medical_treatment_names
                : "N/A"}
            </td>
          </tr>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <td>Curren mmunizations</td>
            <td>{values.immunizations}</td>
          </tr>
          <tr>
            <td>Last Tetanus Shot</td>
            <td>{values.tetanus_date}</td>
          </tr>
        </table>
        <br />
        <table>
          {" "}
          <h4>Additional Notes</h4>
          <tr>
            <td>{values.comment}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CamperInfo;
