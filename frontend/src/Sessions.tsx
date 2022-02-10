// Page for admin to view and edit camp groups, dates, and pricing

import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import { dateTimeToDateTimeInput, dateTimeToDateInput } from "./util/DateTimeUtil";
import { filterAndSortWeeksCurrentYear } from "./util/FilterAndSortUtil";
import { Camp_Week } from "./models/models";
import axios from "axios";

export default function Sessions() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [campWeeks, setCampWeeks] = React.useState<Camp_Week[]>([]);
  const [earlyCutOff, setEarlyCutOff] = React.useState("");

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
          {/* TODO: Add option to add and delete weeks */}

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
