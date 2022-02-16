import "./Dashboard.css";
import React from "react";
import { Container, Button, Col, Row, Form, ToggleButtonGroup, ToggleButton, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
import {
  Camp_Week,
  Group,
  Counselor,
  Registered_Camper_WeekWithCamper,
  Registered_Counselor_WeekWithCounselor,
} from "./models/models";
import { filterAndSortWeeksCurrentYear, sortGroups } from "./util/FilterAndSortUtil";
import GroupTable from "./components/GroupTable";
import { useHistory } from "react-router-dom";

export default function Groups() {
  const history = useHistory();
  const [weeks, setWeeks] = React.useState<Camp_Week[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [registeredCamperWeeksWithCamper, setRegisteredCamperWeeksWithCamper] = React.useState<
    Registered_Camper_WeekWithCamper[]
  >([]);
  const [registeredCounselorWeeksWithCounselor, setRegisteredCounselorWeeksWithCounselor] = React.useState<
    Registered_Counselor_WeekWithCounselor[]
  >([]);
  // const [selectedTerm, setSelectedTerm] = React.useState("");
  const [selectedWeek, setSelectedWeek] = React.useState<number>();
  const [selectedGroupType, setSelectedGroupType] = React.useState("All");
  const [selectedGroup, setSelectedGroup] = React.useState<Group>();
  const [showCounselorPopup, setShowCounselorPopup] = React.useState(false);
  const [showCamperPopup, setShowCamperPopup] = React.useState(false);
  const [counselors, setCounselors] = React.useState<Counselor[]>([]);

  React.useEffect(() => {
    // FIXME: Changing the groups table to include group limits for each group of each week made this page not work anymore
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((res) => {
        const weeks = filterAndSortWeeksCurrentYear(res.data);
        setWeeks(weeks);
        setSelectedWeek(weeks[0].id);
      });
      await axios.get(process.env.REACT_APP_API + "api/groups/getGroups").then((res) => {
        setGroups(sortGroups(res.data));
      });
      await fetchRegisteredCounselorWeeksWithCounselors();
      await fetchRegisteredCamperWeeksWithCampers();
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

  const fetchRegisteredCamperWeeksWithCampers = async () => {
    await axios
      .get(process.env.REACT_APP_API + "api/registered_camper_weeks/getRegistered_Camper_WeeksWithCampers")
      .then((res) => {
        setRegisteredCamperWeeksWithCamper(res.data);
      });
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroupType(value);
  };

  const handleWeekChange = (e: { target: { value: string } }) => {
    setSelectedWeek(parseInt(e.target.value));
  };

  // Counselor Popup Functions

  const onClickShowCounselorPopup = (group: Group) => {
    setShowCounselorPopup(true);
    setSelectedGroup(group);
  };

  const removeCounselorFromGroup = async (id: number) => {
    await axios.delete(
      process.env.REACT_APP_API + "api/registered_counselor_weeks/deleteRegistered_Counselor_Week/" + id
    );
    await fetchRegisteredCounselorWeeksWithCounselors();
  };

  const assignCounselor = async (id: string) => {
    await axios.post(process.env.REACT_APP_API + "api/registered_counselor_weeks/addRegistered_Counselor_Week", {
      counselor_id: id,
      camp_week_id: selectedWeek,
      group_id: selectedGroup?.id,
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

  // Camper Popup Functions

  const onClickShowCamperPopup = (group: Group) => {
    setShowCamperPopup(true);
    setSelectedGroup(group);
  };

  const removeCamperFromGroup = async (item: Registered_Camper_WeekWithCamper) => {
    await axios.put(process.env.REACT_APP_API + "api/registered_camper_weeks/updateRegistered_Camper_Week/" + item.id, {
      camper_id: item.camper_id,
      camp_week_id: item.camp_week_id,
      group_id: null,
    });
    await fetchRegisteredCamperWeeksWithCampers();
  };

  const filteredCampers = () => {
    // loop through registeredCamperWeeksWithCamper, filter campers to exclude those that are assigned to any group for the selected week
    return registeredCamperWeeksWithCamper.filter(
      (item) => item.camp_week_id === selectedWeek && item.group_id === null
    );
  };

  const assignCamper = async (item: Registered_Camper_WeekWithCamper) => {
    // Check to see if camp group is full
    const numCampersInGroup = registeredCamperWeeksWithCamper.filter(
      (camper) => camper.group_id === selectedGroup?.id
    ).length;
    if (selectedGroup && numCampersInGroup >= selectedGroup?.camperLimit) {
      alert("This group is full. Please remove a camper to add another camper.");
      return;
    }
    // Add camper to group
    await axios.put(process.env.REACT_APP_API + "api/registered_camper_weeks/updateRegistered_Camper_Week/" + item.id, {
      camper_id: item.camper_id,
      camp_week_id: item.camp_week_id,
      group_id: selectedGroup?.id,
    });
    await fetchRegisteredCamperWeeksWithCampers();
    setShowCamperPopup(false);
  };

  const handleBack = () => {
    history.goBack();
  };

  const CounselorPopup = () => (
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
  );

  const CamperPopup = () => (
    <Modal scrollable show={showCamperPopup} onHide={() => setShowCamperPopup(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Unassigned Campers</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "300px" }}>
        <ListGroup>
          {filteredCampers().map((item) => (
            <ListGroup.Item key={item.id}>
              <Button variant="success" size={"sm"} onClick={() => assignCamper(item)}>
                Assign
              </Button>{" "}
              {item.firstName} {item.lastName} {`(Grade ${item.grade !== 0 ? item.grade : "K"}, ${item.gender})`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" onClick={handleBack}>
        Back
      </Button>
      <br />
      <br />
      <h3> Groups </h3>
      <div className="center">
        <Form className="center" style={{ marginLeft: "40%", marginRight: "40%" }}>
          {/* Commented out code for a select option of terms for possible use in other screens */}
          {/* <Form.Group as={Col}>
            <Form.Control as="select" onChange={(e) => setSelectedTerm(e.target.value)} style={{ textAlign: "center" }}>
              {Array.from(new Set(weeks.map((week) => week.term))).map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group as={Col}>
            <Form.Control as="select" onChange={handleWeekChange} style={{ textAlign: "center" }}>
              {weeks.map((week) => (
                <option key={week.id} value={week.id}>
                  {week.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>

        <ToggleButtonGroup type="radio" name="options" onChange={handleGroupChange}>
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

        <Container>
          <br />
          {selectedGroupType === "All" ? <h4>👥 All Groups 👥</h4> : <h4>✏️ Edit Group: {selectedGroupType}</h4>}
          <br />
          <div className={selectedGroupType === "All" ? "grid-container" : ""}>
            {groups
              .filter((group) => group.camp_week_id === selectedWeek)
              .filter((group) => (selectedGroupType === "All" ? true : group.name.includes(selectedGroupType)))
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
                        mutable={selectedGroupType !== "All"}
                        onRemoveCounselorClick={removeCounselorFromGroup}
                        onRemoveCamperClick={removeCamperFromGroup}
                      />
                    </Col>
                    {selectedGroupType !== "All" && (
                      <Col xs="auto">
                        <br />
                        <br />
                        <br />
                        <Button variant="outline-primary" onClick={() => onClickShowCounselorPopup(group)}>
                          + Assign Counselor
                        </Button>
                        <br />
                        <br />
                        <Button variant="primary" onClick={() => onClickShowCamperPopup(group)}>
                          + Assign Camper
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              ))}
          </div>
        </Container>

        {showCounselorPopup && <CounselorPopup />}
        {showCamperPopup && <CamperPopup />}
      </div>
    </Container>
  );
}
