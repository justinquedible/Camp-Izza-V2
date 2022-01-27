// Page for parents to checkout so they can pay for the camp

import React, {Component, useState} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import './HouseholdForm.css';
import ReactDOM from "react-dom";
import {Router, Switch, Route} from "react-router-dom";

import NavBarInstance from './NavBar';
import FooterInstance from './Footer';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CamperService from "./services/camper-service"
import AuthService from "./services/auth-service";
import AdminService from "./services/admin-service";

interface IWeek {

    weekID: string;
    startDate: string,
    endDate: string,
    status: string,
    newStatus: string,

}

interface camperProps {
    numShirts: number,
    amountPaid: number,
    credit: number
}

const defaultWeeks:IWeek[] = [];

const Checkout = () => {
    // DEVS: SET AMOUNT HERE IN USESTATE
    // Next step: Update camper account balance on approved payment
    // Docs: https://paypal.github.io/react-paypal-js/?path=/docs/example-paypalbuttons--dynamic-amount
    const currentUserID = AuthService.currentUser().id;
    const [amount, setAmount] = useState(295);
    const [data, setData]: [IWeek[], (weeks: IWeek[]) => void] = React.useState(defaultWeeks);
    const [credit,setCredit] = React.useState({
        credit: 0
    });
    const [paid,setPaid] = React.useState({
        amountPaid: 0
    });
    const [orderID, setOrderID] = useState(false);
    const [shirts, setNum] = React.useState({
        numShirts: 0
    });
    const [price, setPrice] = React.useState({
        pricing_base_rate: 0,
        pricing_extra_rate: 0,
        extra_shirts: 0,
        extended_rate: 0,
    });

    const [weeks, setWeeks] = React.useState({
        week1start: "",
        week1end: "",
        week1id: 0,
        week1holidays: [],
        week2start: "",
        week2end: "",
        week2id: 0,
        week3start: "",
        week3end: "",
        week3id: 0,
        week4start: "",
        week4end: "",
        week4id: 0,
        week5start: "",
        week5end: "",
        week5id: 0,
        week6start: "",
        week6end: "",
        week6id: 0,
        week7start: "",
        week7end: "",
        week7id: 0,
        week8start: "",
        week8end: "",
        week8id: 0,
        week9start: "",
        week9end: "",
        week9id: 0,
        week10start: "",
        week10end: "",
        week10id: 0,
        weekHoliday: "",
        currentWeekID: 0,
        cutoff: ""

    });
    // const currentUserID = AuthService.currentUser().id;


    let camperName = AuthService.currentChild();
    let currentDate = Date();
    let cutoffDate = Date.parse(weeks.cutoff);
    function currentUserPrice(){
        var currentPrice = 0;
        if (Date.parse(currentDate) <= cutoffDate) {
            currentPrice = price.pricing_base_rate;
        }
        else{
            currentPrice = price.pricing_extra_rate;
        }
        return currentPrice;
    }
    React.useEffect( () => {
        // const currentUserID = AuthService.currentUser().id;
        let camperName = AuthService.currentChild();
        let userID = AuthService.currentUser().id;
        AdminService.getProgramPrice().then(response => {
            setPrice(response.data)
        })
        AdminService.getProgramInfo().then(response => {

            weeks.cutoff = response.data;
        })
    //     CamperService.getScheduleInfo(camperName, userID).then(response => {
    //
    //         setData(response.data.currentWeeksRegistered);
    //         setNum(response.data);
    //
    // })
        let num = Number.parseInt(localStorage.getItem("numShirts") as string)
        let regWeeks = JSON.parse(localStorage.getItem("schedule") as string)
        setData(regWeeks)


        shirts.numShirts = num
        CamperService.getCredit(userID).then(response =>{
            setCredit(response.data);
            })
        CamperService.getPaid(userID).then(response =>{
                setPaid(response.data);
            })
    }, [])

    // @ts-ignore
    // function onChange({ target: { value } }) {
    //     setAmount(value);
    //     setOrderID(false);
    // }

    let TShirtTotal = shirts.numShirts*price.extra_shirts;
    function CountWeeksReg(dataList:any){
        var count = 0;
        for (var i=0; i < dataList.length; i++) {
            if (dataList[i].status === "full") {
                count++
            }
        }
        return count;
    }
    const subtotal = CountWeeksReg(data)*currentUserPrice()+TShirtTotal;
    // function orderdue() {
    //     // setAmount(subtotal-credit.credit)
    //     return subtotal-credit.credit;
    // }
    let orderdue = subtotal-credit.credit;
    function checkRegistered(item:any){
        return item.status === "full";
    }
    let newpaid = orderdue+paid.amountPaid;
    async function UpdatePaid() {
        const currentUser = localStorage.currentUser();
        let userID = currentUser.id;
        let name = localStorage.getItem("currentChild") as string
        await CamperService.assignPaid(userID, newpaid);
        await CamperService.addCamperSchedule(name, userID, shirts.numShirts, data);
        window.location.href="/#/CompletedTransaction";
    }
    let currentWeeks = data.filter(checkRegistered)
    function createOrder(data:any, actions:any) {
        // UpdatePaid();
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: orderdue,
                            currency_code: "USD"
                        },
                    },
                ],
            })
            .then((orderID:any) => {
                setOrderID(orderID);
                return orderID;
            });
    }

        return (
            <div className="Checkout">
                <body>
                <br/>
                <Container className="Checkout-Table">
                    <Button variant="primary" className="backButton" href="/#/newscheduling"> Back </Button>
                    <br/><br/>
                    <h3> Checkout </h3>
                    <br/>

                    <p> Checkout for: {camperName} </p>
                    <br/>
                    <p> Terms and Conditions </p>
                    <p className="terms">
                        I am aware of the camp activities described on the camp website and I give my permission for my
                        child to participate in these activities, unless indicated. <br/>
                        The information submitted is true to the best of my knowledge. I understand that I am
                        financially responsible for all fees and that all payments must be received by the first day of
                        camp. All fees are non-refundable and there will be no refunds or exchanges for missed days.
                        Guardians agree to screen their children for symptoms of illness or infection and keep their
                        children home if symptoms are found. Guardians agree to notify Camp Izza if their child is ill
                        or will not be attending as expected. Camp Director will attempt to call guardians and/or
                        emergency contacts if campers do not attend camp when expected. <br/>
                        I authorize Camp Izza to have and use the photos and video of my child to be used in promotional
                        materials.<br/>
                        I agree to release, hold harmless, and indemnify Camp Izza, its trustees, staff, family members
                        of employees, vendors, students, volunteers or insurers, or their heirs or representatives for
                        any and all claims of any nature whatsoever, including, but not limited to, those related to and
                        arising from personal injuries, illnesses, or fatality that my child may suffer or incur while
                        he/she is on the Camp Izza campus or while using the facilities and equipment. I agree to not
                        hold Camp Izza responsible for loss of or damage to any possessions my child brings to the camp.
                        I hereby agree to indemnify Camp Izza against any claims of any third parties (including, but
                        not exclusively, members of the child's family and other camp participants) for damages or
                        losses incurred by them as a result of a child's participation in Camp Izza or presence on
                        campus. <br/>
                        I understand that registration is on a first-come, first serve basis, that my child spot will
                        only be reserved upon receipt of payment and that returned checks will incur a $25 fee.
                    </p>
                    <br/>

                    <table>
                        <tr>
                            <th> Item</th>
                            <th className="center-td"> Quantity</th>
                            <th className="center-td"> Price</th>
                        </tr>
                        {currentWeeks.map(item => (
                            <tr>
                                <td> <strong>Camp Week {item.weekID}: {item.startDate} - {item.endDate}</strong> <br />
                            Full Day: 9:30am - 3:00pm</td>
                            <td> 1 </td>
                            <td> ${currentUserPrice()}  </td>
                            </tr>

                        ))}
                        <tr>
                            <td> <strong>Additional T Shirt</strong> </td>
                            <td> {shirts.numShirts}  </td>
                            <td> ${TShirtTotal}  </td>
                        </tr>
                    </table>
                    <br/>

                    <div className="summaryBlock">
                        <h5> Order Summary </h5>
                        <table>
                            <tr>
                                <td className="checkout"> Subtotal</td>
                                <td className="checkout"> ${subtotal}</td>
                            </tr>
                            <tr>
                                <td className="checkout"> Credit</td>
                                <td className="checkout"> ${credit.credit}</td>
                            </tr>
                            <tr>
                                <td> Order Due</td>
                                <td> ${orderdue}</td>
                            </tr>
                        </table>
                        {/*{UpdatePaid}*/}
                        {/*<p>New Paid: {newpaid}</p>*/}
                        <PayPalScriptProvider options={{ "client-id": "AXAAL08JOUWnKxbfv1qpK2f_UEfhbNPh7ahJrnpsCBKpHlQUJI_5NePpekQ6DryGsXkw33N6f6R09VLL"}}>
                            {/*<PayPalButtons  createOrder={createOrder} forceReRender={orderdue} style={{ color: "blue", label: "pay", height: 40 }}  />*/}
                            <PayPalButtons  createOrder={createOrder} onApprove={UpdatePaid} forceReRender={orderdue} style={{ color: "blue", label: "pay", height: 40 }}  />
                        </PayPalScriptProvider>
                    </div>
                </Container>
                </body>
            </div>
        )

}

export default Checkout;

