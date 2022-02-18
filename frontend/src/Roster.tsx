// Page for admin to filter and view camp roster

import axios from "axios";
import React from "react";
import { Container, Table, ProgressBar, Button } from "react-bootstrap";
import { CamperRoster, Emergency_Contact, Camp_Week } from "./models/models";

export default function Roster() {
  const [isLoading, setisLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(50);
  const [campWeeks, setCampWeeks] = React.useState<Camp_Week[]>([]);
  const [data, setData] = React.useState<CamperRoster[]>([]);
  const fieldNames = [
    "Child ID",
    "First Name",
    "Last Name",
    "Gender",
    "Date of Birth",
    "School",
    "Grade",
    "Shirt Size",
    "# of Shirts",
    "Doctor Name",
    "Doctor Phone",
    "Insurance",
    "Policy Holder",
    "Illnesses",
    "Allergies/Dietary Restrictions",
    "Medications",
    "Restricted Activities",
    "Medical Treatments",
    "Immunizations",
    "Tetanus Date",
    "Comments",
    "Guardian 1 First Name",
    "Guardian 1 Last Name",
    "Guardian 1 Phone #",
    "Guardian 1 Email",
    "Guardian 2 First Name",
    "Guardian 2 Last Name",
    "Guardian 2 Phone #",
    "Guardian 2 Email",
    "Address 1",
    "Address 2",
    "City",
    "State",
    "Zip Code",
    "Country",
    "Emergency Contact 1 First Name",
    "Emergency Contact 1 Last Name",
    "Emergency Contact 1 Phone #",
    "Emergency Contact 1 Relation",
    "Emergency Contact 1 Authorized",
    "Emergency Contact 2 First Name",
    "Emergency Contact 2 Last Name",
    "Emergency Contact 2 Phone #",
    "Emergency Contact 2 Relation",
    "Emergency Contact 2 Authorized",
    "Amount Paid",
    "Credit",
  ];

  React.useEffect(() => {
    (async () => {
      await axios.get(`${process.env.REACT_APP_API}/api/camp_weeks/getCamp_WeeksCurrentYear`).then((res) => {
        setCampWeeks(res.data);
      });
      await axios.get(`${process.env.REACT_APP_API}/api/campers/getCampersRoster`).then(async (res) => {
        const tempData = res.data;
        for (let i = 0; i < tempData.length; i++) {
          await axios
            .get(
              `${process.env.REACT_APP_API}/api/emergency_contacts/getEmergency_ContactsByUserID/${tempData[i].parent_id}`
            )
            .then((res) => {
              const emergencyContacts: Emergency_Contact[] = res.data;
              tempData[i] = {
                ...tempData[i],
                emergency_contacts1: { ...emergencyContacts[0], authPickUp: Boolean(emergencyContacts[0].authPickUp) },
                emergency_contacts2: { ...emergencyContacts[1], authPickUp: Boolean(emergencyContacts[1].authPickUp) },
              };
            });
          await axios
            .get(
              `${process.env.REACT_APP_API}/api/registered_camper_weeks/getRegistered_Camper_WeeksWithCamp_WeeksByCamperID/${tempData[i].camper_id}`
            )
            .then((res) => {
              tempData[i] = {
                ...tempData[i],
                registeredWeeks: res.data.map((week: any) => week.registered_camp_week_id),
              };
            });
        }
        setData(res.data);
        console.log(res.data);
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setisLoading(true);
    })();
  }, []);

  const handleDownload = () => {
    const csv = data;
    const csvData = new Blob([JSON.stringify(csv)], { type: "text/json" });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "roster.csv");
    tempLink.click();
  };

  return (
    <Container className="Schedule-Table">
      <Button variant="primary" className="backButton" href="#/admin">
        Back
      </Button>
      <h3>Roster</h3>
      <Button style={{ marginLeft: "80%" }} onClick={handleDownload}>
        Download CSV
      </Button>
      {isLoading ? (
        <Table striped bordered style={{ marginTop: 30 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              {campWeeks.map((week) => (
                <th key={week.id}>{week.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.camperFirstName}</td>
                <td>{item.camperLastName}</td>
                {item.registeredWeeks.map((reg) => (reg ? <td>1</td> : <td>0</td>))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
      )}
    </Container>
  );
}
