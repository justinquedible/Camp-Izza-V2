// Page for parents to checkout so they can pay for the camp

import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import "./HouseholdForm.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { dateTimeToDate, dateTimeToTime, dateTimeToDateInput, dateTimeToMilitaryTime } from "./util/DateTimeUtil";
import { sortWeeks } from "./util/FilterAndSortUtil";
import { Camp_Week, Camper, Parent } from "./models/models";
import { getAuth, User } from "firebase/auth";

export default function Checkout() {
  const history = useHistory();
  const auth = getAuth();

  let numShirtsStr = sessionStorage.getItem("numShirts");
  const numShirts = numShirtsStr ? parseInt(numShirtsStr) : 0;

  const [userRole, setUserRole] = React.useState<string>();
  const [parent, setParent] = React.useState<Parent>();
  const [camper, setCamper] = React.useState<Camper>();
  const [campWeeksSelected, setCampWeeksSelected] = React.useState<Camp_Week[]>();
  const [shirtPrice, setShirtPrice] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [isEarlyBird, setIsEarlyBird] = React.useState(false);
  const noTotal = false;

  // const [orderID, setOrderID] = React.useState();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //     // setUser(user);
        //     await axios.get(process.env.REACT_APP_API + "api/users/getUser/" + user.uid).then((res) => {
        //       setUserRole(res.data.role);
        //     });
        //     // await axios.get(process.env.REACT_APP_API + "api/parents/getParent/" + user.uid).then((response) => {
        //     //   setParent(response.data);
        //     //   console.log(response.data);
        //     // });
        await fetchData();
      }
    });

    const fetchData = async () => {
      let shirtPrice = 0;
      await axios
        .get(process.env.REACT_APP_API + "api/campers/getCamper/" + sessionStorage.getItem("camper_id"))
        .then(async (response) => {
          setCamper(response.data);
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
      await axios.get(process.env.REACT_APP_API + "api/camp_weeks/getCamp_Weeks").then((response) => {
        const weeksSelected = filterAndSortWeeksSelected(response.data);
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
    };
    return unsubscribe;
  }, [auth, numShirts]);

  const filterAndSortWeeksSelected = (weeks: Camp_Week[]) => {
    const currentYear = new Date().getFullYear();
    const weeksSelected = sessionStorage.getItem("weeksSelected")?.split(",");
    weeks = weeks.filter(
      (week) => new Date(week.start).getFullYear() === currentYear && weeksSelected?.includes(week.id.toString())
    );
    return sortWeeks(weeks);
  };

  const onApprove = async () => {
    // Update camper numShirts, paid
    await axios.put(process.env.REACT_APP_API + "api/campers/updateCamper/" + camper?.id, {
      ...camper,
      dob: camper?.dob ? dateTimeToDateInput(camper.dob) : "",
      numShirts: camper ? camper.numShirts + numShirts : numShirts,
      paid: camper ? camper.paid + total : total,
    });

    // Update parent credit
    await axios.put(process.env.REACT_APP_API + "api/parents/updateParent/" + parent?.id, {
      ...parent,
      credit: parent ? (total - parent?.credit > 0 ? 0 : parent?.credit - total) : 0,
    });

    // Post to registered_camper_weeks and payment_informations, one for each campWeeksSelected
    const currentDateTime =
      dateTimeToDateInput(new Date().toString()) + " " + dateTimeToMilitaryTime(new Date().toString());
    if (campWeeksSelected) {
      for (let week of campWeeksSelected) {
        console.log(week);
        // TODO: Add camper to appropriate group
        // For now, they are put in the waitlist group
        await axios
          .post(process.env.REACT_APP_API + "api/registered_camper_weeks/addRegistered_Camper_Week", {
            camper_id: camper?.id,
            camp_week_id: week.id,
            // group_id: camper ? findGroupId(camper?.grade) : "",
            group_id: 9,
          })
          .then(async (response) => {
            console.log(response);
            await axios.post(process.env.REACT_APP_API + "api/payment_informations/addPayment_Information", {
              user_id: parent?.id,
              registered_camper_weeks_id: response.data.registered_camper_weeks_id,
              numShirts: 0,
              totalCost: total,
              totalPaidUSD: parent ? total - parent?.credit : 0,
              totalPaidCredit: parent?.credit,
              transactionTime: currentDateTime,
            });
          });
      }
    }
    if (numShirts > 0) {
      await axios.post(process.env.REACT_APP_API + "api/payment_informations/addPayment_Information", {
        user_id: parent?.id,
        numShirts: numShirts,
        totalCost: total,
        totalPaidUSD: parent ? total - parent?.credit : 0,
        totalPaidCredit: parent?.credit,
        transactionTime: currentDateTime,
      });
    }

    history.replace("/parent/completedTransaction");
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: parent ? total - parent?.credit : 0,
              currency: "USD",
            },
          },
        ],
      })
      .then((orderID: any) => {
        // setOrderID(orderID);
        return orderID;
      });
  };

  const handleNegativeTotal = () => {
    if (parent) {
      if (parent?.credit > total) {
        // setTotal = 0;
      }
    }
  };

  const findGroupId = async (grade: number | undefined) => {
    // Loop through the weeks the camper has registered in
    // Find group ids of group type they should be in
    // Find group limits using the group ids and camp week id
    // - If first group is not full and second group is empty, then put them in first group for that week.
    // - If first and second group are not full, then put them in the group with less campers for that week.
    // - If first group is full and second group is not full, then put them in the second group for that week.
    // - If the first and second group is full, then put them in the waitlist for that week

    let id = 0;
    if (grade) {
      await axios.get(process.env.REACT_APP_API + "api/count/campersInGroups").then((response) => {
        for (let r of response.data) {
          // console.log(r.name);

          if (grade == 0 || grade == 1) {
            // dates
            if (r.name.startsWith("Dates") && r.num != null && r.num < r.camperLimit) {
              console.log("hi in the dates");
              id = r.id;
            }
          } else if (grade == 2 || grade == 3) {
            // coconuts
            if (r.name.startsWith("Coconuts") && r.num != null && r.num < r.camperLimit) {
              console.log("hi in coconuts");
              id = r.id;
            }
          } else if (grade == 4 || grade == 5 || grade == 6) {
            //trees
            if (r.name.startsWith("Trees") && r.num != null && r.num < r.camperLimit) {
              console.log("hi in trees");
              id = r.id;
            }
          } else if (grade == 7 || grade == 8) {
            // young leaders
            if (r.name.startsWith("Young") && r.num != null && r.num < r.camperLimit) {
              console.log("hi in young leaders");
              id = r.id;
            }
          }
        }
      });
    }
    console.log(id);
    return id;
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="Checkout">
      <br />
      <Container className="Checkout-Table">
        <Button variant="primary" className="backButton" onClick={handleBack}>
          Back
        </Button>
        <Button variant="primary" className="backButton" onClick={onApprove}>
          Test Checkout (Until we fix paypal payment)
        </Button>
        <Button variant="outline-primary" className="backButton" onClick={() => findGroupId(camper?.grade)}>
          grade
        </Button>
        <br />
        <br />
        <h3> Checkout </h3>
        <br />

        <p>
          Checkout for: {camper?.firstName} {camper?.lastName}
        </p>
        <br />
        <p> Terms and Conditions </p>
        <p className="terms">
          I am aware of the camp activities described on the camp website and I give my permission for my child to
          participate in these activities, unless indicated. <br />
          The information submitted is true to the best of my knowledge. I understand that I am financially responsible
          for all fees and that all payments must be received by the first day of camp. All fees are non-refundable and
          there will be no refunds or exchanges for missed days. Guardians agree to screen their children for symptoms
          of illness or infection and keep their children home if symptoms are found. Guardians agree to notify Camp
          Izza if their child is ill or will not be attending as expected. Camp Director will attempt to call guardians
          and/or emergency contacts if campers do not attend camp when expected. <br />
          I authorize Camp Izza to have and use the photos and video of my child to be used in promotional materials.
          <br />I agree to release, hold harmless, and indemnify Camp Izza, its trustees, staff, family members of
          employees, vendors, students, volunteers or insurers, or their heirs or representatives for any and all claims
          of any nature whatsoever, including, but not limited to, those related to and arising from personal injuries,
          illnesses, or fatality that my child may suffer or incur while he/she is on the Camp Izza campus or while
          using the facilities and equipment. I agree to not hold Camp Izza responsible for loss of or damage to any
          possessions my child brings to the camp. I hereby agree to indemnify Camp Izza against any claims of any third
          parties (including, but not exclusively, members of the child's family and other camp participants) for
          damages or losses incurred by them as a result of a child's participation in Camp Izza or presence on campus.
          <br />I understand that registration is on a first-come, first serve basis, that my child spot will only be
          reserved upon receipt of payment and that returned checks will incur a $25 fee.
        </p>
        <br />

        <Table>
          <thead>
            <tr>
              <th> Item</th>
              <th className="center-td"> Quantity</th>
              <th className="center-td"> Price</th>
            </tr>
          </thead>
          <tbody>
            {campWeeksSelected && campWeeksSelected.length > 0 ? (
              campWeeksSelected.map((item: Camp_Week) => (
                <tr key={item.id}>
                  <td>
                    <strong>
                      {item.name}: {dateTimeToDate(item.start)} - {dateTimeToDate(item.end)}
                    </strong>
                    <br />
                    Full Day: {dateTimeToTime(item.start)} - {dateTimeToTime(item.end)}
                  </td>
                  <td> 1 </td>
                  <td> ${isEarlyBird ? item.earlyCost : item.regularCost} </td>
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
                  <strong>${parent ? (total - parent?.credit < 0 ? 0 : total - parent?.credit) : 0}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
          {(parent ? (total - parent?.credit < 0 ? 0 : total - parent?.credit) : 0) ? (
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
            <div>
              <Button variant="success" className="Admin-Button" onClick={onApprove}>
                Register
              </Button>
              <p style={{ marginLeft: 80 }}> *No Payment Required*</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
