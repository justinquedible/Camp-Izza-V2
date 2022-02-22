// Page for admin to filter and view camp roster

import axios from "axios";
import React from "react";
import { Container, Table, ProgressBar, Button } from "react-bootstrap";
import { CamperRoster, Emergency_Contact, Camp_Week } from "./models/models";
import { dateTimeToDateInput } from "./utils/DateTimeUtil";

export default function Roster() {
  const [isLoading, setisLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [data, setData] = React.useState<CamperRoster[]>([]);
  const [fieldNames, setFieldNames] = React.useState([
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
    "Guardian's Credit",
  ]);

  React.useEffect(() => {
    (async () => {
      await axios.get(`${process.env.REACT_APP_API}/api/camp_weeks/getCamp_WeeksCurrentYear`).then((res) => {
        fieldNames.splice(9, 0, ...res.data.map((week: Camp_Week) => week.name));
        setFieldNames([...fieldNames]);
      });
      await axios.get(`${process.env.REACT_APP_API}/api/campers/getCampersRoster`).then(async (res) => {
        const tempData = res.data;
        const numCampers = tempData.length;
        for (let i = 0; i < tempData.length; i++) {
          await axios
            .get(
              `${process.env.REACT_APP_API}/api/emergency_contacts/getEmergency_ContactsByUserID/${tempData[i].parent_id}`
            )
            .then((res) => {
              const emergencyContacts: Emergency_Contact[] = res.data;
              tempData[i] = {
                ...tempData[i],
                emergencyContact1: { ...emergencyContacts[0], authPickUp: Boolean(emergencyContacts[0].authPickUp) },
                emergencyContact2: { ...emergencyContacts[1], authPickUp: Boolean(emergencyContacts[1].authPickUp) },
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
          setProgress((i / numCampers) * 100);
        }
        setData(tempData);
        console.log(tempData);
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setisLoading(true);
    })();
  }, []);

  const handleDownload = () => {
    let csv = fieldNames.join(",") + "\n";
    data.forEach((e: CamperRoster) => {
      csv += `"${e.camper_id}","${e.camperFirstName}","${e.camperLastName}","${e.gender}",\
"${dateTimeToDateInput(e.dob)}","${e.school}","${e.grade}","${e.shirtSize}","${e.numShirts}",\
${e.registeredWeeks.map((wk) => (wk ? 1 : 0)).join(",")},"${e.doctorName}","${e.doctorPhone}",\
"${e.insuranceCarrier}","${e.policyHolder}","${e.illnesses}","${e.allergies}","${e.medications}",\
"${e.restrictedActivities}","${e.medicalTreatments}","${e.immunizations}",\
"${dateTimeToDateInput(e.tetanusDate)}","${e.comments}","${e.parentFirstName}","${e.parentLastName}",\
"${e.phone}","${e.email}","${e.guardian2FirstName}","${e.guardian2LastName}","${e.guardian2Phone}",\
"${e.guardian2Email}","${e.addressLine1}","${e.addressLine2}","${e.city}","${e.state}","${e.zipCode}",\
"${e.country}","${e.emergencyContact1.firstName}","${e.emergencyContact1.lastName}",\
"${e.emergencyContact1.phone}","${e.emergencyContact1.relation}","${e.emergencyContact1.authPickUp ? 1 : 0}",\
"${e.emergencyContact2.firstName}","${e.emergencyContact2.lastName}","${e.emergencyContact2.phone}",\
"${e.emergencyContact2.relation}","${e.emergencyContact2.authPickUp ? "1" : "0"}","${e.paid}","${e.credit}"`;
      csv += "\n";
    });
    const csvData = new Blob([csv], { type: "text/csv" });
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
      {isLoading ? (
        <div>
          <Button style={{ marginLeft: "80%" }} onClick={handleDownload}>
            Download CSV
          </Button>
          <Table striped bordered style={{ marginTop: 30 }}>
            <thead>
              <tr>
                {fieldNames.map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.camper_id}</td>
                  <td>{item.camperFirstName}</td>
                  <td>{item.camperLastName}</td>
                  <td>{item.gender}</td>
                  <td>{dateTimeToDateInput(item.dob)}</td>
                  <td>{item.school}</td>
                  <td>{item.grade}</td>
                  <td>{item.shirtSize}</td>
                  <td>{item.numShirts}</td>
                  {item.registeredWeeks.map((wk, index) => (wk ? <td key={index}>1</td> : <td key={index}>0</td>))}
                  <td>{item.doctorName}</td>
                  <td>{item.doctorPhone}</td>
                  <td>{item.insuranceCarrier}</td>
                  <td>{item.policyHolder}</td>
                  <td>{item.illnesses}</td>
                  <td>{item.allergies}</td>
                  <td>{item.medications}</td>
                  <td>{item.restrictedActivities}</td>
                  <td>{item.medicalTreatments}</td>
                  <td>{item.immunizations}</td>
                  <td>{dateTimeToDateInput(item.tetanusDate)}</td>
                  <td>{item.comments}</td>
                  <td>{item.parentFirstName}</td>
                  <td>{item.parentLastName}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.guardian2FirstName}</td>
                  <td>{item.guardian2LastName}</td>
                  <td>{item.guardian2Phone}</td>
                  <td>{item.guardian2Email}</td>
                  <td>{item.addressLine1}</td>
                  <td>{item.addressLine2}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipCode}</td>
                  <td>{item.country}</td>
                  <td>{item.emergencyContact1.firstName}</td>
                  <td>{item.emergencyContact1.lastName}</td>
                  <td>{item.emergencyContact1.phone}</td>
                  <td>{item.emergencyContact1.relation}</td>
                  <td>{item.emergencyContact1.authPickUp ? 1 : 0}</td>
                  <td>{item.emergencyContact2.firstName}</td>
                  <td>{item.emergencyContact2.lastName}</td>
                  <td>{item.emergencyContact2.phone}</td>
                  <td>{item.emergencyContact2.relation}</td>
                  <td>{item.emergencyContact2.authPickUp ? 1 : 0}</td>
                  <td>{item.paid}</td>
                  <td>{item.credit}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
      )}
    </Container>
  );
}
