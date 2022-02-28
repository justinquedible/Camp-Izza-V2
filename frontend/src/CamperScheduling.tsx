// Page for parents to view their child's weekly schedule for the camp
// Parents can register their child for specific weeks and go to checkout

import React from "react";
import { Button, Container, Form, Table, Spinner, Col, Row } from "react-bootstrap";
import "./HouseholdForm.css";
import { useHistory } from "react-router-dom";
import { dateTimeToTime, dateTimeToDate } from "./utils/DateTimeUtil";
import { filterAndSortWeeksCurrentYear } from "./utils/FilterAndSortUtil";
import { areGroupsFull } from "./utils/GroupUtil";
import { Camp_Week, Camper, Registered_Camper_Week } from "./models/models";
import axios from "axios";

interface Camp_WeekWithStatus extends Camp_Week {
  status: string;
}

export default function CamperScheduling() {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(true);
  const [camper, setCamper] = React.useState<Camper>();
  const [campWeeks, setCampWeeks] = React.useState<Camp_WeekWithStatus[]>([]);
  const [numShirts, setNumShirts] = React.useState(0);
  const [shirtPrice, setShirtPrice] = React.useState(0);
  const [weeksRegistered, setWeeksRegistered] = React.useState<number[]>([]);
  const [registeredCamperWeeks, setRegisteredCamperWeeks] = React.useState<Registered_Camper_Week[]>([]);
  const [weeksSelected, setWeeksSelected] = React.useState<number[]>([]);
  const [earlyCutOffDate, setEarlyCutOffDate] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      let grade = 0;
      await axios
        .get(process.env.REACT_APP_API + "api/campers/getCamper/" + sessionStorage.getItem("camper_id"))
        .then(async (response) => {
          setCamper(response.data);
          grade = response.data.grade;
          await axios
            .get(process.env.REACT_APP_API + "api/shirts/getShirtByShirtNameAndSize/generic/" + response.data.shirtSize)
            .then((response) => {
              setShirtPrice(response.data.price);
            });
          // console.log(response.data);
        });
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then(async (response) => {
        const weeks = filterAndSortWeeksCurrentYear(response.data) as Camp_WeekWithStatus[];
        for (let week of weeks) {
          week.status = (await areGroupsFull(grade, week.id)) ? "Waitlist" : "Open";
        }
        setCampWeeks(weeks);
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
          setRegisteredCamperWeeks(response.data);
          // console.log(response.data);
          setWeeksRegistered(response.data.map((week: { camp_week_id: number }) => week.camp_week_id));
        });
      setIsLoading(false);
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

  const handleUnregister = async (week: Camp_Week) => {
    // give parent credit for unregister week
    let refundCreditAmt = 0;
    // find when parent paid from payment informations table using user id and registered camp week id
    for (let registeredCamperWeek of registeredCamperWeeks) {
      if (registeredCamperWeek.camp_week_id === week.id) {
        const paymentInformation = (
          await axios.get(
            `${process.env.REACT_APP_API}/api/payment_informations/getPayment_InformationByUserIDAndRegisteredCamperWeekID/${camper?.parent_id}/${registeredCamperWeek.id}`
          )
        ).data;
        // Only refunds credit if the week has not started or if camper is in waitlist group
        if (!registeredCamperWeek.group_id) {
          alert("Email info@campizza.com to assign this camper to a group. Then you will be able to unregsiter.");
          return;
        }
        const group = (
          await axios.get(`${process.env.REACT_APP_API}/api/groups/getGroup/${registeredCamperWeek.group_id}`)
        ).data;
        if (new Date() < new Date(week.start) || group.name.startsWith("Waitlist")) {
          if (new Date(paymentInformation.transactionTime) < new Date(earlyCutOffDate)) {
            // console.log("before cutoff");
            refundCreditAmt = week.earlyCost;
          } else {
            refundCreditAmt = week.regularCost;
            // console.log("after cutoff");
          }
        }
        break;
      }
    }
    // Update parent's credit
    await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + camper?.parent_id).then(async (res) => {
      await axios.put(process.env.REACT_APP_API + "api/parents/updateParent/" + camper?.parent_id, {
        ...res.data,
        credit: res.data.credit + refundCreditAmt,
      });
    });

    // delete registered camper week
    await axios.delete(
      `${process.env.REACT_APP_API}/api/registered_camper_weeks/deleteRegistered_Camper_WeekWithCamperIdAndCampWeekId/${
        week.id
      }/${sessionStorage.getItem("camper_id")}`
    );
    history.go(0);
  };

  const handlePrice = (week: Camp_Week) => {
    let price = 0;
    if (new Date() < new Date(earlyCutOffDate)) {
      price = week.earlyCost;
    } else {
      price = week.regularCost;
    }
    return price;
  };

  const handleBack = () => {
    sessionStorage.removeItem("weeksSelected");
    sessionStorage.removeItem("numShirts");
    history.goBack();
  };

  return (
    <div className="Schedule">
      {isLoading ? (
        <Container className="Schedule-Table center">
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Container className="Schedule-Table" style={{ width: "95%" }}>
          <br />
          <Button variant="primary" className="backButton" onClick={handleBack}>
            Back
          </Button>
          <br />
          <br />
          <h3>Camper Registration</h3>
          <br />
          <p>
            Camper Name: <u>{camper ? camper?.firstName + " " + camper?.lastName : ""}</u>
          </p>
          <br />
          <p>
            Camp Times:{" "}
            <u>{campWeeks && `${dateTimeToTime(campWeeks[0].start)} - ${dateTimeToTime(campWeeks[0].end)}`}</u>
          </p>
          <br />
          <p>
            Camp Fees: <u>${campWeeks ? campWeeks[0].regularCost : ""}/week</u>
          </p>
          <br />
          <p>
            Early Bird (Register by {earlyCutOffDate}): <u>${campWeeks ? campWeeks[0].earlyCost : ""}/week</u>
          </p>
          <br />
          {window.innerWidth < 600 && <p>Swipe across the table to view more</p>}
          <Form>
            <Table striped bordered responsive className="schedule">
              <thead>
                <tr>
                  <th style={{ minWidth: 90 }}>Week</th>
                  <th style={{ minWidth: 100 }}>Start</th>
                  <th style={{ minWidth: 100 }}>End</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th style={{ minWidth: 200 }}>Registration Status</th>
                </tr>
              </thead>
              <tbody>
                {campWeeks.length !== 0 ? (
                  campWeeks.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{dateTimeToDate(item.start)}</td>
                      <td>{dateTimeToDate(item.end)}</td>
                      <td>${handlePrice(item)}</td>
                      <td>{item.status}</td>
                      {weeksRegistered.includes(item.id) ? (
                        <td>
                          <Row>
                            <Col>Registered</Col>
                            <Col>
                              <Button variant="danger" onClick={() => handleUnregister(item)}>
                                Unregister
                              </Button>
                            </Col>
                          </Row>
                        </td>
                      ) : (
                        <td>
                          <select onChange={handleChange(item.id)} defaultValue={"not-reg"}>
                            <option value="not-reg">Not Registered</option>
                            <option value="reg">Register</option>
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
            <p>* Unregistering from a camp week will refund you credit matching the price of that week.</p>
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
      )}
    </div>
  );
}
