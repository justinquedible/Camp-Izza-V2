// Page for admin to view a camper's emergency form

import React, {Component} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import './Dashboard.css';
import {Router, Switch, Route} from "react-router-dom";
import Roster from "./Roster";
import CamperService from "./services/camper-service";
import AdminService from "./services/admin-service"
interface AllAttributes {
    personalfirstName: boolean,
    personallastName: boolean,
    personalgender: boolean,
    personaldob: boolean,
    personalschool: boolean,
    personalgrade: boolean,
    weeksextendedCare: boolean,
    medicalInfodoctorName: boolean,
    medicalInfodoctorPhone: boolean,
    medicalInfoinsurance: boolean,
    medicalInfopolicyholder: boolean,
    medicalInfoillnesses: boolean,
    medicalInfoallergiesDiet: boolean,
    medicalInfomedications: boolean,
    medicalInfoactivities: boolean,
    medicalInfoactivityNames: boolean,
    medicalInfotreatments: boolean,
    medicalInfotreatmentNames: boolean,
    medicalInfoimmunizations: boolean,
    medicalInfotetanus: boolean,
    medicalInfocomments: boolean,
    parentg1FirstName: boolean,
    parentg1LastName: boolean,
    parentg2FirstName: boolean,
    parentg2LastName: boolean,
    parentemail1: boolean,
    parentemail2: boolean,
    parentg1Phone1: boolean,
    parentg1Phone2: boolean,
    parentg2Phone1: boolean,
    parentg2Phone2: boolean,
    emergencye1FirstName: boolean,
    emergencye1LastName: boolean,
    emergencye1Relationship: boolean,
    emergencye1Phone: boolean,
    emergencye2FirstName: boolean,
    emergencye2LastName: boolean,
    emergencye2Relationship: boolean,
    emergencye2Phone: boolean,
}

interface StringAttributes {
    personalfirstName: string,
    personallastName: string,
    personalgender: string,
    personaldob: string,
    personalschool: string,
    personalgrade: string,
    weeksextendedCare: string,
    medicalInfodoctorName: string,
    medicalInfodoctorPhone: string,
    medicalInfoinsurance: string,
    medicalInfopolicyholder: string,
    medicalInfoillnesses: string,
    medicalInfoallergiesDiet: string,
    medicalInfomedications: string,
    medicalInfoactivities: string,
    medicalInfoactivityNames: string,
    medicalInfotreatments: string,
    medicalInfotreatmentNames: string,
    medicalInfoimmunizations: string,
    medicalInfotetanus: string,
    medicalInfocomments: string,
    parentg1FirstName: string,
    parentg1LastName: string,
    parentg2FirstName: string,
    parentg2LastName: string,
    parentemail1: string,
    parentemail2: string,
    parentg1Phone1: string,
    parentg1Phone2: string,
    parentg2Phone1: string,
    parentg2Phone2: string,
    emergencye1FirstName: string,
    emergencye1LastName: string,
    emergencye1Relationship: string,
    emergencye1Phone: string,
    emergencye2FirstName: string,
    emergencye2LastName: string,
    emergencye2Relationship: string,
    emergencye2Phone: string,
    weeks: IWeek[],
}

const attributesInfo:StringAttributes[] = [];


interface IWeek {

    weekID: string;
    startDate: string,
    endDate: string,
    status: string,
    newStatus: string,

}

