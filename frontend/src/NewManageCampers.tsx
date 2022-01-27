// Page for admin to view/edit camper info, adjust credit, delete campers, view attendance report, and view emergency form

import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  Modal,
} from "react-bootstrap";
import "./Dashboard.css";
import AdminDashboard from "./Admin";
import { AdminCamperCards } from "./AdminCamperCards";
import AdminService from "./services/admin-service";
import AuthService from "./services/auth-service";
import CamperService from "./services/camper-service";

interface ProgramProps {
  year: number | string;
}

interface CamperProps {
  firstname: string; // Camper info
  lastname: string;
  guardianname1: string; // Household info
  guardianphone1: string;
  guardianemail1: string;
  guardianname2: string;
  guardianphone2: string;
  guardianemail2: string;
  weeks: IWeek[]; // Scheduling Info
  group: string; // Camper Info
  amountpaid: number; // ? Info
  credit: number;
  id: number;
}

interface IWeek {
  weekID: string;
  startDate: string;
  endDate: string;
  status: string;
  newStatus: string;
}

const defaultCampers: CamperProps[] = [];
export const NewManageCampers: React.FC<ProgramProps> = () => {
  const [showVal, setShowVal] = React.useState(false);
  const [data, setData]: [CamperProps[], (campers: CamperProps[]) => void] =
    React.useState(defaultCampers);
  const [report, setReport] = React.useState([]);
  const [showPopup, setPopup] = React.useState(false);
  const [credit, setCredit] = React.useState({
    credit: 0,
  });
  const [paid, setPaid] = React.useState({
    amountPaid: 0,
  });
  function handleAdminClick(name: string, id: number) {
    let ids = id.toString();
    localStorage.setItem("currentChild", name);
    localStorage.setItem("currentChildID", ids);
  }
  const handleCreditChange =
    (name: string) => (e: { target: { value: any } }) => {
      setCredit({ ...credit, [name]: e.target.value });
    };
  const handleCreditSubmit = async (e: { preventDefault: () => void }) => {
    const currentUser = AuthService.currentUser();
    let userID = currentUser.id;
    e.preventDefault();
    await CamperService.assignCredit(userID, credit.credit);
  };

  const handleCreditUpdate = (id: number) => {
    CamperService.assignCredit(id, credit.credit).catch();
  };
  // const amountCamperPaid = React.useEffect(() => {CamperService.getPaid(userID).then(response =>{
  //     setPaid(response.data);
  // }})
  React.useEffect(() => {
    // const currentUserID = AuthService.currentUser().id;
    // let camperName = AuthService.currentChild();
    function currentCamperCredit(userID: number) {
      CamperService.getCredit(userID).then((response) => {
        setCredit(response.data);
      });
    }
    function currentCamperPaid(userID: number) {
      // const currentUserID = AuthService.currentUser().id;
      // let camperName = AuthService.currentChild();
      CamperService.getPaid(userID).then((response) => {
        setPaid(response.data);
      });
    }
  }, []);

  const handleClose = () => {
    setPopup(false);
  };

  const handlePopup = () => {
    let camper = localStorage.getItem("currentChildID");
    let year = localStorage.getItem("currentYear");
    setPopup(true);

    AdminService.getAttendanceReport(camper, year).then((response) => {
      setReport(response.data);
    });
  };

  const Popup = () => (
    <div>
      <Modal
        show={showPopup}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton id="contained-modal-title-vcenter">
          <Modal.Title>Attendance Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{localStorage.getItem("currentChild")}</p>
          <p>Group: Dates</p>
          <p>Summer: 2021</p>

          <br />
          <hr />
          <br />
          <div className={"overflowTable"}>
            <table className={"manageTable"}>
              {Object.entries(report).map(([k, v], index) => (
                <tr>
                  <td>
                    <p>Week {index + 1}</p>
                    {Object.entries(v)
                      .filter(([x, y]) => x == "startDate" || x == "endDate")
                      .sort((a, b) => b[0].localeCompare(a[0]))
                      .map(([key, val]) => (
                        <div>
                          {key == "startDate" ? (
                            <p> {val} → </p>
                          ) : (
                            <p> {val} </p>
                          )}
                        </div>
                      ))}
                  </td>
                  {Object.entries(v).filter(
                    ([x, y]) => x != "startDate" && x != "endDate"
                  ).length == 0 ? (
                    <i>
                      <br /> No Records found{" "}
                    </i>
                  ) : (
                    Object.entries(v)
                      .filter(([x, y]) => x != "startDate" && x != "endDate")
                      .map(([key, val]) => (
                        <td>
                          Date: {key} <br />
                          Present for: {val}{" "}
                        </td>
                      ))
                  )}
                </tr>
              ))}
            </table>
            <br />
            <hr />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  const Campers = () => (
    <CardDeck style={{ display: "block" }}>
      {data
        .sort((a, b) =>
          a.firstname.toLowerCase().localeCompare(b.firstname.toLowerCase())
        )

        .map((item) => (
          <Card style={{ width: "80%" }}>
            <Card.Body>
              <h2>
                {" "}
                {item.firstname} {item.lastname}{" "}
              </h2>

              <div className={"row"}>
                <div className={"column"}>
                  <p>{item.guardianname1}</p>
                  <p>{item.guardianphone1}</p>
                  <p>{item.guardianemail1}</p>
                </div>
                <div className={"column"}>
                  <p>{item.guardianname2}</p>
                  <p>{item.guardianphone2}</p>
                  <p>{item.guardianemail2}</p>
                </div>
              </div>

              <div className={"overflowTable"}>
                <table className={"manageTable"}>
                  {item.weeks.map((week) => (
                    <tr>
                      <td> Week {week.weekID} </td>
                      <td> {week.status} </td>
                    </tr>
                  ))}
                </table>
              </div>

              <div className={"row"}>
                <div className={"column4"}>
                  <a
                    className={"blue"}
                    onClick={() => handleAdminClick(item.firstname, item.id)}
                    href={"/#/admin/AdminCamperForm"}
                  >
                    Go to camper info →
                  </a>
                </div>
                <div className={"column4"}>
                  <p>
                    Group: {item.group.substring(0, 1).toUpperCase()}
                    {item.group.substring(1, item.group.length - 1)}{" "}
                    {item.group.substring(item.group.length - 1)}
                  </p>
                </div>
                <div className={"column4"}>
                  <a className={"blue"} onClick={handlePopup}>
                    Attendance Report
                  </a>
                </div>
                <div className={"column4"}>
                  <a
                    className={"red"}
                    onClick={() => handleAdminClick(item.firstname, item.id)}
                    href={"/#/admin/emergencyform"}
                  >
                    Emergency Form
                  </a>
                </div>
              </div>

              <table>
                <tr>
                  <td> Amount Paid </td>
                  <td> ${item.amountpaid} </td>
                </tr>
                <tr>
                  <td> Credit </td>
                  <td> ${item.credit} </td>
                </tr>
              </table>
              <br />

              <input
                type={"Number"}
                placeholder={"$0.00"}
                defaultValue={item.credit}
                className={"resizeCredit"}
                onBlur={handleCreditChange("credit")}
              />
              <Button
                className={"resizeCredit"}
                type="submit"
                onClick={() => handleCreditUpdate(item.id)}
              >
                Adjust Credit
              </Button>
            </Card.Body>
          </Card>
        ))}
    </CardDeck>
  );

  const handleNewSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (queryValues.year == -1) {
      // Not production ready. Still need to fix this, but for now I needed a number type bc its in the same format as the year indexer.
      await AdminService.getAllCampersReg().then(
        (response: { data: CamperProps[] }) => {
          setData(response.data);

          setShowVal(true);
        }
      );
    } else {
      await AdminService.getCampersInYear(queryValues.year)
        .then((response: { data: CamperProps[] }) => {
          localStorage.setItem("currentYear", String(queryValues.year));
          setData(response.data);
          setShowVal(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = () => {
    if (queryValues.year == -1) {
      // Not production ready. Still need to fix this, but for now I needed a number type bc its in the same format as the year indexer.
      AdminService.getAllCampersReg().then(
        (response: { data: CamperProps[] }) => {
          setData(response.data);
        }
      );
    } else {
      AdminService.getCampersInYear(queryValues.year)
        .then((response: { data: CamperProps[] }) => {
          localStorage.setItem("currentYear", String(queryValues.year));
          setData(response.data);
        })
        .catch((error) => {});
    }
    setShowVal(true);
  };

  const [queryValues, setQueryValues] = React.useState({
    year: 0,
  });

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setQueryValues({ ...queryValues, [name]: e.target.value });
  };

  return (
    <div className="ManageCampers">
      <body>
        <br />
        <Container className="Admin-Buttons">
          <Button variant="primary" className="backButton" href="/#/admin">
            {" "}
            Back{" "}
          </Button>
          <br />
          <br />
          <h3> Manage Campers </h3>
          <h6> Add, remove, and edit camper information. </h6>
          <br />
          <br />
          <form>
            <p>SUMMER:</p>
            <select
              className={"resize"}
              defaultValue={queryValues.year}
              onChange={handleChange("year")}
            >
              <option disabled value={0}>
                -- Select a summer --
              </option>
              <option value={new Date().getFullYear()}>
                Currently Registered: {new Date().getFullYear()}
              </option>

              <option value={-2}>Previous Years</option>
              <option value={-1}>All Years</option>
              {/*<option value={"currentAccount"}>Currently Only Made Account: 2021</option>*/}
              {/*<option value={"prev"}>Previous Years</option>*/}
              {/*<option value={"all"}>All Years</option>*/}
            </select>
            <Button
              variant="success"
              className={"resize"}
              type="submit"
              onClick={handleNewSubmit}
            >
              {" "}
              Select{" "}
            </Button>
          </form>
          <br />

          {showVal ? <Campers /> : null}
          {showPopup ? <Popup /> : null}
        </Container>
      </body>
    </div>
  );
};
