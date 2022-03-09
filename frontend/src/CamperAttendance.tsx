import React from "react";
import { Container, Form, Button, Col, Row, Table, DropdownButton, Dropdown, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Camp_Week, Camper } from "./models/models";
import { filterAndSortWeeksCurrentYear } from "./utils/FilterAndSortUtil";

export default function CamperAttendance() {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(true);
  const [weeks, setWeeks] = React.useState<Camp_Week[]>([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = React.useState<number>();
  const [dates, setDates] = React.useState<Date[]>([]);
  const [campers, setCampers] = React.useState<Camper[]>([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetchData();
    // axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((res) => {
    //   const weeks = filterAndSortWeeksCurrentYear(res.data);
    //   setWeeks(weeks);
    //   setSelectedWeekIndex(0);
    //   setDates(createDates(new Date(weeks[0].start), new Date(weeks[0].end)));
    // });
  }, []);

  const fetchData = async () => {
    await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((res) => {
      const weeks = filterAndSortWeeksCurrentYear(res.data);
      setWeeks(weeks);
      setSelectedWeekIndex(0);
      setDates(createDates(new Date(weeks[0].start), new Date(weeks[0].end)));
    });
    setIsLoading(false);
  };

  const handleWeekChange = (e: { target: { value: string } }) => {
    const index = parseInt(e.target.value);
    setSelectedWeekIndex(index);
    setDates(createDates(new Date(weeks[index].start), new Date(weeks[index].end)));
  };

  const createDates = (startDate: Date, endDate: Date) => {
    let dates: Date[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const renderAttendanceDropdown = () => {
    return (
      <select name="attendance" id="attendanceDropdown" style={{ textAlign: "center" }}>
        <option value="-">-</option>
        <option style={{ color: "#3E9724" }} value="P">
          P
        </option>
        <option style={{ color: "#C80000" }} value="A">
          A
        </option>
      </select>
    );
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Container style={{ paddingTop: 150 }}>
      {isLoading ? (
        <div className="center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <Button variant="primary" className="backButton" onClick={handleBack}>
            Back
          </Button>
          <h3>Campers Attendance</h3>

          <Form className="center" style={{ marginLeft: "40%", marginRight: "40%" }}>
            <Form.Group as={Col}>
              <Form.Control as="select" onChange={handleWeekChange} style={{ textAlign: "center" }}>
                {weeks.map((week, index) => (
                  <option key={index} value={index}>
                    {week.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          <Row style={{ marginLeft: "5%" }}>
            <p style={{ marginRight: 20 }}>PU = Picked up</p>
            <p style={{ marginRight: 20 }}>
              <span style={{ color: "#3E9724" }}>P </span> = Present
            </p>
            <p>
              <span style={{ color: "#C80000" }}>A </span> = Absent
            </p>
          </Row>

          <Table striped bordered style={{ marginTop: 30 }}>
            <thead>
              <tr>
                <th>Name</th>
                {dates.map((date, index) => (
                  <th key={index}>{date.toLocaleDateString("en-US", { weekday: "short" })}</th>
                ))}
              </tr>
              <tr>
                <th>
                  PU <Button variant="outline-primary">Reset</Button>
                </th>
                {dates.map((date, index) => (
                  <th key={index}>{date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{renderAttendanceDropdown()}</td>
                <td>{renderAttendanceDropdown()}</td>
                <td>{renderAttendanceDropdown()}</td>
                <td>{renderAttendanceDropdown()}</td>
                <td>{renderAttendanceDropdown()}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
