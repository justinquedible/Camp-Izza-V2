// Page for parents to view their child's weekly schedule for the camp
// Parents can register their child for specific weeks and go to checkout

import React from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "./HouseholdForm.css";
import { useHistory } from "react-router-dom";
import { dateTimeToTime, dateTimeToDate } from "./util/DateTimeUtil";
import { filterAndSortWeeksCurrentYear } from "./util/FilterAndSortUtil";
import { Camp_Week, Camper } from "./models/models";
import axios from "axios";

export default function CamperScheduling() {
  const history = useHistory();
  const [camper, setCamper] = React.useState<Camper>();
  const [campWeeks, setCampWeeks] = React.useState<Camp_Week[]>();
  const [numShirts, setNumShirts] = React.useState(0);
  const [shirtPrice, setShirtPrice] = React.useState(0);
  const [weeksRegistered, setWeeksRegistered] = React.useState<number[]>([]);
  const [weeksSelected, setWeeksSelected] = React.useState<number[]>([]);
  const [earlyCutOffDate, setEarlyCutOffDate] = React.useState("");

  React.useEffect(() => {
    (async () => {
      await axios
        .get(process.env.REACT_APP_API + "api/campers/getCamper/" + sessionStorage.getItem("camper_id"))
        .then(async (response) => {
          setCamper(response.data);
          await axios
            .get(process.env.REACT_APP_API + "api/shirts/getShirtByShirtNameAndSize/generic/" + response.data.shirtSize)
            .then((response) => {
              setShirtPrice(response.data.price);
            });
          // console.log(response.data);
        });
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((response) => {
        setCampWeeks(filterAndSortWeeksCurrentYear(response.data));
        setEarlyCutOffDate(
          new Date(response.data[0].earlyCutOff.substring(0, response.data[0].earlyCutOff.length - 3))
            .toDateString()
            .substring(4, 15)
        );
        // console.log(response.data);
      });
      await axios
        .get(
          process.env.REACT_APP_API +
            "api/registered_camper_weeks/getRegistered_Camper_WeekByCamperID/" +
            sessionStorage.getItem("camper_id")
        )
        .then((response) => {
          setWeeksRegistered(response.data.map((week: { camp_week_id: number }) => week.camp_week_id));
        });
    })();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (weeksSelected.length === 0 && numShirts === 0) {
      alert("Please select at least one week to register for or order at least one shirt.");
      return;
    }
    sessionStorage.setItem("weeksSelected", weeksSelected.join(","));
    sessionStorage.setItem("numShirts", numShirts.toString());
    history.push("/parent/checkout");
  };

  const handleChange = (weekId: number) => (e: { target: { value: any } }) => {
    if (weeksSelected.includes(weekId)) {
      setWeeksSelected(weeksSelected.filter((week) => week !== weekId));
    } else {
      setWeeksSelected([...weeksSelected, weekId]);
    }
  };

  const handleUnregister = async (weekId: number, cost:number) => {
    // give parent credit for unregister week
    await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + camper?.parent_id).then(async (res) => {
      await axios.put(process.env.REACT_APP_API + "api/parents/updateParent/" + camper?.parent_id, {
        ...res.data,
        credit: cost,
      });
    });

    // delete registered camper week
    await axios.delete(process.env.REACT_APP_API + "api/registered_camper_weeks/deleteRegistered_Camper_WeekWithCamperIdAndCampWeekId/"
     + weekId + "/" + sessionStorage.getItem("camper_id"))
    window.location.reload();
  };

  const handleBack = () => {
    sessionStorage.removeItem("camper_id");
    sessionStorage.removeItem("weeksSelected");
    sessionStorage.removeItem("numShirts");
    history.goBack();
  };

  return (
    <div className="Schedule">
      <br />
      <Container className="Schedule-Table">
        <Button variant="primary" className="backButton" onClick={handleBack}>
          Back
        </Button>
        <br />
        <br />
        <h3> Camper Scheduling </h3>
        <br />
        <p>
          {" "}
          Scheduling for: <u>{camper ? camper?.firstName + " " + camper?.lastName : ""}</u>
        </p>
        <br />
        <p>
          Camp Times:{" "}
          <u>{campWeeks && `${dateTimeToTime(campWeeks[0].start)} - ${dateTimeToTime(campWeeks[0].end)}`}</u>
        </p>
        <br />
        <p>
          Camp Prices (Early Bird) (Register by {earlyCutOffDate}):{" "}
          <u>${campWeeks ? campWeeks[0].earlyCost : ""}/week</u>
        </p>
        <br />
        <p>
          Camp Prices (Regular): <u>${campWeeks ? campWeeks[0].regularCost : ""}/week</u>
        </p>
        <br />
        <p>* Holiday weeks are less than regular weeks. (Discounted price will show on checkout page)</p>
        <br />
        <br />
        <Form>
          <Table striped bordered className="schedule">
            <thead>
              <tr>
                <th>Week</th>
                <th>Start</th>
                <th>End</th>
                <th>Registration Status</th>
              </tr>
            </thead>
            <tbody>
              {campWeeks ? (
                campWeeks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{dateTimeToDate(item.start)}</td>
                    <td>{dateTimeToDate(item.end)}</td>
                    {weeksRegistered.includes(item.id) ? (
                      <td>
                        Registered{" "}
                        <Button variant="danger" style={{marginLeft: 50}} onClick={() => handleUnregister(item.id, item.regularCost)}>
                          Unregister 
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <select onChange={handleChange(item.id)} defaultValue={"not-reg"}>
                          <option value="not-reg">Not Registered</option>
                          <option value="reg">Full Day</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td> No Camp Weeks This Year </td>
                </tr>
              )}
            </tbody>
          </Table>
          <br />
          <br />
          <em>Every camper gets 1 free shirt.</em>
          <p>
            {camper?.firstName} currently has <u>{camper?.numShirts}</u> shirt(s).
          </p>
          <br /># of Additional T-Shirts (${shirtPrice} each) &nbsp;
          <input
            type="number"
            min="0"
            placeholder="0"
            className="numberInput"
            onChange={(e) => setNumShirts(parseInt(e.target.value ? e.target.value : "0"))}
            defaultValue="0"
          />
          <br />
          <div className="center">
            <Button variant="success" className="buttonTxt" type="submit" onClick={handleSubmit}>
              Checkout
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
