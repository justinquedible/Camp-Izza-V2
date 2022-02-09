// Page for admin to view, approve, deny, and activate counselors

import React from "react";
import { Button, Container } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { Counselor } from "./models/models";
import { dateTimeToDateInput } from "./util/DateTimeUtil";
import axios from "axios";
// import AuthService from './services/auth-service';
// import {List} from "rsuite";

// interface Props {
// }

// interface Roles{
//     id: number
//     roleName: string
// }

// interface Counselors {
//     firstName: string,
//     lastName: string,
//     email: string
//     id: number

// }

// const defaultCounselors:Counselors[] = [];

// const allCounselors:Counselors[] = [];

// const archviedCounselors:Counselors[] = [];

export default function ManageCounselors() {
  const history = useHistory();
  let change = false;
  const [counselors, setCounselors] = React.useState<Counselor[]>([]);
  const [pending, setPending] = React.useState<Counselor[]>([]);
  const [active, setActive] = React.useState<Counselor[]>([]);
  const [archive, setArchive] = React.useState<Counselor[]>([]);

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/counselors/getCounselors").then(async (response) => {
        for (let c of response.data) {
          c.approved = Boolean(c.approved);
          c.active = Boolean(c.active);
          // console.log(c);
        }
        setCounselors(response.data);
        console.log(response.data);
        const active_counselors = [];
        const archived_counselors = [];
        const pending_counselors = [];
        for (let c of response.data) {
          if (c.active && c.approved) {
            active_counselors.push(c);
          } else if (c.approved && !c.active) {
            archived_counselors.push(c);
          } else {
            pending_counselors.push(c);
          }
        }
        setActive(active_counselors);
        setArchive(archived_counselors);
        setPending(pending_counselors);
        console.log(pending_counselors);
      });
      // AuthService.getPendingCounselors().then(r => setPending(r.data))
      // AuthService.getAllCounselors().then(response => setData(response.data))
      // AuthService.getArchivedCounselors().then(responses => setArchive(responses.data))
    })();
  }, []);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleApproveChange = async (id: string) => {
    for (let c of counselors) {
      if (c.id === id) {
        c.approved = true;
        c.active = true;
        await axios.put(process.env.REACT_APP_API + "api/counselors/updateCounselor/" + c.id, {
          ...c,
          dob: dateTimeToDateInput(c.dob),
        });
      }
    }

    // change = !change;
    // AuthService.changeCounselorActive(id).catch()
    window.location.reload();
    //AuthService.getAllCounselors().then(response => setData(response.data))
    //AuthService.getArchivedCounselors().then(responses => setArchive(responses.data))
  };

  const handleInactiveChange = async (id: string) => {
    for (let c of counselors) {
      if (c.id === id) {
        c.approved = true;
        c.active = false;
        await axios.put(process.env.REACT_APP_API + "api/counselors/updateCounselor/" + c.id, {
          ...c,
          dob: dateTimeToDateInput(c.dob),
        });
      }
    }
    // change = !change;
    // AuthService.changeCounselorArchive(id).catch()
    window.location.reload();
  };

  const handleDenyChange = async (id: string) => {
    for (let c of counselors) {
      if (c.id === id) {
        c.approved = false;
        c.active = false;
        await axios.put(process.env.REACT_APP_API + "api/counselors/updateCounselor/" + c.id, {
          ...c,
          dob: dateTimeToDateInput(c.dob),
        });
      }
    }
    // change = !change;
    // AuthService.deleteCounselor(id).catch()
    window.location.reload();
  };

  return (
    <body>
      <Container className="Admin-Buttons">
        <Button variant="primary" className="backButton" onClick={handleGoBack}>
          {" "}
          Back{" "}
        </Button>
        <br />
        <br />
        <h3> Manage Counselors </h3>
        <h6> View pending accounts and list all counselors. </h6>
        <br />
        <br />

        <h5> Pending Accounts </h5>
        {counselors}

        <div className="overflowTable">
          <table className={"manageTable"}>
            <tr>
              <td> Last Name </td>
              <td> First Name </td>
              <td> Email </td>
              <td> Options </td>
            </tr>
            {pending.map((item) => (
              <tr>
                <td> {item.lastName} </td>
                <td>{item.firstName} </td>
                <td> {item.email} </td>
                <td>
                  {" "}
                  <Button variant="success" onClick={() => handleApproveChange(item.id)}>
                    Approve
                  </Button>{" "}
                  &nbsp;
                  <Button variant="danger" onClick={() => handleDenyChange(item.id)}>
                    Deny
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>

        <br />
        <br />

        <h5> Active Counselors </h5>

        <div className="overflowTable">
          <table className={"manageTable"}>
            <tr>
              <td> Last Name </td>
              <td> First Name </td>
              <td> Group </td>
              <td> Status </td>
              <td> Options </td>
            </tr>
            {active.map((item) => (
              <tr>
                <td> {item.lastName} </td>
                <td>{item.firstName} </td>
                <td> {item.email} </td>
                <td> Active </td>
                <td>
                  {" "}
                  <Button variant="secondary" onClick={() => handleInactiveChange(item.id)}>
                    Deactivate
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>

        <br />
        <br />

        <h5> Inactive Counselors </h5>

        <div className="overflowTable">
          <table className={"manageTable"}>
            <tr>
              <td> Last Name </td>
              <td> First Name </td>
              <td> Group </td>
              <td> Status </td>
              <td> Options </td>
            </tr>
            {archive.map((item) => (
              <tr>
                <td> {item.lastName} </td>
                <td>{item.firstName} </td>
                <td> {item.email} </td>
                <td> Inactive </td>
                <td>
                  {" "}
                  <Button variant="success" onClick={() => handleApproveChange(item.id)}>
                    {" "}
                    Activate{" "}
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>

        <br />
        <br />
      </Container>
    </body>
  );
}
