// Page for admin to view a camper's emergency form

import React from "react";
import "./Dashboard.css";
import { Container, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import logo from "./assets/logo.png";
import divider from "./assets/divider.png";
import { dateTimeToDateInput } from "./utils/DateTimeUtil";
import { Camper, Parent, Emergency_Contact, Camper_Medical_Record } from "./models/models";

interface RegisteredCamperWeeksWithCampWeek {
  camp_week_id: number;
  name: string;
  start: string;
  end: string;
  registered_camp_week_id: number | null;
}

interface EmergencyFormData {
  camper: Camper;
  parent: Parent;
  emergency_contact1: Emergency_Contact;
  emergency_contact2: Emergency_Contact;
  medical_record: Camper_Medical_Record;
  registered_camper_weeks: RegisteredCamperWeeksWithCampWeek[];
}

export default function EmergencyForm() {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<EmergencyFormData[]>([]);

  React.useEffect(() => {
    const camperIds = sessionStorage.getItem("camper_id")?.split(",");
    const dataArray: any[] = [];
    (async () => {
      if (camperIds) {
        setIsLoading(true);
        for (let i = 0; i < camperIds.length; i++) {
          let data: any = {
            camper: {},
            parent: {},
            emergency_contact1: {},
            emergency_contact2: {},
            medical_record: {},
            registered_camper_weeks: [],
          };

          await axios.get(`${process.env.REACT_APP_API}/api/campers/getCamper/${camperIds[i]}`).then(async (res) => {
            data.camper = res.data;
            await axios.get(`${process.env.REACT_APP_API}/api/parents/getParent/${res.data.parent_id}`).then((res) => {
              data.parent = res.data;
            });
            await axios
              .get(
                `${process.env.REACT_APP_API}/api/emergency_contacts/getEmergency_ContactsByUserID/${res.data.parent_id}`
              )
              .then((res) => {
                data.emergency_contact1 = res.data[0];
                data.emergency_contact2 = res.data[1];
              });
          });

          await axios
            .get(
              `${process.env.REACT_APP_API}/api/camper_medical_records/getCamper_Medical_RecordByCamperID/${camperIds[i]}`
            )
            .then((res) => {
              data.medical_record = res.data;
            });

          await axios
            .get(
              `${process.env.REACT_APP_API}/api/registered_camper_weeks/getRegistered_Camper_WeeksWithCamp_WeeksByCamperID/${camperIds[i]}`
            )
            .then((res) => {
              const regCampWeeks: RegisteredCamperWeeksWithCampWeek[] = res.data;
              data.registered_camper_weeks = regCampWeeks.sort((a, b) => a.name.localeCompare(b.name));
            });
          dataArray.push(data);
        }
        setData(dataArray);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const calculateAge = (birthday: string) => {
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <Container className="Admin-Buttons">
      <div style={{}}>
        <Button onClick={handleBack}>Back</Button>
        <Spinner
          style={{ marginLeft: "50%", display: isLoading ? "block" : "none" }}
          animation="border"
          variant="primary"
        />
      </div>
      {data.map((data, index, array) => (
        <div
          key={data.camper.id}
          style={{
            marginRight: "75px",
            paddingTop: "50px",
            pageBreakAfter: array.length === 1 ? undefined : "always",
          }}
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <style type="text/css">
      @import url("https://themes.googleusercontent.com/fonts/css?kit=jJQwFhVhN2q9VjnK36Fvvnz4xwLjfBpj3ejQAORI8DQ");
      ol {
        margin: 0;
        padding: 0;
      }
      table td,
      table th {
        padding: 0;
      }
      .c13 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 5.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c2 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 23.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c34 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 9.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c54 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 99.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c32 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 192.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c26 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 288pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c33 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 47.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c25 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 195pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c10 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 189.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c21 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 576.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c18 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 42.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c40 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 94.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c36 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 170.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c49 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 313.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c22 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 24.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c8 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 18pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c55 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 143.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c23 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 264pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c28 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 146.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c4 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 24pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c19 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 18.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c30 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 577.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c3 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 142.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c16 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 67.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c14 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 147pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c45 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 90pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c46 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 148.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c29 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 144.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c17 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 69pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c44 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 486.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c52 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 137.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c0 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 8pt;
        font-family: "Questrial";
        font-style: normal;
      }
      .c15 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Questrial";
        font-style: normal;
      }
      .c12 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 6pt;
        font-family: "Questrial";
        font-style: normal;
      }
      .c5 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: left;
        height: 11pt;
      }
      .c20 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: center;
      }
      .c37 {
        padding-top: 3pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: left;
      }
      .c7 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: left;
      }
      .c27 {
        margin-left: 24pt;
        border-spacing: 0;
        border-collapse: collapse;
        margin-right: auto;
      }
      .c24 {
        color: #000000;
        text-decoration: none;
        vertical-align: baseline;
        font-style: normal;
      }
      .c48 {
        font-size: 12pt;
        font-family: "Questrial";
        font-weight: 700;
      }
      .c11 {
        font-size: 8pt;
        font-family: "Questrial";
        font-weight: 400;
      }
      .c35 {
        font-size: 6pt;
        font-family: "Questrial";
        font-weight: 700;
      }
      .c50 {
        background-color: #ffffff;
        max-width: 612pt;
        padding: 0pt 0pt 0pt 0pt;
      }
      .c1 {
        height: 19.5pt;
      }
      .c6 {
        background-color: #d9d9d9;
      }
      .c43 {
        height: 20pt;
      }
      .c42 {
        font-style: italic;
      }
      .c41 {
        height: 11pt;
      }
      .c53 {
        height: 9pt;
      }
      .c31 {
        height: 18pt;
      }
      .c9 {
        height: 0pt;
      }
      .c39 {
        height: 15pt;
      }
      .c51 {
        height: 22pt;
      }
      .c47 {
        height: 17pt;
      }
      .c38 {
        text-indent: 1.5in;
      }
      .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
    </style>
  </head>
  <body class="c50">
    <p class="c20 c41">
      <span class="c15"> </span>
    </p>
    <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 73.50px; height: 55.76px;"><img alt="Camp-Izza-Logo" src=${logo} style="width: 73.50px; height: 55.76px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" title=""></span></p>
    <p class="c7 c38">
      <span class="c48"
        >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        EMERGENCY RELEASE FORM
      </span>
    </p>
    <p class="c5">
      <span class="c0"> </span>
    </p>
    <p class="c5">
      <span class="c0"> </span>
    </p>
    <p class="c7">
      <span class="c35"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
      <span
        style="
          overflow: hidden;
          display: inline-block;
          margin: 0px 0px;
          border: 0px solid #000000;
          transform: rotate(0rad) translateZ(0px);
          -webkit-transform: rotate(0rad) translateZ(0px);
          width: 1000px;
          height: 14.72px;
        "
      >
        <img
          alt=""
          src=${divider}
          style="
            width: 890px;
            height: 14.72px;
            margin-left: 30px;
            margin-top: 0px;
            transform: rotate(0rad) translateZ(0px);
            -webkit-transform: rotate(0rad) translateZ(0px);
          "
          title=""
        />
      </span>
    </p>
    <a id="t.739174130a51a1ad181edcb295b277f9c5941594"> </a>
    <a id="t.0"> </a>
    <table class="c27">
      <tbody>
        <tr class="c47">
          <td class="c26" colspan="13" rowspan="1">
            <p class="c7">
              <span class="c11"> Camper&rsquo;s Name: &nbsp; ${data.camper?.firstName} ${data.camper?.lastName} </span>
            </p>
          </td>
          <td class="c40" colspan="4" rowspan="1">
            <p class="c7">
              <span class="c24 c11"> Grade in Fall: ${data.camper?.grade === 0 ? "K" : data.camper?.grade}</span>
            </p>
            <p class="c5">
              <span class="c24 c11"> </span>
            </p>
          </td>
          <td class="c25" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Current School: ${data.camper?.school} </span>
            </p>
          </td>
        </tr>
        <tr class="c43">
          <td class="c26" colspan="13" rowspan="1">
            <p class="c7">
              <span class="c11"> Address: &nbsp; ${data.parent?.addressLine1}</span>
            </p>
          </td>
          <td class="c3" colspan="6" rowspan="1">
            <p class="c7">
              <span class="c11"> Birth date: ${dateTimeToDateInput(data.camper?.dob)}</span>
            </p>
          </td>
          <td class="c33" colspan="2" rowspan="1">
            <p class="c7">
              <span class="c24 c11"> Age: ${calculateAge(data.camper?.dob)} </span>
            </p>
            <p class="c5">
              <span class="c11 c24"> </span>
            </p>
          </td>
          <td class="c54" colspan="5" rowspan="1">
            <p class="c7">
              <span class="c11"> Gender: ${data.camper?.gender}</span>
            </p>
          </td>
        </tr>
        <tr class="c51">
          <td class="c26" colspan="13" rowspan="1">
            <p class="c7">
              <span class="c11"> Parent 1: ${data.parent?.firstName} ${data.parent?.lastName}</span>
            </p>
          </td>
          <td class="c3" colspan="6" rowspan="1">
            <p class="c7">
              <span class="c11"> Phone no: ${data.parent?.phone}</span>
            </p>
          </td>
          <td class="c14" colspan="7" rowspan="1">
            <p class="c7">
              <span class="c11"> Phone no: ${data.parent?.guardian2Phone}</span>
            </p>
          </td>
        </tr>
        <tr class="c31">
          <td class="c26" colspan="13" rowspan="1">
            <p class="c7">
              <span class="c11"> Parent 2: ${data.parent?.guardian2FirstName} ${data.parent?.guardian2LastName}</span>
            </p>
          </td>
          <td class="c3" colspan="6" rowspan="1">
            <p class="c7">
              <span class="c11"> Phone no: ${data.emergency_contact1?.phone}</span>
            </p>
          </td>
          <td class="c14" colspan="7" rowspan="1">
            <p class="c7">
              <span class="c11"> Phone no: ${data.emergency_contact2?.phone}</span>
            </p>
          </td>
        </tr>
        <tr class="c31">
          <td class="c30" colspan="26" rowspan="1">
            <p class="c7">
              <span class="c11"> Email 1: ${data.parent?.email} </span>
            </p>
          </td>
        </tr>
        <tr class="c53">
          <td class="c30" colspan="26" rowspan="1">
            <p class="c7">
              <span class="c11"> Email 2: ${data.parent?.guardian2Email} </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="c7">
      <span class="c35"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
      <span
        style="
          overflow: hidden;
          display: inline-block;
          margin: 0px 0px;
          border: 0px solid #000000;
          transform: rotate(0rad) translateZ(0px);
          -webkit-transform: rotate(0rad) translateZ(0px);
          width: 1000px;
          height: 14.72px;
        "
      >
        <img
          alt=""
          src=${divider}
          style="
            width: 890px;
            height: 14.72px;
            margin-left: 30px;
            margin-top: 0px;
            transform: rotate(0rad) translateZ(0px);
            -webkit-transform: rotate(0rad) translateZ(0px);
          "
          title=""
        />
      </span>
    </p>
    <a id="t.fb848a763be4d9c88fb79672cf07ea40f4fed7fc"> </a>
    <a id="t.1"> </a>
    <table class="c27">
      <tbody>
        <tr class="c31">
          <td class="c30 c6" colspan="26" rowspan="1">
            <p class="c37">
              <span class="c11">
                I hereby authorize the following persons to pick up my child at the end of the session or in the case of
                emergency:
              </span>
            </p>
          </td>
        </tr>
        <tr class="c31">
          <td class="c32" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Contact 1: ${data.emergency_contact1?.firstName} ${
              data.emergency_contact1?.lastName
            }</span>
            </p>
          </td>
          <td class="c10" colspan="8" rowspan="1">
            <p class="c7">
              <span class="c11"> Phone no: ${data.emergency_contact1?.phone}</span>
            </p>
          </td>
          <td class="c25" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Relationship: ${data.emergency_contact1?.relation}</span>
            </p>
          </td>
        </tr>
        <tr class="c9">
          <td class="c32" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Contact 2: ${data.emergency_contact2?.firstName} ${
              data.emergency_contact2?.lastName
            }</span>
            </p>
          </td>
          <td class="c10" colspan="8" rowspan="1">
            <p class="c7">
              <span class="c11"> Phone no: ${data.emergency_contact2?.phone}</span>
            </p>
          </td>
          <td class="c25" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Relationship: ${data.emergency_contact2?.relation}</span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="c7">
      <span class="c35"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
      <span
        style="
          overflow: hidden;
          display: inline-block;
          margin: 0px 0px;
          border: 0px solid #000000;
          transform: rotate(0rad) translateZ(0px);
          -webkit-transform: rotate(0rad) translateZ(0px);
          width: 1000px;
          height: 14.72px;
        "
      >
        <img
          alt=""
          src=${divider}
          style="
            width: 890px;
            height: 14.72px;
            margin-left: 30px;
            margin-top: 0px;
            transform: rotate(0rad) translateZ(0px);
            -webkit-transform: rotate(0rad) translateZ(0px);
          "
          title=""
        />
      </span>
    </p>
    <a id="t.045b388761a8b536ab745a186203b69ebf3ad5ce"> </a>
    <a id="t.2"> </a>
    <table class="c27">
      <tbody>
        <tr class="c31">
          <td class="c30 c6" colspan="26" rowspan="1">
            <p class="c37">
              <span class="c11">
                In the case of an emergency, I hereby give permission to the first aid/medical personnel selected by
                Camp Izza to order X-Rays, routine tests, treatment and to release any records necessary for insurance
                purposes as well as provide or arrange necessary related transportation for my child. In the event I
                cannot be reached in an emergency, I hereby give permission to the physician selected by the camp to
                secure and administer treatment, including hospitalization, for the camper named above. NOTE: In the
                event
              </span>
              <span class="c11"> of accident </span>
              <span class="c11"> s or incidents that occur during camp, an &ldquo;OOPS!&rdquo; </span>
              <span class="c11"> report </span>
              <span class="c11"> &nbsp;will be sent home. </span>
            </p>
          </td>
        </tr>
        <tr class="c31">
          <td class="c23" colspan="12" rowspan="1">
            <p class="c7">
              <span class="c11"> Doctor Name: ${data.medical_record?.doctorName}</span>
            </p>
          </td>
          <td class="c55" colspan="6" rowspan="1">
            <p class="c7">
              <span class="c11"> Doctor phone no: ${data.medical_record?.doctorPhone}</span>
            </p>
          </td>
          <td class="c36" colspan="8" rowspan="1">
            <p class="c7">
              <span class="c11"> Insurance Carrier: ${data.medical_record?.insuranceCarrier}</span>
            </p>
          </td>
        </tr>
        <tr class="c31">
          <td class="c23" colspan="12" rowspan="1">
            <p class="c7">
              <span class="c11"> Chronic Conditions or Illness: ${data.medical_record?.illnesses}</span>
            </p>
          </td>
          <td class="c49" colspan="14" rowspan="1">
            <p class="c7">
              <span class="c11"> Policyholder Name: ${data.medical_record?.policyHolder}</span>
            </p>
          </td>
        </tr>
        <tr class="c31">
        <td class="c25" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c24 c11"> Allergies or Dietary Restrictions:</span>
            </p>
            <p class="c5">
              <span class="c24 c11">${data.medical_record?.allergies}</span>
            </p>
          </td>
          <td class="c32" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Will your child take any medications?</span>
            </p>
            <p class="c5">
              <span class="c24 c11">${data.medical_record?.medications}</span>
            </p>
          </td>
          <td class="c32" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c24 c11"> Recent medical treatments?</span>
            </p>
            <p class="c5">
              <span class="c24 c11">${data.medical_record?.medicalTreatments}</span>
            </p>
          </td>
        </tr>
        <tr class="c39">
          <td class="c32" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Are there any activities at camp that your child cannot participate in?</span>
            </p>
            <p class="c5">
              <span class="c24 c11">${data.medical_record?.restrictedActivities}</span>
            </p>
          </td>
          <td class="c25" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Has your child received all current immunizations?</span>
            </p>
            <p class="c5">
              <span class="c24 c11">${data.medical_record?.immunizations}</span>
            </p>
          </td>
          <td class="c25" colspan="9" rowspan="1">
            <p class="c7">
              <span class="c11"> Date of last tetanus shot:</span>
            </p>
            <p class="c5">
              <span class="c24 c11">${dateTimeToDateInput(data.medical_record?.tetanusDate)}</span>
            </p>
          </td>
        </tr>
        <tr class="c31">
          <td class="c21" colspan="21" rowspan="1">
            <p class="c7">
              <span class="c11"> Comments: ${data.medical_record?.comments}</span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="c7">
      <span class="c35"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
      <span
        style="
          overflow: hidden;
          display: inline-block;
          margin: 0px 0px;
          border: 0px solid #000000;
          transform: rotate(0rad) translateZ(0px);
          -webkit-transform: rotate(0rad) translateZ(0px);
          width: 1000px;
          height: 14.72px;
        "
      >
        <img
          alt=""
          src=${divider}
          style="
            width: 890px;
            height: 14.72px;
            margin-left: 30px;
            margin-top: 0px;
            transform: rotate(0rad) translateZ(0px);
            -webkit-transform: rotate(0rad) translateZ(0px);
          "
          title=""
        />
      </span>
    </p>
    <a id="t.d169298074e7bf0f7b1645a81967bc96d915078e"> </a>
    <a id="t.3"> </a>
    <table class="c27">
      <tbody>
        <tr class="c1">
          ${data?.registered_camper_weeks
            .slice(0, 4)
            .map(
              (week) =>
                `<td class="c28" colspan="6" rowspan="1">
            <p class="c20">
              <span class="c24 c11">${week.name}: ${
                  week.registered_camp_week_id ? "Registered" : "Not Registered"
                }</span>
            </p>
          </td>`
            )
            .join("")}
        </tr>
        <tr class="c9">
          ${data?.registered_camper_weeks
            .slice(4, 8)
            .map(
              (week) =>
                `<td class="c28" colspan="6" rowspan="1">
            <p class="c20">
              <span class="c24 c11">${week.name}: ${
                  week.registered_camp_week_id ? "Registered" : "Not Registered"
                }</span>
            </p>
          </td>`
            )
            .join("")}
        </tr>
        <tr class="c9">
          ${data?.registered_camper_weeks
            .slice(8, 12)
            .map(
              (week) =>
                `<td class="c28" colspan="6" rowspan="1">
            <p class="c20">
              <span class="c24 c11">${week.name}: ${
                  week.registered_camp_week_id ? "Registered" : "Not Registered"
                }</span>
            </p>
          </td>`
            )
            .join("")}
        </tr>
        <tr class="c31">
          <td class="c6 c21" colspan="21" rowspan="1">
            <p class="c37">
              <span class="c11">
                I am aware of the camp activities described on the camp website and I give my permission for my child to
                participate in these activities, unless indicated above. The above information is true to the best of my
                knowledge. I understand that I am financially responsible for all fees and that all payments&nbsp;must
                be received by the first day of camp. All fees are non-refundable and there will be no refunds or
                exchanges for missed days. Parents are asked to notify Camp Izza if their child is ill or will not be
                attending as expected. Camp Director will attempt to call parents/guardians and/or emergency contacts if
                campers do not arrive to camp when expected. &nbsp;I authorize Camp Izza to have and use the photos and
                video of the person named above in camp promotional materials. I agree to release, hold harmless, and
                indemnify Camp Izza, its trustees, staff, family members of employees, vendors, students, volunteers or
                insurers, or their heirs or representatives for any and all claims of any nature whatsoever, including,
                but not limited to, those related to and arising from personal injuries, illnesses, or fatality that my
                child may suffer or incur while he/she is on the Camp Izza campus or while using the facilities and
                equipment. I agree to not hold Camp Izza responsible for loss of or damage to any possessions my child
                brings to the camp and campus. I hereby agree to indemnify Camp Izza against any claims of any third
                parties (including, but not exclusively, members of the child&rsquo;s family and other camp
                participants) for damages or losses incurred by them as a result of a child&rsquo;s participation in
                Camp Izza or presence on campus.
              </span>
            </p>
          </td>
        </tr>
        <tr class="c9">
          <td class="c44" colspan="17" rowspan="1">
            <p class="c7">
              <span class="c11 c42"> Parent/Guardian signature: </span>
            </p>
          </td>
          <td class="c45" colspan="4" rowspan="1">
            <p class="c7">
              <span class="c11 c42"> Date: </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`,
          }}
        />
      ))}
    </Container>
  );
}
