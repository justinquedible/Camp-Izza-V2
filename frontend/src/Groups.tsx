import "./Dashboard.css";
import React from "react";
import { Container, Button, Col, Row, Form, ToggleButtonGroup, ToggleButton, Table } from "react-bootstrap";
import axios from "axios";
import { Camp_Week, Group, Registered_Camper_Week, Registered_Counselor_Week } from "./models/models";
import { filterAndSortWeeksCurrentYear } from "./util/FilterAndSortUtil";
import GroupTable from "./components/GroupTable";

interface Registered_Camper_WeekWithCamper extends Registered_Camper_Week {
  firstName: string;
  lastName: string;
  grade: number;
  gender: string;
}

interface Registered_Counselor_WeekWithCounselor extends Registered_Counselor_Week {
  firstName: string;
  lastName: string;
}

export default function Groups() {
  const [weeks, setWeeks] = React.useState<Camp_Week[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [registeredCamperWeeksWithCamper, setRegisteredCamperWeeksWithCamper] = React.useState<
    Registered_Camper_WeekWithCamper[]
  >([]);
  const [registeredCounselorWeeksWithCounselor, setRegisteredCounselorWeeksWithCounselor] = React.useState<
    Registered_Counselor_WeekWithCounselor[]
  >([]);
  const [selectedWeek, setSelectedWeek] = React.useState<number>();
  const [selectedGroup, setSelectedGroup] = React.useState("all");

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((res) => {
        const weeks = filterAndSortWeeksCurrentYear(res.data);
        setWeeks(weeks);
        setSelectedWeek(weeks[0].id);
      });
      await axios.get(process.env.REACT_APP_API + "api/groups/getGroups").then((res) => {
        setGroups(
          res.data.sort((a: Group, b: Group) => a.id.toString().localeCompare(b.id.toString(), "en", { numeric: true }))
        );
      });
      await axios
        .get(process.env.REACT_APP_API + "api/registered_counselor_weeks/getRegistered_Counselor_WeeksWithCounselors")
        .then((res) => {
          setRegisteredCounselorWeeksWithCounselor(res.data);
        });
      await axios
        .get(process.env.REACT_APP_API + "api/registered_camper_weeks/getRegistered_Camper_WeeksWithCampers")
        .then((res) => {
          setRegisteredCamperWeeksWithCamper(res.data);
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
            {/* TODO: Add dropdown for term */}
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
          <ToggleButton value={"All"} variant="outline-dark">
            All
          </ToggleButton>
          <ToggleButton value={"Dates"} variant="outline-success">
            Dates
          </ToggleButton>
          <ToggleButton value={"Coconuts"} variant="outline-warning">
            Coconuts
          </ToggleButton>
          <ToggleButton value={"Trees"} variant="outline-danger">
            Trees
          </ToggleButton>
          <ToggleButton value={"Young Leaders"} variant="outline-info">
            Young Leaders
          </ToggleButton>
        </ToggleButtonGroup>

        {["All", "Dates", "Coconuts", "Trees", "Young Leaders"].includes(selectedGroup) && (
          <Container>
            <br />
            {selectedGroup === "All" ? <h4>👥 All Groups 👥</h4> : <h4>✏️ Edit Group: {selectedGroup}</h4>}
            <br />
            <div className={selectedGroup === "All" ? "grid-container" : ""}>
              {groups
                .filter((group) => (selectedGroup === "All" ? true : group.name.includes(selectedGroup)))
                .map((group) => (
                  <div key={group.id}>
                    <GroupTable
                      group={group}
                      counselors={registeredCounselorWeeksWithCounselor.filter(
                        (item) => item.group_id === group.id && item.camp_week_id === selectedWeek
                      )}
                      campers={registeredCamperWeeksWithCamper.filter(
                        (item) => item.group_id === group.id && item.camp_week_id === selectedWeek
                      )}
                      mutable={selectedGroup !== "All"}
                    />
                  </div>
                ))}
            </div>
          </Container>
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
