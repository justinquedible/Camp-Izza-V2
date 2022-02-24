// Page for parents to checkout so they can pay for the camp

import React from "react";
import { Button, Container, Table, Spinner } from "react-bootstrap";
import "./HouseholdForm.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { dateTimeToDate, dateTimeToTime, dateTimeToDateInput, dateTimeToMilitaryTime } from "./utils/DateTimeUtil";
import { sortWeeks } from "./utils/FilterAndSortUtil";
import { findGroupID, areGroupsFull } from "./utils/GroupUtil";
import { Camp_Week, Camper, Parent } from "./models/models";

interface Camp_WeekWithStatus extends Camp_Week {
  status: string;
}

export default function Checkout() {
  const history = useHistory();

  let numShirtsStr = sessionStorage.getItem("numShirts");
  const numShirts = numShirtsStr ? parseInt(numShirtsStr) : 0;

  const [isLoading, setIsLoading] = React.useState(true);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [parent, setParent] = React.useState<Parent>();
  const [camper, setCamper] = React.useState<Camper>();
  const [campWeeksSelected, setCampWeeksSelected] = React.useState<Camp_WeekWithStatus[]>([]);
  const [shirtPrice, setShirtPrice] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [isEarlyBird, setIsEarlyBird] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      let shirtPrice = 0;
      let grade = 0;
      await axios
        .get(process.env.REACT_APP_API + "api/campers/getCamper/" + sessionStorage.getItem("camper_id"))
        .then(async (response) => {
          setCamper(response.data);
          grade = response.data.grade;
          await axios
            .get(process.env.REACT_APP_API + "api/parents/getParent/" + response.data.parent_id)
            .then((response) => {
              setParent(response.data);
              // console.log(response.data);
            });
          await axios
            .get(process.env.REACT_APP_API + "api/shirts/getShirtByShirtNameAndSize/generic/" + response.data.shirtSize)
            .then((response) => {
              shirtPrice = response.data.price;
              setShirtPrice(shirtPrice);
            });
          // console.log(response.data);
        });
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then(async (response) => {
        const weeksSelected = filterAndSortWeeksSelected(response.data) as Camp_WeekWithStatus[];
        for (let week of weeksSelected) {
          week.status = (await areGroupsFull(grade, week.id)) ? "Waitlist" : "Open";
        }
        setCampWeeksSelected(weeksSelected);
        let isEarlyBird = false;
        if (Date.now() < Date.parse(response.data[0].earlyCutOff)) {
          isEarlyBird = true;
          setIsEarlyBird(isEarlyBird);
        }
        let price = 0;
        for (let week of weeksSelected) {
          if (isEarlyBird) {
            price += week.earlyCost;
          } else {
            price += week.regularCost;
          }
        }
        setTotal(numShirts * shirtPrice + price);
      });
      setIsLoading(false);
    })();
  }, [numShirts]);

  const filterAndSortWeeksSelected = (weeks: Camp_Week[]) => {
    const currentYear = new Date().getFullYear();
    const weeksSelected = sessionStorage.getItem("weeksSelected")?.split(",");
    weeks = weeks.filter(
      (week) => new Date(week.start).getFullYear() === currentYear && weeksSelected?.includes(week.id.toString())
    );
    return sortWeeks(weeks);
  };

  const updateDatabase = async () => {
    setIsProcessing(true);
    if (parent && camper) {
      // Update camper numShirts, paid
      await axios.put(process.env.REACT_APP_API + "api/campers/updateCamper/" + camper.id, {
        ...camper,
        dob: dateTimeToDateInput(camper.dob),
        numShirts: camper.numShirts + numShirts,
        paid: camper.paid + (total > parent.credit ? total - parent.credit : 0),
      });

      // Update parent credit
      await axios.put(process.env.REACT_APP_API + "api/parents/updateParent/" + parent?.id, {
        ...parent,
        credit: total > parent.credit ? 0 : parent.credit - total,
      });

      // Post to registered_camper_weeks and payment_informations, one for each campWeeksSelected
      const currentDateTime =
        dateTimeToDateInput(new Date().toString()) + " " + dateTimeToMilitaryTime(new Date().toString());
      for (let week of campWeeksSelected) {
        // console.log(week);
        const designatedGroupID = await findGroupID(camper.grade, week.id);
        // console.log(designatedGroupID);
        await axios
          .post(process.env.REACT_APP_API + "api/registered_camper_weeks/addRegistered_Camper_Week", {
            camper_id: camper.id,
            camp_week_id: week.id,
            group_id: designatedGroupID,
          })
          .then(async (response) => {
            // console.log(response);
            await axios.post(process.env.REACT_APP_API + "api/payment_informations/addPayment_Information", {
              user_id: parent?.id,
              registered_camper_weeks_id: response.data.registered_camper_weeks_id,
              numShirts: 0,
              totalCost: total,
              totalPaidUSD: total < parent.credit ? 0 : total - parent.credit,
              totalPaidCredit: total < parent.credit ? total : parent.credit,
              transactionTime: currentDateTime,
            });
          });
      }

      if (numShirts > 0) {
        await axios.post(process.env.REACT_APP_API + "api/payment_informations/addPayment_Information", {
          user_id: parent?.id,
          numShirts: numShirts,
          totalCost: total,
          totalPaidUSD: total < parent.credit ? 0 : total - parent.credit,
          totalPaidCredit: total < parent.credit ? total : parent.credit,
          transactionTime: currentDateTime,
        });
      }

      await sendEmail();

      history.replace("/parent/completedTransaction");
    }
  };

  const sendEmail = async () => {
    if (parent && camper && campWeeksSelected) {
      await axios.post(process.env.REACT_APP_API + "api/emails/sendRegistrationEmail", {
        sendToEmail: parent.email,
        camperName: `${camper.firstName} ${camper.lastName}`,
        weekDetails: campWeeksSelected.map(
          (week) =>
            `${week.name}: ${dateTimeToDate(week.start)} - ${dateTimeToDate(week.end)}, ${dateTimeToTime(
              week.start
            )} - ${dateTimeToTime(week.end)}, $${isEarlyBird ? week.earlyCost : week.regularCost} ${
              week.status === "Waitlist" ? "(WAITLIST)" : ""
            }`
        ),
        total: total,
      });
    }
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(async (orderData: any) => {
      // console.log(orderData);
      await updateDatabase();
    });
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: parent ? (total - parent?.credit).toString() : 0,
              currency: "USD",
            },
          },
        ],
      })
      .then((orderID: any) => {
        // setOrderID(orderID);
        // console.log("order ID", orderID);
        return orderID;
      });
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      {isLoading && (
        <div className="center" style={{ paddingTop: 150 }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {isProcessing && (
        <div className="center" style={{ paddingTop: 150 }}>
          <h1>Processing Transaction...</h1>
          <br />
          <h4>Please do not refresh your browser.</h4>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!isLoading && !isProcessing && (
        <div className="Checkout">
          <br />
          <Container className="Checkout-Table" style={{ width: "95%" }}>
            <Button variant="primary" className="backButton" onClick={handleBack}>
              Back
            </Button>
            {/* <Button variant="primary" className="backButton" onClick={updateDatabase}>
              Test Checkout (To bypass payment)
            </Button> */}
            {/* <Button variant="outline-primary" className="backButton" onClick={() => findGroupID(1, 1)}>
              grade
            </Button> */}
            <br />
            <br />
            <h3>Checkout</h3>
            <br />

            <p>
              Checkout for: {camper?.firstName} {camper?.lastName}
            </p>
            <br />
            <p> Terms and Conditions </p>
            <p className="terms">
              I am aware of the camp activities described on the camp website and I give my permission for my child to
              participate in these activities, unless indicated.
              <br />
              The information submitted is true to the best of my knowledge. I understand that I am financially
              responsible for all fees and that the registration is complete when payment has been received. All fees
              are non-refundable and there will be no refunds or exchanges for missed days. Guardians agree to screen
              their children for symptoms of illness or infection and keep their children home if symptoms are found.
              Guardians agree to notify Camp Izza if their child is ill or will not be attending as expected. Camp
              Director will attempt to call guardians and/or emergency contacts if campers do not attend camp when
              expected.
              <br />
              I authorize Camp Izza to have and use the photos and video of my child to be used in promotional
              materials.
              <br />
              I agree to release, hold harmless, and indemnify Camp Izza, its trustees, staff, family members of
              employees, vendors, students, volunteers or insurers, or their heirs or representatives for any and all
              claims of any nature whatsoever, including, but not limited to, those related to and arising from personal
              injuries, illnesses, or fatality that my child may suffer or incur while he/she is on the Camp Izza campus
              or while using the facilities and equipment. I agree to not hold Camp Izza responsible for loss of or
              damage to any possessions my child brings to the camp. I hereby agree to indemnify Camp Izza against any
              claims of any third parties (including, but not exclusively, members of the child's family and other camp
              participants) for damages or losses incurred by them as a result of a child's participation in Camp Izza
              or presence on campus.
              <br />I understand that registration is on a first-come, first serve basis, that my child's spot will only
              be reserved upon receipt of payment, and that returned checks will incur a $25 fee.
            </p>
            <br />

            <Table bordered striped>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {campWeeksSelected.length > 0 ? (
                  campWeeksSelected.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>
                          {item.name}: {dateTimeToDate(item.start)} - {dateTimeToDate(item.end)}
                        </strong>
                        <br />
                        {dateTimeToTime(item.start)} - {dateTimeToTime(item.end)}
                      </td>
                      <td>{item.status}</td>
                      <td>1</td>
                      <td>${isEarlyBird ? item.earlyCost : item.regularCost}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <strong>No Weeks Selected</strong>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <strong>Additional T Shirt(s)</strong>
                  </td>
                  <td></td>
                  <td> {numShirts} </td>
                  <td>
                    ${numShirts * shirtPrice} ({numShirts} x ${shirtPrice})
                  </td>
                </tr>
              </tbody>
            </Table>
            <br />

            <div className="summaryBlock">
              <h5> Order Summary </h5>
              <Table>
                <tbody>
                  <tr>
                    <td className="checkout"> Subtotal</td>
                    <td className="checkout"> ${total}</td>
                  </tr>
                  <tr>
                    <td className="checkout"> Credit</td>
                    <td className="checkout"> ${parent?.credit}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Order Due</strong>
                    </td>
                    <td>
                      <strong>${parent ? (total < parent?.credit ? 0 : total - parent?.credit) : 0}</strong>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {(parent ? total > parent?.credit : 0) ? (
                <PayPalScriptProvider
                  options={{
                    "client-id": "AZC9nSofXqQT186_jNkgK-srfaV83p8HL2TbrL2_BqAZow_9UE5rwB3LIlySSXb1wEeef0ocCIxFP1bZ",
                  }}
                >
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    forceReRender={parent ? total - parent?.credit : 0}
                    style={{ color: "blue", label: "pay", height: 40 }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="center">
                  <Button variant="success" className="Admin-Button" onClick={updateDatabase}>
                    Spend ${total} Credit and Register
                  </Button>
                  <p>*No Payment Required*</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
