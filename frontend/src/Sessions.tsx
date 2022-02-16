// Page for admin to view and edit camp groups, dates, and pricing

import React from "react";
import { Button, Container, Form, Row, Col, Modal, Tabs, Tab } from "react-bootstrap";
import "./Dashboard.css";
import { dateTimeToDateTimeInput, dateTimeToDateInput } from "./util/DateTimeUtil";
import { filterAndSortWeeksCurrentYear } from "./util/FilterAndSortUtil";
import { Camp_Week } from "./models/models";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Sessions() {
  const history = useHistory();
  const [isSaving, setIsSaving] = React.useState(false);
  const [campWeeks, setCampWeeks] = React.useState<Camp_Week[]>([]);
  const [earlyCutOff, setEarlyCutOff] = React.useState("");
  const [showAddWeeksPopup, setShowAddWeeksPopup] = React.useState(false);

  const [campWeekValues, setCampWeekValues] = React.useState<Camp_Week>({
    id: 0,
    term: "",
    name: "",
    start: "",
    end: "",
    earlyCost: 0,
    regularCost: 0,
    earlyCutOff: "",
  });

  const handleAddWeek = (name: string) => (e: { target: { value: any } }) => {
    setCampWeekValues({ ...campWeekValues, [name]: e.target.value });
  };

  const handleAddWeekSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const {id, ...campWeekNoId} = campWeekValues;
    await axios.post(process.env.REACT_APP_API + "api/camp_weeks/addCamp_Weeks", {
      ...campWeekNoId,
    });
    setShowAddWeeksPopup(false)
    window.location.reload();
  }; 
  
  const handleDeleteWeek = async (camp_week_id: number) => {
    await axios.get(process.env.REACT_APP_API + "api/registered_camper_weeks/getRegistered_Camper_WeekByCampWeekId/" + camp_week_id).then(async (response) => {
      if (response.data.length == 0){
        await axios.delete(process.env.REACT_APP_API + "api/camp_weeks/deleteCamp_Weeks/" + camp_week_id);
        window.location.reload();
      }
      else {
        alert("There is a camper registered in this week! Please unregister campers for this week to delete.")
      }
    })
  }; 

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((response) => {
        for (let week of response.data) {
          week.start = dateTimeToDateTimeInput(week.start);
          week.end = dateTimeToDateTimeInput(week.end);
          week.earlyCutOff = dateTimeToDateInput(week.earlyCutOff);
        }
        const sortedWeeks = filterAndSortWeeksCurrentYear(response.data);
        setCampWeeks(sortedWeeks);
        setEarlyCutOff(dateTimeToDateInput(sortedWeeks[0].earlyCutOff));
      });
    })();
  }, []);

  const handleDatesChange = (index: number, field: string) => (e: { target: { value: any } }) => {
    if (campWeeks) {
      if (field === "start") {
        campWeeks[index].start = e.target.value;
        setCampWeeks([...campWeeks]);
      } else if (field === "end") {
        campWeeks[index].end = e.target.value;
        setCampWeeks([...campWeeks]);
      }
    }
  };

  const handlePriceChange = (index: number, field: string) => (e: { target: { value: any } }) => {
    if (e.target.value !== "") {
      if (field === "earlyCost") {
        campWeeks[index].earlyCost = parseInt(e.target.value);
        setCampWeeks([...campWeeks]);
      } else if (field === "regularCost") {
        campWeeks[index].regularCost = parseInt(e.target.value);
        setCampWeeks([...campWeeks]);
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSaving(true);
    for (let week of campWeeks) {
      await axios.put(process.env.REACT_APP_API + "/api/camp_weeks/updateCamp_Weeks/" + week.id, {
        ...week,
        earlyCutOff: earlyCutOff,
      });
    }
    setIsSaving(false);
  };

  const handleBack = async () => {
    history.goBack();
  };

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" onClick={handleBack}>
        Back
      </Button>
      <br />
      <br />
      <Tabs>
        <Tab eventKey="sessions" title="Sessions">
          <br />

          <h3> Sessions </h3>
          <br />
          <div className={"sessionsForms"}>
          <Form>
            <h5>Weeks</h5>
            {campWeeks.map((week, index) => (
              <div key={week.id}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>{week.name} Start</Form.Label>
                    <input
                      className="form-control"
                      required
                      type="datetime-local"
                      value={week.start}
                      onChange={handleDatesChange(index, "start")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>{week.name} End</Form.Label>
                    <input
                      className="form-control"
                      required
                      type="datetime-local"
                      value={week.end}
                      onChange={handleDatesChange(index, "end")}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Weekly Price (Early Bird)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      value={week.earlyCost}
                      required
                      onChange={handlePriceChange(index, "earlyCost")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Weekly Price (Regular)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      value={week.regularCost}
                      required
                      onChange={handlePriceChange(index, "regularCost")}
                    />
                  </Form.Group>
                </Row>
                <div style={{textAlign: "center"}}>
                  <Button variant="danger" onClick={() => handleDeleteWeek(week.id)}>
                      Delete
                  </Button>
                </div>
                <hr />
              </div>
            ))}
            <Form.Group>
              <Form.Label>Early Cut Off Date</Form.Label>
              <input
                className="form-control"
                required
                type="date"
                value={earlyCutOff}
                onChange={(e) => setEarlyCutOff(e.target.value)}
              />
            </Form.Group>
            <div className="center">
              <Button onClick={() => {setShowAddWeeksPopup(true)}}>
                Add Weeks
              </Button>

              <Modal size="lg" show={showAddWeeksPopup} onHide={() => setShowAddWeeksPopup(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Weeks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <input
                      className="form-control"
                      required
                      placeholder="Week 1"
                      value={campWeekValues.name}
                      onChange={handleAddWeek("name")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Term</Form.Label>
                    <input
                      className="form-control"
                      required
                      placeholder="Summer 2022"
                      value={campWeekValues.term}
                      onChange={handleAddWeek("term")}
                    />
                  </Form.Group>
                </Row>
                <Row> 
                  <Form.Group as={Col}>
                    <Form.Label>Start</Form.Label>
                    <input
                      className="form-control"
                      required
                      type="datetime-local"
                      value={campWeekValues.start}
                      onChange={handleAddWeek("start")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>End</Form.Label>
                    <input
                      className="form-control"
                      required
                      type="datetime-local"
                      value={campWeekValues.end}
                      onChange={handleAddWeek("end")}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Weekly Price (Early Bird)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      value={campWeekValues.earlyCost}
                      required
                      onChange={handleAddWeek("earlyCost")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Weekly Price (Regular)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.00"
                      value={campWeekValues.regularCost}
                      required
                      onChange={handleAddWeek("regularCost")}
                    />
                  </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Early Cut Off Date</Form.Label>
                    <input
                      className="form-control"
                      required
                      type="date"
                      value={campWeekValues.earlyCutOff}
                      onChange={handleAddWeek("earlyCutOff")}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowAddWeeksPopup(false)}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleAddWeekSubmit}>
                  {isSaving ? "Submitting" : "Submit"}
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <br />
            <div className="center">
              <Button variant="success" className="buttonTxt" type="submit" disabled={isSaving} onClick={handleSubmit}>
                {isSaving ? "Saving" : "Save"}
              </Button>
            </div>
          </Form>
          </div>
        </Tab>
        <Tab eventKey="group" title="Group">
          <br />
          <h3> Group </h3>

        </Tab>
      </Tabs>
      
    </Container>
  );
}
