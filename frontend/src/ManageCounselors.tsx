// Page for admin to view, approve, deny, and activate counselors

import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { Counselor } from "./models/models";
import { dateTimeToDateInput } from "./utils/DateTimeUtil";
import axios from "axios";

export default function ManageCounselors() {
  const history = useHistory();
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
        // console.log(response.data);
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
        // console.log(pending_counselors)
      });
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

    window.location.reload();
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

    window.location.reload();
  };

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" onClick={handleGoBack}>
        Back
      </Button>
      <br />
      <br />
      <h3> Manage Counselors </h3>
      <h6> View pending accounts and list all counselors. </h6>
      <br />
      <br />

      <h5> Pending Accounts </h5>

      <div className="overflowTable">
        <Table className={"manageTable"}>
          <thead>
            <tr>
              <td> Last Name </td>
              <td> First Name </td>
              <td> Email </td>
              <td> Options </td>
            </tr>
          </thead>
          {pending.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td> {item.lastName} </td>
                <td>{item.firstName} </td>
                <td> {item.email} </td>
                <td>
                  <Button variant="success" onClick={() => handleApproveChange(item.id)}>
                    Approve
                  </Button>
                  &nbsp;
                  <Button variant="danger" onClick={() => handleDenyChange(item.id)}>
                    Deny
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      <br />
      <br />

      <h5> Active Counselors </h5>

      <div className="overflowTable">
        <Table className={"manageTable"}>
          <thead>
            <tr>
              <td> Last Name </td>
              <td> First Name </td>
              <td> Group </td>
              <td> Status </td>
              <td> Options </td>
            </tr>
          </thead>
          {active.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td> {item.lastName} </td>
                <td>{item.firstName} </td>
                <td> {item.email} </td>
                <td> Active </td>
                <td>
                  <Button variant="secondary" onClick={() => handleInactiveChange(item.id)}>
                    Deactivate
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      <br />
      <br />

      <h5> Inactive Counselors </h5>

      <div className="overflowTable">
        <Table className={"manageTable"}>
          <thead>
            <tr>
              <td> Last Name </td>
              <td> First Name </td>
              <td> Group </td>
              <td> Status </td>
              <td> Options </td>
            </tr>
          </thead>
          {archive.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td> {item.lastName} </td>
                <td>{item.firstName} </td>
                <td> {item.email} </td>
                <td> Inactive </td>
                <td>
                  <Button variant="success" onClick={() => handleApproveChange(item.id)}>
                    Activate
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      <br />
      <br />
    </Container>
  );
}