const weeks: IWeek[] = [];
export const EmergencyForm: React.FC = () =>{
    const [data, setData]: [IWeek[], (weeks: IWeek[]) => void] = React.useState(weeks);

    const [values, setValues] = React.useState({
        personalfirstName: '',
        personallastName: '',
        personalgender: '',
        personaldob: '',
        personalschool: '',
        personalgrade: '',
        weeksextendedCare: '',
        medicalInfodoctorName: '',
        medicalInfodoctorPhone: '',
        medicalInfoinsurance: '',
        medicalInfopolicyholder: '',
        medicalInfoillnesses: '',
        medicalInfoallergiesDiet: '',
        medicalInfomedications: '',
        medicalInfoactivities: '',
        medicalInfoactivityNames: '',
        medicalInfotreatments: '',
        medicalInfotreatmentNames: '',
        medicalInfoimmunizations: '',
        medicalInfotetanus: '',
        medicalInfocomments: '',
        parentg1FirstName: '',
        parentg1LastName: '',
        parentg2FirstName: '',
        parentg2LastName: '',
        parentemail1: '',
        parentemail2: '',
        parentaddress1: '',
        parentg1Phone1: '',
        parentg1Phone2: '',
        parentg2Phone1: '',
        parentg2Phone2: '',
        emergencye1FirstName: '',
        emergencye1LastName: '',
        emergencye1Relationship: '',
        emergencye1Phone: '',
        emergencye2FirstName: '',
        emergencye2LastName: '',
        emergencye2Relationship: '',
        emergencye2Phone: '',

    });


    React.useEffect(() => {

        let name:string | null;
        let named:string | null;
        name = localStorage.getItem("currentChild");
        let camper = localStorage.getItem("currentChildID")
        let id = Number(camper)

        AdminService.emergencyInfo(id).then(response => {

            setValues(response.data[0])


        })
        AdminService.getCamperSchedule(id).then(r => {
            setData(r.data);
        })


    }, [])

    return (
            <body>
            <br />
            <Container className="Admin-Buttons">
                <h3> Emergency Release Form </h3><br />
                <hr />

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Camper's Name </p>
                        {values.personalfirstName} {values.personallastName}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Grade </p>
                        {values.personalgrade}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> School </p>
                        {values.personalschool}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Address </p>
                        {values.parentaddress1}
                    </div>
                    <div className={"column16"}>
                        <p className={"fineText"}> Birthday </p>
                        {values.personaldob}
                    </div>

                    <div className={"column16"}>
                        <p className={"fineText"}> Gender </p>
                        {values.personalgender}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Parent 1 </p>
                        {values.parentg1FirstName} {values.parentg1LastName}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Phone 1 </p>
                        {values.parentg1Phone1}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Phone 2 </p>
                        {values.parentg1Phone1}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Parent 2 </p>
                        {values.parentg2FirstName} {values.parentg2LastName}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Phone 3 </p>
                        {values.parentg2Phone1}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Phone 4 </p>
                        {values.parentg2Phone2}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Email 1 </p>
                        {values.parentemail1}
                    </div>
                    <div className={"column"}>
                        <p className={"fineText"}> Email 2 </p>
                        {values.parentemail2}
                    </div>
                </div>

                <hr />

                <div className={"disclaimerBox"}>
                    I hereby authorize the following persons to pick up my child at the end of the session or in the case of emergency:
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Name </p>
                        {values.emergencye1FirstName} {values.emergencye1LastName}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Phone </p>
                        {values.emergencye1Phone}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Relationship </p>
                        {values.emergencye1Relationship}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Name </p>
                        {values.emergencye2FirstName} {values.emergencye2LastName}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Phone </p>
                        {values.emergencye2Phone}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Relationship </p>
                        {values.emergencye2Relationship}
                    </div>
                </div>

                <hr />

                <div className={"disclaimerBox"}>
                    In the case of an emergency, I hereby give permission to the first aid / medical personnel selected
                    by Camp Izza to order x-rays, routine tests, treatment, and to release any records necessary for insurance purposes
                    as well as provide or arrange necessary related transportation for my child. In the event I cannot be
                    reached in an emergency, I hereby give permission to the physician selected by the camp to secure and
                    administer treatment, including hospitalization, for the camper named above. NOTE: In the event
                    of accident or incidents that occur during camp, an "OOPS!" report will be sent home.
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Doctor Name </p>
                        {values.medicalInfodoctorName}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Doctor Phone </p>
                        {values.medicalInfodoctorPhone}
                    </div>
                    <div className={"column4"}>
                        <p className={"fineText"}> Insurance Carrier </p>
                        {values.medicalInfoinsurance}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}> Chronic Conditions or Illnesses </p>
                        {values.medicalInfoillnesses}
                    </div>
                    <div className={"column"}>
                        <p className={"fineText"}> Policyholder Name </p>
                        {values.medicalInfopolicyholder}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column33"}>
                        <p className={"fineText"}> Will your child take any medications? </p>
                        {values.medicalInfomedications}
                    </div>
                    <div className={"column33"}>
                        <p className={"fineText"}> If yes, specify </p>

                    </div>
                    <div className={"column33"}>
                        <p className={"fineText"}> Allergies or Dietary Restrictions </p>
                        {values.medicalInfoallergiesDiet}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column33"}>
                        <p className={"fineText"}> Are there any activities at camp that your child cannot participate in? </p>
                        {values.medicalInfoactivities}
                    </div>
                    <div className={"column33"}>
                        <p className={"fineText"}> If yes, specify </p>

                    </div>
                    <div className={"column33"}>
                        <p className={"fineText"}> Has your child received all current immunizations? </p>
                        {values.medicalInfoimmunizations}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"column33"}>
                        <p className={"fineText"}> Recent medical treatments/ </p>
                        {values.medicalInfotreatments}
                    </div>
                    <div className={"column33"}>
                        <p className={"fineText"}> If yes, specify </p>

                    </div>
                    <div className={"column33"}>
                        <p className={"fineText"}> Date of last tetanus shot </p>
                        {values.medicalInfotetanus}
                    </div>
                </div>

                <hr />

                <table>
                    {data.map(weeks => (
                        <tr>
                            <td> Week {weeks.weekID }  </td>

                            <p className={"fineText"}>{weeks.status }  </p>
                        </tr>
                    ))}

                </table>

                <hr />

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}>Will you require extended care? ($20/per day)</p>
                        {values.weeksextendedCare}
                    </div>
                    <div className={"column"}>
                        <p className={"fineText"}>Comments</p>
                        {values.medicalInfocomments}
                    </div>
                </div>

                <div className={"disclaimerBox"}>
                    I am aware of the camp activities described on the camp website and I give my permission for my child to participate in these activities, unless indicated above.
                    The above information is true to the best of my knowledge. I understand that I am financially responsible for all fees and that all payments must be received by
                    the first day of camp. All fees are non-refundable and there will be no refunds or exchanges for missed days. Parents are asked to notify Camp Izza if their child
                    is ill or will not be attending as expected. Camp Director will attempt to call parents/guardians and/or emergency contacts if campers do not arrive to camp
                    when expected. I authorize Camp Izza to have and use the photos and video of the person named above in camp promotional materials. I agree to release, hold
                    harmless, and indemnify Camp Izza, its trustees, staff, family members of employees, vendors, students, volunteers or insurers, or their heirs or representatives
                    for any and all claims of any nature whatsoever, including, but not limited to, those related to and arising from personal injuries, illnesses, or fatality that my child
                    may suffer or incur while he/she is on the Camp Izza campus or while using the facilities and equipment. I agree to not hold Camp Izza responsible for loss of or
                    damage to any possessions my child brings to the camp and campus. I hereby agree to indemnify Camp Izza against any claims of any third parties (including,
                    but not exclusively, members of the child's family and other camp participants) for damages or losses incurred by them as a result of a child's participation in
                    Camp Izza or presence on campus
                </div>

                <div className={"row"}>
                    <div className={"column"}>
                        <p className={"fineText"}>Parent / Guardian Signature</p>

                    </div>
                    <div className={"column"}>
                        <p className={"fineText"}>Date</p>

                    </div>
                </div>

            </Container>
            </body>
    )
}
export default EmergencyForm;

