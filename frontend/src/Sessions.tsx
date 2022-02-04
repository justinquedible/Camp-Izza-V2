// Page for admin to view and edit camp groups, dates, and pricing

import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import { dateTimeToDateTimeInput, dateTimeToDateInput } from "./util/DateTimeUtil";
import { filterAndSortWeeks } from "./util/FilterAndSortUtil";
import { Camp_Week } from "./models/models";
import axios from "axios";

export default function Sessions() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [campWeeks, setCampWeeks] = React.useState<Camp_Week[]>([]);
  const [earlyCutOff, setEarlyCutOff] = React.useState("");
  const [earlyCost, setEarlyCost] = React.useState(0);
  const [regularCost, setRegularCost] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((response) => {
        for (let week of response.data) {
          week.start = dateTimeToDateTimeInput(week.start);
          week.end = dateTimeToDateTimeInput(week.end);
          week.earlyCutOff = dateTimeToDateInput(week.earlyCutOff);
        }
        const sortedWeeks = filterAndSortWeeks(response.data);
        setCampWeeks(sortedWeeks);
        setEarlyCutOff(dateTimeToDateInput(sortedWeeks[0].earlyCutOff));
        setEarlyCost(sortedWeeks[0].earlyCost);
        setRegularCost(sortedWeeks[0].regularCost);
        // console.log(sortedWeeks);
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

  const handlePriceChange = (field: string) => (e: { target: { value: any } }) => {
    if (e.target.value !== "") {
      if (field === "earlyCost") {
        setEarlyCost(parseInt(e.target.value));
      } else if (field === "regularCost") {
        setRegularCost(parseInt(e.target.value));
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
        earlyCost: earlyCost,
        regularCost: regularCost,
      });
    }
    setIsSaving(false);
  };

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" href="/#/admin">
        Back
      </Button>
      <br />
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

          <br />
          <h5>Weekly Pricing</h5>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Weekly Price (Early Bird)</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={earlyCost}
                required
                onChange={handlePriceChange("earlyCost")}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Weekly Price (Regular)</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={regularCost}
                required
                onChange={handlePriceChange("regularCost")}
              />
            </Form.Group>
          </Row>
          <br />
          <div className="center">
            <Button variant="success" className="buttonTxt" type="submit" disabled={isSaving} onClick={handleSubmit}>
              {isSaving ? "Saving" : "Save"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
