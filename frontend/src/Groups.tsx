import "./Dashboard.css";
import React from "react";
import { Container, Button, Col, Row, Form, ToggleButtonGroup, ToggleButton, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
import { Camp_Week, Group, Registered_Camper_Week, Registered_Counselor_Week, Counselor } from "./models/models";
import { filterAndSortWeeksCurrentYear } from "./util/FilterAndSortUtil";
import GroupTable from "./components/GroupTable";

interface Registered_Camper_WeekWithCamper extends Registered_Camper_Week {
  firstName: string;
  lastName: string;
  grade: number;
  gender: string;
}

interface Registered_Counselor_WeekWithCounselor extends Registered_Counselor_Week {
  counselor_id: string;
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
  const [selectedGroup, setSelectedGroup] = React.useState("All");
  const [selectedGroupId, setSelectedGroupId] = React.useState<number>(0);
  const [showCounselorPopup, setShowCounselorPopup] = React.useState(false);
  const [counselors, setCounselors] = React.useState<Counselor[]>([]);

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
      await fetchRegisteredCounselorWeeksWithCounselors();
      await axios
        .get(process.env.REACT_APP_API + "api/registered_camper_weeks/getRegistered_Camper_WeeksWithCampers")
        .then((res) => {
          setRegisteredCamperWeeksWithCamper(res.data);
        });
      await axios.get(process.env.REACT_APP_API + "api/counselors/getCounselors").then((res) => {
        setCounselors(res.data);
      });
    })();
  }, []);

  const fetchRegisteredCounselorWeeksWithCounselors = async () => {
    await axios
      .get(process.env.REACT_APP_API + "api/registered_counselor_weeks/getRegistered_Counselor_WeeksWithCounselors")
      .then((res) => {
        setRegisteredCounselorWeeksWithCounselor(res.data);
      });
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
  };

  const handleWeekChange = (e: { target: { value: string } }) => {
    setSelectedWeek(parseInt(e.target.value));
  };

  const onClickShowCounselorPopup = (groupId: number) => {
    setShowCounselorPopup(true);
    setSelectedGroupId(groupId);
  };

  const removeCounselor = async (id: number) => {
    await axios.delete(
      process.env.REACT_APP_API + "api/registered_counselor_weeks/deleteRegistered_Counselor_Week/" + id
    );
    await fetchRegisteredCounselorWeeksWithCounselors();
  };

  const assignCounselor = async (id: string) => {
    await axios.post(process.env.REACT_APP_API + "api/registered_counselor_weeks/addRegistered_Counselor_Week", {
      counselor_id: id,
      camp_week_id: selectedWeek,
      group_id: selectedGroupId,
    });
    await fetchRegisteredCounselorWeeksWithCounselors();
    setShowCounselorPopup(false);
  };

  const filteredCounselors = () => {
    // loop through counselors, filter counselors to exclude those that are assigned to any group for the selected week
    const counselorsRegisteredForSelectedWeek = registeredCounselorWeeksWithCounselor
      .filter((item) => item.camp_week_id === selectedWeek)
      .map((item) => item.counselor_id);
    return counselors.filter((counselor) => !counselorsRegisteredForSelectedWeek.includes(counselor.id));
  };

  const CounselorPopup = () => (
    <div>
      <Modal scrollable show={showCounselorPopup} onHide={() => setShowCounselorPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unassigned Counselors</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "300px" }}>
          <ListGroup>
            {filteredCounselors().map((counselor) => (
              <ListGroup.Item key={counselor.id}>
                <Button variant="success" size={"sm"} onClick={() => assignCounselor(counselor.id)}>
                  Assign
                </Button>{" "}
                {counselor.firstName} {counselor.lastName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );

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
        <ToggleButtonGroup type="radio" name="options" defaultValue={"All"} onChange={handleGroupChange}>
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
                    <Row>
                      <Col>
                        <GroupTable
                          group={group}
                          counselors={registeredCounselorWeeksWithCounselor.filter(
                            (item) => item.group_id === group.id && item.camp_week_id === selectedWeek
                          )}
                          campers={registeredCamperWeeksWithCamper.filter(
                            (item) => item.group_id === group.id && item.camp_week_id === selectedWeek
                          )}
                          mutable={selectedGroup !== "All"}
                          onRemoveCounselorClick={removeCounselor}
                        />
                      </Col>
                      {selectedGroup !== "All" && (
                        <Col xs="auto">
                          <br />
                          <br />
                          <br />
                          <Button variant="outline-primary" onClick={() => onClickShowCounselorPopup(group.id)}>
                            + Assign Counselor
                          </Button>
                          <br />
                          <br />
                          <Button variant="primary"> + Assign Camper </Button>
                        </Col>
                      )}
                    </Row>
                  </div>
                ))}
            </div>
          </Container>
        )}

        {showCounselorPopup && <CounselorPopup />}

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
