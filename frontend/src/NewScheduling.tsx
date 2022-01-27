// Page for parents to view their child's weekly schedule for the camp
// Parents can register their child for specific weeks and go to checkout

import React, {Component} from 'react';
import {Button, Container, Row, Col, Card, CardColumns, CardDeck, Table} from 'react-bootstrap';
import './HouseholdForm.css';
import {Router, Switch, Route} from "react-router-dom";

import NavBarInstance from './NavBar';
import FooterInstance from './Footer';
import axios from 'axios';
import currentUser from './services/auth-service';
import authHeader from "./services/auth-header";
import ParentService from  './services/parent-service';
import AuthService from "./services/auth-service";
import CamperService from "./services/camper-service";
import AdminService from "./services/admin-service";

interface IWeek {

    weekID: string;
    startDate: string,
    endDate: string,
    status: string,
    newStatus: string,

}

interface camperSchedulingProps {
    numShirts: Number
}

const defaultWeeks:IWeek[] = [];

export const NewScheduling: React.FC= () => {
    const currentUserID = AuthService.currentUser().id;
    let name = AuthService.currentChild();
    const [data, setData]: [IWeek[], (weeks: IWeek[]) => void] = React.useState(defaultWeeks);
    const [status, setStatus] = React.useState(defaultWeeks);
    const [num, setNum] = React.useState({
        numShirts: 0
    });
    const [price, setPrice] = React.useState({
        pricing_base_rate: 0,
        pricing_extra_rate: 0,
        extra_shirts: 0,
        extended_rate: 0,

    });
    const [info, setInfo] = React.useState({
        cutoff: "",
        amTimeStart: "",
        amTimeEnd: "",
        amECTimeStart: "",
        amECTimeEnd: "",
        pmTimeStart: "",
        pmTimeEnd: "",
        pmECTimeStart: "",
        pmECTimeEnd: "",
        fullTimeStart: "",
        fullTimeEnd: "",
        fullECTimeStart: "",
        fullECTimeEnd: "",
        amSelected: false,
        amECSelected: false,
        pmSelected: false,
        pmECSelected: false,
        fullSelected: false,
        fullECSelected: false
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
    });
    React.useEffect( () => {
        const currentUser = AuthService.currentUser();
        let email = currentUser.email;
        let name = AuthService.currentChild();
        let userID = currentUser.id;
        AdminService.getProgramPrice().then(response => {
            setPrice(response.data)
        })

        AdminService.getProgramWeeks().then(response => {


            setWeeks(response.data)
        })

        CamperService.getScheduleInfo(name, userID).then(response => {

            setData(response.data.currentWeeksRegistered);
            setNum(response.data);






        })

        AdminService.getProgramInfo().then(r => {
            info.amSelected = JSON.parse(r.data.amSelected);
            info.amECSelected = JSON.parse(r.data.amECSelected);
            info.pmSelected = JSON.parse(r.data.pmSelected);
            info.pmECSelected = JSON.parse(r.data.pmECSelected);
            info.fullSelected = JSON.parse(r.data.fullSelected);
            info.fullECSelected = JSON.parse(r.data.fullECSelected);
            info.cutoff = r.data.cutoff;
            info.amTimeStart= r.data.amTimeStart
            info.amTimeEnd= r.data. amTimeEnd
            info.amECTimeStart= r.data. amECTimeStart  ;
            info.amECTimeEnd= r.data. amECTimeEnd  ;
            info.pmTimeStart= r.data.pmTimeStart   ;
            info.pmTimeEnd= r.data. pmTimeEnd  ;
            info.pmECTimeStart= r.data. pmECTimeStart  ;
            info.pmECTimeEnd= r.data. pmECTimeEnd  ;
            info.fullTimeStart= r.data.fullTimeStart   ;
            info.fullTimeEnd= r.data. fullTimeEnd  ;
            info.fullECTimeStart= r.data. fullECTimeStart  ;
            info.fullECTimeEnd= r.data.  fullECTimeEnd ;
        })

    }, [])

    function milToStandard(value:any ) {

        if (value !== null && value !== undefined){ //If value is passed in
            if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
                return value;
            }
            else {
                if(value.length == 5){ //If value is the expected length for military time then process to standard time.
                    var hour = value.substring ( 0,2 ); //Extract hour
                    var minutes = value.substring ( 3,5 ); //Extract minutes

                    var identifier = 'AM'; //Initialize AM PM identifier

                    if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
                        identifier = 'PM';
                    }
                    if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
                        hour=12;
                    }
                    if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
                        hour = hour - 12;
                        identifier='PM';
                    }
                    return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
                }
                else { //If value is not the expected length than just return the value as is
                    return value;
                }
            }
        }
    };

    const handleSubmit = async (e: {preventDefault: () => void; }) => {
        const currentUser = AuthService.currentUser();
        let name = AuthService.currentChild();
        let email = currentUser.email;
        let userID = currentUser.id;

        e.preventDefault();

        localStorage.setItem("schedule", JSON.stringify( data))
        localStorage.setItem("numShirts", JSON.stringify( num.numShirts))
        //await CamperService.addCamperSchedule(name, userID, num.numShirts, data);

        window.location.href="/#/checkout"
        window.location.reload();
    }


    const handleShirtChange = (name: string) => (e: {target: {value: any; }; }) => {
        setNum({...num, [name]: e.target.value});

    };

    const handleChange  = (name: string) => (e: {target: {value: any; }; }) => {
        var location: number = +name;
        location --;

        data[location].status =  e.target.value.toString();

        setStatus({...data});
    };
    let currentDate = Date();
    let cutoffDate = Date.parse(info.cutoff);
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



    return (
        <div className="Schedule">
            <body>
            <br />
            <Container className="Schedule-Table">
                <Button variant="primary" className="backButton" href="/#/parent"> Back </Button>
                <br /><br />
                <h3> Camper Scheduling </h3>
                <br />

                <p> Scheduling for: {name}  </p>

                <br />
                <p> Camp Times:

                    <ul>
                        {info.amSelected  && <li>Morning: {milToStandard(info.amTimeStart)} - {milToStandard(info.amTimeEnd)}</li>}
                        {info.pmSelected && <li>Afternoon: {milToStandard(info.pmTimeStart)} - {milToStandard(info.pmTimeEnd)}</li>}
                        {info.fullSelected  &&  <li>Full Day: {milToStandard(info.fullTimeStart)} - {milToStandard(info.fullTimeEnd)}</li>}
                    </ul>
                </p>
                <br />
                <p> Camp Prices: <br />
                    • ${currentUserPrice()}/week
                </p>
                <br /><br />

                <form>
                <Table striped bordered className="schedule" >
                    <thead>
                    <tr>
                        <th>Week</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Registration Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr>
                            <td> {item.weekID }  </td>
                            <td> {item.startDate }  </td>
                            <td> {item.endDate }  </td>

                            <td> <select onChange={ handleChange(item.weekID) } value={item.status}> <option value="not-reg" selected> Not Registered </option> <option value="full"> Full Day </option> </select> </td>
                        </tr>
                    ))}

                    </tbody>
                </Table>


                    <br /><br />
                <em>Every camper gets 1 free shirt.</em><br />
                # of Additional T Shirts (${price.extra_shirts} each) &nbsp; <input type="number" min="0" placeholder="0" className="numberInput" onChange={handleShirtChange('numShirts')}
                                                                  value={num.numShirts}/>
                </form><br />

                <div className="center"><Button variant="success" className="buttonTxt"
                                                type="submit" onClick={handleSubmit}> Checkout </Button></div>

            </Container>
            </body>
        </div>
    )
}

export default NewScheduling;

