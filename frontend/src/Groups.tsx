import "./Dashboard.css";
import React from "react";
import { Container, Button, Col, Form, ToggleButtonGroup, ToggleButton, Table } from "react-bootstrap";
import axios from "axios";
import { Camp_Week, Group, Registered_Camper_Week } from "./models/models";
import { filterAndSortWeeksCurrentYear } from "./util/FilterAndSortUtil";

export default function Groups() {
  const [weeks, setWeeks] = React.useState<Camp_Week[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [registeredCamperWeeks, setRegisteredCamperWeeks] = React.useState<Registered_Camper_Week[]>([]);
  const [selectedWeek, setSelectedWeek] = React.useState<number>();
  const [selectedGroup, setSelectedGroup] = React.useState("all");

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "/api/camp_weeks/getCamp_Weeks").then((res) => {
        const weeks = filterAndSortWeeksCurrentYear(res.data);
        setWeeks(weeks);
        setSelectedWeek(weeks[0].id);
      });
      await axios.get(process.env.REACT_APP_API + "/api/groups/getGroups").then((res) => {
        setGroups(
          res.data.sort((a: Group, b: Group) => a.id.toString().localeCompare(b.id.toString(), "en", { numeric: true }))
        );
      });
      await axios
        .get(process.env.REACT_APP_API + "/api/registered_camper_weeks/getRegistered_Camper_Weeks")
        .then((res) => {
          setRegisteredCamperWeeks(res.data);
        });
    })();
  }, []);

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
  };

  const handleWeekChange = (e: { target: { value: string } }) => {
    setSelectedWeek(parseInt(e.target.value));
  };

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" href="/#/admin">
        Back
      </Button>
      <br />
      <br />
      <h3> Groups </h3>
      <div className="center">
        <Form>
          <Col xs="3">
            <Form.Control as="select" onChange={handleWeekChange}>
              {weeks.map((week) => (
                <option key={week.id} value={week.id}>
                  {week.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form>
        <ToggleButtonGroup type="radio" name="options" defaultValue={"all"} onChange={handleGroupChange}>
          <ToggleButton value={"all"} variant="outline-dark">
            All
          </ToggleButton>
          <ToggleButton value={"dates"} variant="outline-success">
            Dates
          </ToggleButton>
          <ToggleButton value={"coconuts"} variant="outline-warning">
            Coconuts
          </ToggleButton>
          <ToggleButton value={"trees"} variant="outline-danger">
            Trees
          </ToggleButton>
          <ToggleButton value={"young leaders"} variant="outline-info">
            Young Leaders
          </ToggleButton>
        </ToggleButtonGroup>

        {selectedGroup === "all" && (
          <div>
            <br />
            <h4> 👥 All Groups 👥</h4>
            <br />
            <div className="grid-container">
              {groups.map((group) => (
                <div key={group.id} className="grid-item">
                  <h5>{group.name}</h5>
                  <h6>Counselors: Justin</h6>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* TODO: Make function that loops through registeredCamperWeeks and adds it each table */}
                        {registeredCamperWeeks.map((item) =>
                          item.group_id === group.id && item.camp_week_id === selectedWeek ? (
                            <td key={item.camper_id}>{item.camper_id}</td>
                          ) : null
                        )}
                        <td>3</td>
                        <td>M</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <div className={"buttonToggle"}>
        {showAll ? <All /> : null}
        {showDates ? <Dates /> : null}
        {showCoconuts ? <Coconuts /> : null}
        {showTrees ? <Trees /> : null}
        {showLeaders ? <Leaders /> : null}
        {showPopup ? <Popup /> : null}
        {showCounselorPopup ? <CounselorPopup /> : null}
      </div> */}
      </div>
    </Container>
  );
}
