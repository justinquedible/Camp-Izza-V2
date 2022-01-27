// Page for admin to filter and view camp roster

import React, { Component } from 'react';
import {Button, Container, Table} from "react-bootstrap";
import './Dashboard.css';
import AdminService from "./services/admin-service";

interface Props {
}

interface AllAttributes {
    option: string,
    personalchildID: boolean,
    personalfirstName: boolean,
    personallastName: boolean,
    personalgender: boolean,
    personaldob: boolean,
    personalschool: boolean,
    personalgrade: boolean,
    personalshirtSize: boolean,
    personalnumShirts: boolean,
    personalallReg: boolean,
    personalaccCreated: boolean,
    personalyearCreated: boolean,
    personalgroup: boolean,
    weekswk1AM: boolean,
    weekswk1PM: boolean,
    weekswk2AM: boolean,
    weekswk2PM: boolean,
    weekswk3AM: boolean,
    weekswk3PM: boolean,
    weekswk4AM: boolean,
    weekswk4PM: boolean,
    weekswk5AM: boolean,
    weekswk5PM: boolean,
    weekswk6AM: boolean,
    weekswk6PM: boolean,
    weekswk7AM: boolean,
    weekswk7PM: boolean,
    weekswk8AM: boolean,
    weekswk8PM: boolean,
    weekswk9AM: boolean,
    weekswk9PM: boolean,
    weekswk10AM: boolean,
    weekswk10PM: boolean,
    weeksextendedCare: boolean,
    attendancewk1Expected: boolean,
    attendancewk1Actual: boolean,
    attendancewk2Expected: boolean,
    attendancewk2Actual: boolean,
    attendancewk3Expected: boolean,
    attendancewk3Actual: boolean,
    attendancewk4Expected: boolean,
    attendancewk4Actual: boolean,
    attendancewk5Expected: boolean,
    attendancewk5Actual: boolean,
    attendancewk6Expected: boolean,
    attendancewk6Actual: boolean,
    attendancewk7Expected: boolean,
    attendancewk7Actual: boolean,
    attendancewk8Expected: boolean,
    attendancewk8Actual: boolean,
    attendancewk9Expected: boolean,
    attendancewk9Actual: boolean,
    attendancewk10Expected: boolean,
    attendancewk10Actual: boolean,
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
    parentparentID: boolean,
    parentregTime: boolean,
    parentlocation: boolean,
    parentg1FirstName: boolean,
    parentg1LastName: boolean,
    parentg2FirstName: boolean,
    parentg2LastName: boolean,
    parentaddress1: boolean,
    parentaddress2: boolean,
    parentcountry: boolean,
    parentcity: boolean,
    parentstate: boolean,
    parentzipcode: boolean,
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
    emergencye1Authorized: boolean,
    emergencye2FirstName: boolean,
    emergencye2LastName: boolean,
    emergencye2Relationship: boolean,
    emergencye2Phone: boolean,
    emergencye2Authorized: boolean,
    paymentsamountPaid: boolean,
    paymentscredit: boolean,
    paymentsearlyBird: boolean,
    counselorscounselorID: boolean,
    counselorscounselorEmail: boolean,
    counselorscounselorGroup: boolean,
    counselorscounselorStatus: boolean
    counselorsFirstName: boolean,
    counselorsLastName: boolean,
    year: number;
}

interface StringAttributes {
    id: string,
    firstName :  string
    lastName :  string
    personalchildID: string,
    personalfirstName: string,
    personallastName: string,
    personalgender: string,
    personaldob: string,
    personalschool: string,
    personalgrade: string,
    personalshirtSize: string,
    personalnumShirts: string,
    personalallReg: string,
    personalaccCreated: string,
    personalgroup: string,
    weekswk1AM: string,
    weekswk1PM: string,
    weekswk2AM: string,
    weekswk2PM: string,
    weekswk3AM: string,
    weekswk3PM: string,
    weekswk4AM: string,
    weekswk4PM: string,
    weekswk5AM: string,
    weekswk5PM: string,
    weekswk6AM: string,
    weekswk6PM: string,
    weekswk7AM: string,
    weekswk7PM: string,
    weekswk8AM: string,
    weekswk8PM: string,
    weekswk9AM: string,
    weekswk9PM: string,
    weekswk10AM: string,
    weekswk10PM: string,
    weeksextendedCare: string,
    attendancewk1Expected: string,
    attendancewk1Actual: string,
    attendancewk2Expected: string,
    attendancewk2Actual: string,
    attendancewk3Expected: string,
    attendancewk3Actual: string,
    attendancewk4Expected: string,
    attendancewk4Actual: string,
    attendancewk5Expected: string,
    attendancewk5Actual: string,
    attendancewk6Expected: string,
    attendancewk6Actual: string,
    attendancewk7Expected: string,
    attendancewk7Actual: string,
    attendancewk8Expected: string,
    attendancewk8Actual: string,
    attendancewk9Expected: string,
    attendancewk9Actual: string,
    attendancewk10Expected: string,
    attendancewk10Actual: string,
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
    parentparentID: string,
    parentregTime: string,
    parentlocation: string,
    parentg1FirstName: string,
    parentg1LastName: string,
    parentg2FirstName: string,
    parentg2LastName: string,
    parentaddress1: string,
    parentaddress2: string,
    parentcountry: string,
    parentcity: string,
    parentstate: string,
    parentzipcode: string,
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
    emergencye1Authorized: string,
    emergencye2FirstName: string,
    emergencye2LastName: string,
    emergencye2Relationship: string,
    emergencye2Phone: string,
    emergencye2Authorized: string,
    paymentsamountPaid: string,
    paymentscredit: string,
    paymentsearlyBird: string,
    counselorscounselorID: string,
    counselorscounselorEmail: string,
    counselorscounselorGroup: string,
    counselorscounselorStatus: string
}

const attributesInfo:StringAttributes[] = [];

interface Counselors {
    id: number,
    firstName: string,
    lastName: string,
    group: string,
    role: string,
    email: string
}


const counselorInfo:Counselors[] = [];

export const Roster: React.FC<Props> = () => {
    const [showResults, setResults] = React.useState(false );
    const [showOptions, setOptions] = React.useState(true);
    const [data, setData]: [StringAttributes[], (campers: StringAttributes[]) => void] = React.useState(attributesInfo);
    const [values, setValues]: [Counselors[], (counselors: Counselors[]) => void] = React.useState(counselorInfo);
    const [showCounselors, setCounselors] = React.useState(false);

    const date = new Date();
    let currentYear = date.getFullYear();

    const [attributes, setAttributes] = React.useState<AllAttributes>({
        year: currentYear,
        option: "test",
        personalchildID: false,
        personalfirstName: false,
        personallastName: false,
        personalgender: false,
        personaldob: false,
        personalschool: false,
        personalgrade: false,
        personalshirtSize: false,
        personalnumShirts: false,
        personalallReg: false,  // All Accounts registered for when year is sent
        personalaccCreated: false, // All Accounts Made
        personalyearCreated: false,
        personalgroup: false,
        weekswk1AM: false,
        weekswk1PM: false,
        weekswk2AM: false,
        weekswk2PM: false,
        weekswk3AM: false,
        weekswk3PM: false,
        weekswk4AM: false,
        weekswk4PM: false,
        weekswk5AM: false,
        weekswk5PM: false,
        weekswk6AM: false,
        weekswk6PM: false,
        weekswk7AM: false,
        weekswk7PM: false,
        weekswk8AM: false,
        weekswk8PM: false,
        weekswk9AM: false,
        weekswk9PM: false,
        weekswk10AM: false,
        weekswk10PM: false,
        weeksextendedCare: false,
        attendancewk1Expected: false,
        attendancewk1Actual: false,
        attendancewk2Expected: false,
        attendancewk2Actual: false,
        attendancewk3Expected: false,
        attendancewk3Actual: false,
        attendancewk4Expected: false,
        attendancewk4Actual: false,
        attendancewk5Expected: false,
        attendancewk5Actual: false,
        attendancewk6Expected: false,
        attendancewk6Actual: false,
        attendancewk7Expected: false,
        attendancewk7Actual: false,
        attendancewk8Expected: false,
        attendancewk8Actual: false,
        attendancewk9Expected: false,
        attendancewk9Actual: false,
        attendancewk10Expected: false,
        attendancewk10Actual: false,
        medicalInfodoctorName: false,
        medicalInfodoctorPhone: false,
        medicalInfoinsurance: false,
        medicalInfopolicyholder: false,
        medicalInfoillnesses: false,
        medicalInfoallergiesDiet: false,
        medicalInfomedications: false,
        medicalInfoactivities: false,
        medicalInfoactivityNames: false,
        medicalInfotreatments: false,
        medicalInfotreatmentNames: false,
        medicalInfoimmunizations: false,
        medicalInfotetanus: false,
        medicalInfocomments: false,
        parentparentID: false,
        parentregTime: false,
        parentlocation: false,
        parentg1FirstName: false,
        parentg1LastName: false,
        parentg2FirstName: false,
        parentg2LastName: false,
        parentaddress1: false,
        parentaddress2: false,
        parentcountry: false,
        parentcity: false,
        parentstate: false,
        parentzipcode: false,
        parentemail1: false,
        parentemail2: false,
        parentg1Phone1: false,
        parentg1Phone2: false,
        parentg2Phone1: false,
        parentg2Phone2: false,
        emergencye1FirstName: false,
        emergencye1LastName: false,
        emergencye1Relationship: false,
        emergencye1Phone: false,
        emergencye1Authorized: false,
        emergencye2FirstName: false,
        emergencye2LastName: false,
        emergencye2Relationship: false,
        emergencye2Phone: false,
        emergencye2Authorized: false,
        paymentsamountPaid: false,
        paymentscredit: false,
        paymentsearlyBird: false,
        counselorscounselorID: false,
        counselorscounselorEmail: false,
        counselorscounselorGroup: false,
        counselorscounselorStatus: false,
        counselorsFirstName: false,
        counselorsLastName: false,
    });



    const handlePersonalToggle = (state: number) => {
        if (state == 1){
            attributes.personalchildID= true
            attributes.personalfirstName= true
            attributes.personallastName= true
            attributes.personalgender= true
            attributes.personaldob= true
            attributes.personalschool= true
            attributes.personalgrade= true
            attributes.personalshirtSize= true
            attributes.personalnumShirts= true

            attributes.personalgroup= true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.personalchildID= false
            attributes.personalfirstName= false
            attributes.personallastName= false
            attributes.personalgender= false
            attributes.personaldob= false
            attributes.personalschool= false
            attributes.personalgrade= false
            attributes.personalshirtSize= false
            attributes.personalnumShirts= false

            attributes.personalgroup= false
            setAttributes({...attributes});
        }
    }

    const handleWeeksToggle = (state: number) => {
        if (state == 1){
            attributes.weekswk1AM= true
            attributes.weekswk1PM= true
            attributes.weekswk2AM= true
            attributes.weekswk2PM= true
            attributes.weekswk3AM= true
            attributes.weekswk3PM= true
            attributes.weekswk4AM= true
            attributes.weekswk4PM= true
            attributes.weekswk5AM= true
            attributes.weekswk5PM= true
            attributes.weekswk6AM= true
            attributes.weekswk6PM= true
            attributes.weekswk7AM= true
            attributes.weekswk7PM= true
            attributes.weekswk8AM= true
            attributes.weekswk8PM= true
            attributes.weekswk9AM= true
            attributes.weekswk9PM= true
            attributes.weekswk10AM= true
            attributes.weekswk10PM= true
            attributes.weeksextendedCare = true
            attributes.personalaccCreated = true
            attributes.personalallReg = true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.weekswk1AM= false
            attributes.weekswk1PM= false
            attributes.weekswk2AM= false
            attributes.weekswk2PM= false
            attributes.weekswk3AM= false
            attributes.weekswk3PM= false
            attributes.weekswk4AM= false
            attributes.weekswk4PM= false
            attributes.weekswk5AM= false
            attributes.weekswk5PM= false
            attributes.weekswk6AM= false
            attributes.weekswk6PM= false
            attributes.weekswk7AM= false
            attributes.weekswk7PM= false
            attributes.weekswk8AM= false
            attributes.weekswk8PM= false
            attributes.weekswk9AM= false
            attributes.weekswk9PM= false
            attributes.weekswk10AM= false
            attributes.weekswk10PM= false
            attributes.weeksextendedCare = false
            attributes.personalaccCreated = false
            attributes.personalallReg = false
            setAttributes({...attributes});
        }
    }

    const handleAttendanceToggle = (state: number) => {
        if (state == 1){
            attributes.attendancewk1Expected= true
            attributes.attendancewk1Actual= true
            attributes.attendancewk2Expected= true
            attributes.attendancewk2Actual= true
            attributes.attendancewk3Expected= true
            attributes.attendancewk3Actual= true
            attributes.attendancewk4Expected= true
            attributes.attendancewk4Actual= true
            attributes.attendancewk5Expected= true
            attributes.attendancewk5Actual= true
            attributes.attendancewk6Expected= true
            attributes.attendancewk6Actual= true
            attributes.attendancewk7Expected= true
            attributes.attendancewk7Actual= true
            attributes.attendancewk8Expected= true
            attributes.attendancewk8Actual= true
            attributes.attendancewk9Expected= true
            attributes.attendancewk9Actual= true
            attributes.attendancewk10Expected= true
            attributes.attendancewk10Actual= true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.attendancewk1Expected= false
            attributes.attendancewk1Actual= false
            attributes.attendancewk2Expected= false
            attributes.attendancewk2Actual= false
            attributes.attendancewk3Expected= false
            attributes.attendancewk3Actual= false
            attributes.attendancewk4Expected= false
            attributes.attendancewk4Actual= false
            attributes.attendancewk5Expected= false
            attributes.attendancewk5Actual= false
            attributes.attendancewk6Expected= false
            attributes.attendancewk6Actual= false
            attributes.attendancewk7Expected= false
            attributes.attendancewk7Actual= false
            attributes.attendancewk8Expected= false
            attributes.attendancewk8Actual= false
            attributes.attendancewk9Expected= false
            attributes.attendancewk9Actual= false
            attributes.attendancewk10Expected= false
            attributes.attendancewk10Actual= false
            setAttributes({...attributes});
        }
    }

    const handleMedicalToggle = (state: number) => {
        if (state == 1){
            attributes.medicalInfodoctorName= true
            attributes.medicalInfodoctorPhone= true
            attributes.medicalInfoinsurance= true
            attributes.medicalInfopolicyholder= true
            attributes.medicalInfoillnesses= true
            attributes.medicalInfoallergiesDiet= true
            attributes.medicalInfomedications= true
            attributes.medicalInfoactivities= true
            attributes.medicalInfoactivityNames= true
            attributes.medicalInfotreatments= true
            attributes.medicalInfotreatmentNames= true
            attributes.medicalInfoimmunizations= true
            attributes.medicalInfotetanus= true
            attributes.medicalInfocomments= true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.medicalInfodoctorName = false
            attributes.medicalInfodoctorPhone = false
            attributes.medicalInfoinsurance = false
            attributes.medicalInfopolicyholder = false
            attributes.medicalInfoillnesses = false
            attributes.medicalInfoallergiesDiet = false
            attributes.medicalInfomedications = false
            attributes.medicalInfoactivities = false
            attributes.medicalInfoactivityNames = false
            attributes.medicalInfotreatments = false
            attributes.medicalInfotreatmentNames = false
            attributes.medicalInfoimmunizations = false
            attributes.medicalInfotetanus = false
            attributes.medicalInfocomments = false
            setAttributes({...attributes});
        }
    }

    const handleParentToggle = (state: number) => {
        if (state == 1){
            attributes.parentparentID = true
            attributes.parentregTime = true
            attributes.parentlocation = true
            attributes.parentg1FirstName = true
            attributes.parentg1LastName = true
            attributes.parentg2FirstName = true
            attributes.parentg2LastName = true
            attributes.parentaddress1 = true
            attributes.parentaddress2 = true
            attributes.parentcountry = true
            attributes.parentcity = true
            attributes.parentstate = true
            attributes.parentzipcode = true
            attributes.parentemail1 = true
            attributes.parentemail2 = true
            attributes.parentg1Phone1 = true
            attributes.parentg1Phone2 = true
            attributes.parentg2Phone1 = true
            attributes.parentg2Phone2 = true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.parentparentID =false
            attributes.parentregTime =false
            attributes.parentlocation =false
            attributes.parentg1FirstName =false
            attributes.parentg1LastName =false
            attributes.parentg2FirstName =false
            attributes.parentg2LastName =false
            attributes.parentaddress1 =false
            attributes.parentaddress2 =false
            attributes.parentcountry =false
            attributes.parentcity =false
            attributes.parentstate =false
            attributes.parentzipcode =false
            attributes.parentemail1 =false
            attributes.parentemail2 =false
            attributes.parentg1Phone1 =false
            attributes.parentg1Phone2 =false
            attributes.parentg2Phone1 =false
            attributes.parentg2Phone2 =false
            setAttributes({...attributes});
        }
    }

    const handleEmergencyToggle = (state: number) => {
        if (state == 1){
            attributes.emergencye1FirstName = true
            attributes.emergencye1LastName = true
            attributes.emergencye1Relationship = true
            attributes.emergencye1Phone = true
            attributes.emergencye1Authorized = true
            attributes.emergencye2FirstName = true
            attributes.emergencye2LastName = true
            attributes.emergencye2Relationship = true
            attributes.emergencye2Phone = true
            attributes.emergencye2Authorized = true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.emergencye1FirstName = false
            attributes.emergencye1LastName = false
            attributes.emergencye1Relationship = false
            attributes.emergencye1Phone = false
            attributes.emergencye1Authorized = false
            attributes.emergencye2FirstName = false
            attributes.emergencye2LastName = false
            attributes.emergencye2Relationship = false
            attributes.emergencye2Phone = false
            attributes.emergencye2Authorized = false
            setAttributes({...attributes});
        }
    }

    const handlePaymentsToggle = (state: number) => {
        if (state == 1){
            attributes.paymentsamountPaid = true
            attributes.paymentscredit = true
            attributes.paymentsearlyBird = true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.paymentsamountPaid = false
            attributes.paymentscredit = false
            attributes.paymentsearlyBird = false
            setAttributes({...attributes});
        }
    }

    const handleCounselorsToggle = (state: number) => {
        if (state == 1){
            attributes.counselorscounselorID = true
            attributes.counselorscounselorEmail = true
            attributes.counselorscounselorGroup = true
            attributes.counselorscounselorStatus = true
            attributes.counselorsLastName = true
            attributes.counselorsFirstName = true
            setAttributes({...attributes});
        }
        else if (state == 0){
            attributes.counselorscounselorID = false
            attributes.counselorscounselorEmail = false
            attributes.counselorscounselorGroup = false
            attributes.counselorscounselorStatus = false
            attributes.counselorsLastName = false
            attributes.counselorsFirstName = false
            setAttributes({...attributes});
        }
    }

    const handleChange = (name: string) => (e: { target: { value: any; }; }) => {
        let str = "attributes." + name;
        if (eval(str) == false){
            setAttributes({...attributes, [name]:true});
        }
        else{
            setAttributes({...attributes, [name]:false});
        }

    };

    const handlePriceChange = (name: string) => (e: {target: {value: any; }; }) => {

        setAttributes({...attributes, [name]: e.target.value});
    };

    const handleToggleAll = () => {
        handlePersonalToggle(1)
        handleAttendanceToggle(1)
        handleCounselorsToggle(1)
        handleMedicalToggle(1)
        handleParentToggle(1)
        handleEmergencyToggle(1)
        handleWeeksToggle(1)
        handlePaymentsToggle(1)


    }

    const handleUntoggleAll = () => {
        handlePersonalToggle(0)
        handleAttendanceToggle(0)
        handleCounselorsToggle(0)
        handleMedicalToggle(0)
        handleParentToggle(0)
        handleEmergencyToggle(0)
        handleWeeksToggle(0)
        handlePaymentsToggle(0)
    }

    const handleSubmit = () => {
        const {
            personalchildID, personalfirstName, personallastName, personalgender, personaldob, personalschool, personalgrade, personalshirtSize, personalnumShirts,
            personalallReg, personalaccCreated, personalgroup, weekswk1AM, weekswk1PM, weekswk2AM, weekswk2PM, weekswk3AM, weekswk3PM, weekswk4AM, weekswk4PM, weekswk5AM,
            weekswk5PM, weekswk6AM, weekswk6PM, weekswk7AM, weekswk7PM, weekswk8AM, weekswk8PM, weeksextendedCare, attendancewk1Expected, attendancewk1Actual, attendancewk2Expected,
            attendancewk2Actual, attendancewk3Expected, attendancewk3Actual, attendancewk4Expected, attendancewk4Actual, attendancewk5Expected, attendancewk5Actual, attendancewk6Expected,
            attendancewk6Actual, attendancewk7Expected, attendancewk7Actual, attendancewk8Expected, attendancewk8Actual, medicalInfodoctorName, medicalInfodoctorPhone, medicalInfoinsurance,
            medicalInfopolicyholder, medicalInfoillnesses, medicalInfoallergiesDiet, medicalInfomedications, medicalInfoactivities, medicalInfoactivityNames, medicalInfotreatments,
            medicalInfotreatmentNames, medicalInfoimmunizations, medicalInfotetanus, medicalInfocomments, parentparentID, parentregTime, parentlocation, parentg1FirstName,
            parentg1LastName, parentg2FirstName, parentg2LastName, parentaddress1, parentaddress2, parentcountry, parentcity, parentstate, parentzipcode, parentemail1, parentemail2,
            parentg1Phone1, parentg1Phone2, parentg2Phone1, parentg2Phone2, emergencye1FirstName, emergencye1LastName, emergencye1Relationship, emergencye1Phone, emergencye1Authorized,
            emergencye2FirstName, emergencye2LastName, emergencye2Relationship, emergencye2Phone, emergencye2Authorized, paymentsamountPaid, paymentscredit, paymentsearlyBird,
            counselorscounselorID, counselorscounselorEmail, counselorscounselorGroup, counselorscounselorStatus, counselorsLastName, counselorsFirstName, personalyearCreated, year} = attributes;


        AdminService.requestInfo( personalchildID, personalfirstName, personallastName, personalgender, personaldob, personalschool, personalgrade, personalshirtSize, personalnumShirts,
            personalallReg, personalaccCreated, personalgroup, weekswk1AM, weekswk1PM, weekswk2AM, weekswk2PM, weekswk3AM, weekswk3PM, weekswk4AM, weekswk4PM, weekswk5AM,
            weekswk5PM, weekswk6AM, weekswk6PM, weekswk7AM, weekswk7PM, weekswk8AM, weekswk8PM, weeksextendedCare, attendancewk1Expected, attendancewk1Actual, attendancewk2Expected,
            attendancewk2Actual, attendancewk3Expected, attendancewk3Actual, attendancewk4Expected, attendancewk4Actual, attendancewk5Expected, attendancewk5Actual, attendancewk6Expected,
            attendancewk6Actual, attendancewk7Expected, attendancewk7Actual, attendancewk8Expected, attendancewk8Actual, medicalInfodoctorName, medicalInfodoctorPhone, medicalInfoinsurance,
            medicalInfopolicyholder, medicalInfoillnesses, medicalInfoallergiesDiet, medicalInfomedications, medicalInfoactivities, medicalInfoactivityNames, medicalInfotreatments,
            medicalInfotreatmentNames, medicalInfoimmunizations, medicalInfotetanus, medicalInfocomments, parentparentID, parentregTime, parentlocation, parentg1FirstName,
            parentg1LastName, parentg2FirstName, parentg2LastName, parentaddress1, parentaddress2, parentcountry, parentcity, parentstate, parentzipcode, parentemail1, parentemail2,
            parentg1Phone1, parentg1Phone2, parentg2Phone1, parentg2Phone2, emergencye1FirstName, emergencye1LastName, emergencye1Relationship, emergencye1Phone, emergencye1Authorized,
            emergencye2FirstName, emergencye2LastName, emergencye2Relationship, emergencye2Phone, emergencye2Authorized, paymentsamountPaid, paymentscredit, paymentsearlyBird,
            counselorscounselorID, counselorscounselorEmail, counselorscounselorGroup, counselorscounselorStatus, personalyearCreated, year).then(r =>
            setData(r.data)
        );
        if (counselorscounselorEmail || counselorscounselorGroup || counselorscounselorID || counselorscounselorStatus || counselorsFirstName || counselorsLastName){
            AdminService.getAllCounselors().then(r => {
                setValues(r.data)
            })
        }
        setOptions(false)
        setResults(true)
    }

    const handleOptions = (name: string) => (e: { target: { value: any; }; }) => {

        setAttributes({...attributes, [name]: e.target.value});
        if (e.target.value == "currentRegistered"){
            attributes.personalallReg = true;
            attributes.personalaccCreated = false;
        }
        else if (e.target.value == "currentAccount"){
            attributes.personalaccCreated = true;
            attributes.personalallReg = false;
        }
        else{
            attributes.personalaccCreated = true;
            attributes.personalallReg = false;
        }


    };

    const Options = () =>
        <body>
        <Container className="Admin-Buttons">
            <Button variant="primary" className="backButton" href="/#/admin/"> Back </Button><br /><br />
            <h3> Roster Dump </h3>
            <h6> Select the columns you wish to view. </h6><br /><br />

            <form>
                <p>SUMMER:</p>
                <input className={"resize"} type={"Number"} placeholder={"Enter Year"} defaultValue={attributes.year} onBlur={handlePriceChange('year')}/>
            </form><br />

            <div><Button variant={"info"} onClick={handleToggleAll}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={handleUntoggleAll}>Untoggle All</Button></div><br />

            <h5> Filter Results </h5>
            <div>
                <div className={"center"}><Button variant={"info"} onClick={()=>handleWeeksToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handleWeeksToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"wk1AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk1AM} onChange={handleChange('weekswk1AM')} /><p className={"sameLine"}> WK1 AM </p><br />
                        <input name={"wk1PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk1PM} onChange={handleChange('weekswk1PM')}/><p className={"sameLine"} > WK1 PM </p><br />
                        <input name={"wk2AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk2AM} onChange={handleChange('weekswk2AM')}/><p className={"sameLine"}> WK2 AM </p><br />
                        <input name={"wk2PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk2PM} onChange={handleChange('weekswk2PM')}/><p className={"sameLine"}> WK2 PM </p><br />
                        <input name={"wk3AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk3AM} onChange={handleChange('weekswk3AM')}/><p className={"sameLine"}> WK3 AM </p><br />
                        <input name={"wk3PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk3PM} onChange={handleChange('weekswk3PM')}/><p className={"sameLine"}> WK3 PM </p><br />
                        <input name={"wk4AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk4AM} onChange={handleChange('weekswk4AM')}/><p className={"sameLine"}> WK4 AM </p><br />
                        <input name={"wk4PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk4PM} onChange={handleChange('weekswk4PM')}/><p className={"sameLine"}> WK4 PM </p><br />
                        <input name={"wk5AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk5AM} onChange={handleChange('weekswk5AM')}/><p className={"sameLine"}> WK5 AM </p><br />
                        <input name={"wk5PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk5PM} onChange={handleChange('weekswk5PM')}/><p className={"sameLine"}> WK5 PM </p><br />
                        <input name={"extendedCare"} type={"checkbox"} className={"sameLine"} checked={attributes.weeksextendedCare} onChange={handleChange('weeksextendedCare')}/><p className={"sameLine"}> Extended Care </p>

                    </div>
                    <div className={"column"}>
                        <input name={"wk6AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk6AM} onChange={handleChange('weekswk6AM')}/><p className={"sameLine"}> WK6 AM </p><br />
                        <input name={"wk6PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk6PM} onChange={handleChange('weekswk6PM')}/><p className={"sameLine"}> WK6 PM </p><br />
                        <input name={"wk7AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk7AM} onChange={handleChange('weekswk7AM')}/><p className={"sameLine"}> WK7 AM </p><br />
                        <input name={"wk7PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk7PM} onChange={handleChange('weekswk7PM')}/><p className={"sameLine"}> WK7 PM </p><br />
                        <input name={"wk8AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk8AM} onChange={handleChange('weekswk8AM')}/><p className={"sameLine"}> WK8 AM </p><br />
                        <input name={"wk8PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk8PM} onChange={handleChange('weekswk8PM')}/><p className={"sameLine"}> WK8 PM </p><br />
                        <input name={"wk8AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk9AM} onChange={handleChange('weekswk9AM')}/><p className={"sameLine"}> WK9 AM </p><br />
                        <input name={"wk8PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk9PM} onChange={handleChange('weekswk9PM')}/><p className={"sameLine"}> WK9 PM </p><br />
                        <input name={"wk8AM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk10AM} onChange={handleChange('weekswk10AM')}/><p className={"sameLine"}> WK10 AM </p><br />
                        <input name={"wk8PM"} type={"checkbox"} className={"sameLine"} checked={attributes.weekswk10PM} onChange={handleChange('weekswk10PM')}/><p className={"sameLine"}> WK10 PM </p><br />

                        <input name={"allReg"} type={"checkbox"} className={"sameLine"}  checked={attributes.personalallReg} onChange={handleChange('personalallReg')}/><p className={"sameLine"}> All Registered </p><br />
                        <input name={"accCreated"} type={"checkbox"} className={"sameLine"} checked={attributes.personalaccCreated}onChange={handleChange('personalaccCreated')}/><p className={"sameLine"}> Account Created  </p>
                    </div>
                </div>
            </div>
            <br />

            <h5> Personal </h5>
            <div>
                <div className={"center"}><Button variant={"info"} onClick={()=>handlePersonalToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handlePersonalToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"childID"} type={"checkbox"} className={"sameLine"} checked={attributes.personalchildID} onChange={handleChange('personalchildID')}/><p className={"sameLine"}> Child ID </p><br />
                        <input name={"firstName"} type={"checkbox"} className={"sameLine"}  checked={attributes.personalfirstName} onChange={handleChange('personalfirstName')}/><p className={"sameLine"} > First Name </p><br />
                        <input name={"lastName"} type={"checkbox"} className={"sameLine"}  checked={attributes.personallastName} onChange={handleChange('personallastName')}/><p className={"sameLine"}> Last Name </p><br />
                        <input name={"gender"} type={"checkbox"} className={"sameLine"} checked={attributes.personalgender} onChange={handleChange('personalgender')}/><p className={"sameLine"} > Gender </p><br />
                        <input name={"dob"} type={"checkbox"} className={"sameLine"} checked={attributes.personaldob} onChange={handleChange('personaldob')}/><p className={"sameLine"}> Date of Birth </p>

                    </div>
                    <div className={"column"}>
                        <input name={"school"} type={"checkbox"} className={"sameLine"} checked={attributes.personalschool} onChange={handleChange('personalschool')}/><p className={"sameLine"}> School </p><br />
                        <input name={"grade"} type={"checkbox"} className={"sameLine"} checked={attributes.personalgrade} onChange={handleChange('personalgrade')}/><p className={"sameLine"}> Grade </p><br />
                        <input name={"shirtSize"} type={"checkbox"} className={"sameLine"} checked={attributes.personalshirtSize} onChange={handleChange('personalshirtSize')}/><p className={"sameLine"}> Shirt Size </p><br />
                        <input name={"numShirts"} type={"checkbox"} className={"sameLine"} checked={attributes.personalnumShirts} onChange={handleChange('personalnumShirts')}/><p className={"sameLine"}> # of Shirts </p><br />

                        <input name={"group"} type={"checkbox"} className={"sameLine"} checked={attributes.personalgroup} onChange={handleChange('personalgroup')}/><p className={"sameLine"}> Group </p>
                    </div>
                </div>
            </div>
            <br />



            <h5> Attendance </h5>
            <div>
                <div className={"center"}><Button variant={"info"} onClick={()=>handleAttendanceToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handleAttendanceToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"wk1Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk1Expected} onChange={handleChange('attendancewk1Expected')}/><p className={"sameLine"}> WK1 Expected </p><br />
                        <input name={"wk1Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk1Actual} onChange={handleChange('attendancewk1Actual')}/><p className={"sameLine"}> WK1 Actual </p><br />
                        <input name={"wk2Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk2Expected} onChange={handleChange('attendancewk2Expected')}/><p className={"sameLine"}> WK2 Expected </p><br />
                        <input name={"wk2Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk2Actual} onChange={handleChange('attendancewk2Actual')}/><p className={"sameLine"}> WK2 Actual </p><br />
                        <input name={"wk3Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk3Expected} onChange={handleChange('attendancewk3Expected')}/><p className={"sameLine"}> WK3 Expected </p><br />
                        <input name={"wk3Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk3Actual} onChange={handleChange('attendancewk3Actual')}/><p className={"sameLine"}> WK3 Actual </p><br />
                        <input name={"wk4Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk4Expected} onChange={handleChange('attendancewk4Expected')}/><p className={"sameLine"}> WK4 Expected </p><br />
                        <input name={"wk4Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk4Actual} onChange={handleChange('attendancewk4Actual')}/><p className={"sameLine"}> WK4 Actual </p><br />
                        <input name={"wk5Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk5Expected} onChange={handleChange('attendancewk5Expected')}/><p className={"sameLine"}> WK5 Expected </p><br />
                        <input name={"wk5Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk5Actual} onChange={handleChange('attendancewk5Actual')}/><p className={"sameLine"}> WK5 Actual </p>
                    </div>
                    <div className={"column"}>
                        <input name={"wk6Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk6Expected} onChange={handleChange('attendancewk6Expected')}/><p className={"sameLine"}> WK6 Expected </p><br />
                        <input name={"wk6Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk6Actual} onChange={handleChange('attendancewk6Actual')}/><p className={"sameLine"}> WK6 Actual </p><br />
                        <input name={"wk7Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk7Expected} onChange={handleChange('attendancewk7Expected')}/><p className={"sameLine"}> WK7 Expected </p><br />
                        <input name={"wk7Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk7Actual} onChange={handleChange('attendancewk7Actual')}/><p className={"sameLine"}> WK7 Actual </p><br />
                        <input name={"wk8Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk8Expected} onChange={handleChange('attendancewk8Expected')}/><p className={"sameLine"}> WK8 Expected </p><br />
                        <input name={"wk8Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk8Actual} onChange={handleChange('attendancewk8Actual')}/><p className={"sameLine"}> WK8 Actual </p><br />
                        <input name={"wk8Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk9Expected} onChange={handleChange('attendancewk9Expected')}/><p className={"sameLine"}> WK9 Expected </p><br />
                        <input name={"wk8Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk9Actual} onChange={handleChange('attendancewk9Actual')}/><p className={"sameLine"}> WK9 Actual </p><br />
                        <input name={"wk8Expected"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk10Expected} onChange={handleChange('attendancewk10Expected')}/><p className={"sameLine"}> WK10 Expected </p><br />
                        <input name={"wk8Actual"} type={"checkbox"} className={"sameLine"} checked={attributes.attendancewk10Actual} onChange={handleChange('attendancewk10Actual')}/><p className={"sameLine"}> WK10 Actual </p><br />
                    </div>
                </div>
            </div>
            <br />

            <h5> Medical Info </h5>
            <div>
                <div className={"center"}><Button variant={"info"}  onClick={()=>handleMedicalToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"}  onClick={()=>handleMedicalToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"doctorName"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfodoctorName} onChange={handleChange('medicalInfodoctorName')}/><p className={"sameLine"}> Doctor Name </p><br />
                        <input name={"doctorPhone"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfodoctorPhone} onChange={handleChange('medicalInfodoctorPhone')} /><p className={"sameLine"}> Doctor Phone </p><br />
                        <input name={"insurance"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfoinsurance} onChange={handleChange('medicalInfoinsurance')}/><p className={"sameLine"}> Insurance </p><br />
                        <input name={"policyholder"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfopolicyholder} onChange={handleChange('medicalInfopolicyholder')}/><p className={"sameLine"}> Policyholder </p><br />
                        <input name={"illnesses"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfoillnesses} onChange={handleChange('medicalInfoillnesses')}/><p className={"sameLine"}> Illnesses </p><br />
                        <input name={"allergiesDiet"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfoallergiesDiet} onChange={handleChange('medicalInfoallergiesDiet')}/><p className={"sameLine"}> Allergies / Diet </p><br />
                        <input name={"medications"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfomedications} onChange={handleChange('medicalInfomedications')}/><p className={"sameLine"}> Medications </p>
                    </div>
                    <div className={"column"}>
                        <input name={"activities"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfoactivities} onChange={handleChange('medicalInfoactivities')}/><p className={"sameLine"}> Activities </p><br />
                        <input name={"activityNames"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfoactivityNames} onChange={handleChange('medicalInfoactivityNames')}/><p className={"sameLine"}> Activity Names </p><br />
                        <input name={"treatments"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfotreatments} onChange={handleChange('medicalInfotreatments')}/><p className={"sameLine"}> Treatments </p><br />
                        <input name={"treatmentNames"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfotreatmentNames} onChange={handleChange('medicalInfotreatmentNames')}/><p className={"sameLine"}> Treatment Names </p><br />
                        <input name={"immunizations"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfoimmunizations} onChange={handleChange('medicalInfoimmunizations')}/><p className={"sameLine"}> Immunizations </p><br />
                        <input name={"tetanus"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfotetanus} onChange={handleChange('medicalInfotetanus')}/><p className={"sameLine"}> Tetanus </p><br />
                        <input name={"comments"} type={"checkbox"} className={"sameLine"} checked={attributes.medicalInfocomments} onChange={handleChange('medicalInfocomments')}/><p className={"sameLine"}> Comments </p>
                    </div>
                </div>
            </div>
            <br />

            <h5> Parent / Guardian </h5>
            <div>
                <div className={"center"}><Button variant={"info"}  onClick={()=>handleParentToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handleParentToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"parentID"} type={"checkbox"} className={"sameLine"}  checked={attributes.parentparentID} onChange={handleChange('parentparentID')}/><p className={"sameLine"}> Parent ID </p><br />
                        <input name={"regTime"} type={"checkbox"} className={"sameLine"}  checked={attributes.parentregTime} onChange={handleChange('parentregTime')}/><p className={"sameLine"}> Reg Time </p><br />
                        <input name={"location"} type={"checkbox"} className={"sameLine"} checked={attributes.parentlocation} onChange={handleChange('parentlocation')}/><p className={"sameLine"}> Location </p><br />
                        <input name={"g1FirstName"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg1FirstName} onChange={handleChange('parentg1FirstName')}/><p className={"sameLine"}> G1 First Name </p><br />
                        <input name={"g1LastName"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg1LastName} onChange={handleChange('parentg1LastName')}/><p className={"sameLine"}> G1 Last Name </p><br />
                        <input name={"g2FirstName"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg2FirstName} onChange={handleChange('parentg2FirstName')}/><p className={"sameLine"}> G2 First Name </p><br />
                        <input name={"g2LastName"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg2LastName} onChange={handleChange('parentg2LastName')}/><p className={"sameLine"}> G2 Last Name </p><br />
                        <input name={"address1"} type={"checkbox"} className={"sameLine"} checked={attributes.parentaddress1} onChange={handleChange('parentaddress1')}/><p className={"sameLine"}> Address1 </p><br />
                        <input name={"address2"} type={"checkbox"} className={"sameLine"} checked={attributes.parentaddress2} onChange={handleChange('parentaddress2')}/><p className={"sameLine"}> Address2 </p><br />
                        <input name={"country"} type={"checkbox"} className={"sameLine"} checked={attributes.parentcountry} onChange={handleChange('parentcountry')} /><p className={"sameLine"}> Country </p>
                    </div>
                    <div className={"column"}>
                        <input name={"city"} type={"checkbox"} className={"sameLine"} checked={attributes.parentcity} onChange={handleChange('parentcity')}/><p className={"sameLine"}> City </p><br />
                        <input name={"state"} type={"checkbox"} className={"sameLine"} checked={attributes.parentstate} onChange={handleChange('parentstate')}/><p className={"sameLine"}> State </p><br />
                        <input name={"zipcode"} type={"checkbox"} className={"sameLine"} checked={attributes.parentzipcode} onChange={handleChange('parentzipcode')}/><p className={"sameLine"}> Zipcode </p><br />
                        <input name={"email1"} type={"checkbox"} className={"sameLine"} checked={attributes.parentemail1} onChange={handleChange('parentemail1')}/><p className={"sameLine"}> Email1 </p><br />
                        <input name={"email2"} type={"checkbox"} className={"sameLine"} checked={attributes.parentemail2} onChange={handleChange('parentemail2')}/><p className={"sameLine"}> Email2 </p><br />
                        <input name={"g1Phone1"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg1Phone1} onChange={handleChange('parentg1Phone1')}/><p className={"sameLine"}> G1 Phone1 </p><br />
                        <input name={"g1Phone2"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg1Phone2} onChange={handleChange('parentg1Phone2')}/><p className={"sameLine"}> G1 Phone2 </p><br />
                        <input name={"g2Phone1"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg2Phone1} onChange={handleChange('parentg2Phone1')}/><p className={"sameLine"}> G2 Phone1 </p><br />
                        <input name={"g2Phone2"} type={"checkbox"} className={"sameLine"} checked={attributes.parentg2Phone2} onChange={handleChange('parentg2Phone2')}/><p className={"sameLine"}> G2 Phone2 </p>
                    </div>
                </div>
            </div>
            <br />

            <h5> Emergency </h5>
            <div>
                <div className={"center"}><Button variant={"info"} onClick={()=>handleEmergencyToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handleEmergencyToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"e1FirstName"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye1FirstName} onChange={handleChange('emergencye1FirstName')}/><p className={"sameLine"}> E1 First Name </p><br />
                        <input name={"e1LastName"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye1LastName} onChange={handleChange('emergencye1LastName')}/><p className={"sameLine"}> E1 Last Name </p><br />
                        <input name={"e1Relationship"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye1Relationship} onChange={handleChange('emergencye1Relationship')}/><p className={"sameLine"}> E1 Relationship </p><br />
                        <input name={"e1Phone"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye1Phone} onChange={handleChange('emergencye1Phone')}/><p className={"sameLine"}> E1 Phone </p><br />
                        <input name={"e1Authorized"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye1Authorized} onChange={handleChange('emergencye1Authorized')}/><p className={"sameLine"}> E1 Authorized </p>
                    </div>
                    <div className={"column"}>
                        <input name={"e2FirstName"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye2FirstName} onChange={handleChange('emergencye2FirstName')}/><p className={"sameLine"}> E2 First Name </p><br />
                        <input name={"e2LastName"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye2LastName} onChange={handleChange('emergencye2LastName')}/><p className={"sameLine"}> E2 Last Name </p><br />
                        <input name={"e2Relationship"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye2Relationship} onChange={handleChange('emergencye2Relationship')}/><p className={"sameLine"}> E2 Relationship </p><br />
                        <input name={"e2Phone"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye2Phone} onChange={handleChange('emergencye2Phone')}/><p className={"sameLine"}> E2 Phone </p><br />
                        <input name={"e2Authorized"} type={"checkbox"} className={"sameLine"} checked={attributes.emergencye2Authorized} onChange={handleChange('emergencye2Authorized')}/><p className={"sameLine"}> E2 Authorized </p>
                    </div>
                </div>
            </div>
            <br />

            <h5> Payments </h5>
            <div>
                <div className={"center"}><Button variant={"info"} onClick={()=>handlePaymentsToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handlePaymentsToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"amountPaid"} type={"checkbox"} className={"sameLine"} checked={attributes.paymentsamountPaid} onChange={handleChange('paymentsamountPaid')}/><p className={"sameLine"}> Amount Paid </p><br />
                        <input name={"credit"} type={"checkbox"} className={"sameLine"} checked={attributes.paymentscredit} onChange={handleChange('paymentscredit')}/><p className={"sameLine"}> Credit </p><br />
                        <input name={"earlyBird"} type={"checkbox"} className={"sameLine"} checked={attributes.paymentsearlyBird} onChange={handleChange('paymentsearlyBird')}/><p className={"sameLine"}> Early Bird </p><br />
                    </div>
                </div>
            </div>
            <br />

            <h5> Counselors </h5>
            <div>
                <div className={"center"}><Button variant={"info"} onClick={()=>handleCounselorsToggle(1)}>Toggle All</Button>&nbsp;<Button variant={"danger"} onClick={()=>handleCounselorsToggle(0)}>Untoggle All</Button></div><br />
                <div className={"row"}>
                    <div className={"column"}>
                        <input name={"counselorID"} type={"checkbox"} className={"sameLine"} checked={attributes.counselorscounselorID} onChange={handleChange('counselorscounselorID')}/><p className={"sameLine"}> Counselor ID </p><br />
                        <input name={"counselorFirstName"} type={"checkbox"} className={"sameLine"} checked={attributes.counselorsFirstName} onChange={handleChange('counselorsFirstName')}/><p className={"sameLine"}> First Name </p><br />
                        <input name={"counselorsLastName"} type={"checkbox"} className={"sameLine"} checked={attributes.counselorsLastName} onChange={handleChange('counselorsLastName')}/><p className={"sameLine"}> Last Name </p><br />
                    </div>
                    <div className={"column"}>
                        <input name={"counselorEmail"} type={"checkbox"} className={"sameLine"} checked={attributes.counselorscounselorEmail} onChange={handleChange('counselorscounselorEmail')}/><p className={"sameLine"}> Email </p><br />
                        <input name={"counselorGroup"} type={"checkbox"} className={"sameLine"} checked={attributes.counselorscounselorGroup} onChange={handleChange('counselorscounselorGroup')}/><p className={"sameLine"}> Group </p><br />
                        <input name={"counselorStatus"} type={"checkbox"} className={"sameLine"} checked={attributes.counselorscounselorStatus} onChange={handleChange('counselorscounselorStatus')}/><p className={"sameLine"}> Status </p><br />
                    </div>
                </div>
            </div>
            <br />

            <div className="center"><Button variant="success" className="buttonTxt" type="submit" onClick={handleSubmit}> Submit </Button></div>

        </Container>
        </body>

    const Results = () =>
        <div className="Schedule overflowTable">
            <body>
            <br />
            <Container className="Schedule-Table">
                <form>
                    <Table striped bordered className="schedule" >
                        <thead>
                        <tr>
                            {attributes.personalchildID && <th>   Child ID  </th>}
                            {attributes.personalfirstName && <th> First Name    </th>}
                            {attributes.personallastName && <th>   Last Name  </th>}
                            {attributes.personalgender && <th>  Gender   </th>}
                            {attributes.personaldob && <th>   DOB  </th>}
                            {attributes.personalschool && <th>   School  </th>}
                            {attributes.personalgrade && <th>  Grade   </th>}
                            {attributes.personalshirtSize && <th>   Shirt Size </th>}
                            {attributes.personalnumShirts && <th>  Num Shirts   </th>}

                            {attributes.personalgroup && <th>  Group   </th>}
                            {attributes.weekswk1AM && <th>  WK1AM   </th>}
                            {attributes.weekswk1PM && <th>   WK1PM   </th>}
                            {attributes.weekswk2AM && <th>  WK2AM   </th>}
                            {attributes.weekswk2PM && <th>  WK2PM   </th>}
                            {attributes.weekswk3AM && <th>  WK3AM   </th>}
                            {attributes.weekswk3PM && <th>  WK3PM   </th>}
                            {attributes.weekswk4AM && <th>  K4AM   </th>}
                            {attributes.weekswk4PM && <th>  Wk4PM   </th>}
                            {attributes.weekswk5AM && <th>  WK5AM   </th>}
                            {attributes.weekswk5PM && <th>  WK5PM   </th>}
                            {attributes.weekswk6AM && <th>  WK6AM   </th>}
                            {attributes.weekswk6PM && <th>  WK6PM   </th>}
                            {attributes.weekswk7AM && <th>  WK7AM   </th>}
                            {attributes.weekswk7PM && <th>   WK7PM  </th>}
                            {attributes.weekswk8AM && <th>   WK8AM  </th>}
                            {attributes.weekswk8PM && <th>   WK8PM  </th>}
                            {attributes.weeksextendedCare && <th> WK EC    </th>}
                            {attributes.attendancewk1Expected && <th>  WK1 EXP   </th>}
                            {attributes.attendancewk1Actual && <th>  WK1 ACT   </th>}
                            {attributes.attendancewk2Expected && <th>  WK2 EXP    </th>}
                            {attributes.attendancewk2Actual && <th> WK2 ACT     </th>}
                            {attributes.attendancewk3Expected && <th>  WK3 EXP    </th>}
                            {attributes.attendancewk3Actual && <th>   WK3 ACT   </th>}
                            {attributes.attendancewk4Expected && <th> WK4 EXP     </th>}
                            {attributes.attendancewk4Actual && <th>   WK4 ACT   </th>}
                            {attributes.attendancewk5Expected && <th> WK5 EXP    </th>}
                            {attributes.attendancewk5Actual && <th>  WK5 ACT    </th>}
                            {attributes.attendancewk6Expected && <th> WK5 EXP     </th>}
                            {attributes.attendancewk6Actual && <th>  WK6 ACT    </th>}
                            {attributes.attendancewk7Expected && <th>  WK6 EXP    </th>}
                            {attributes.attendancewk7Actual && <th>  WK7 ACT    </th>}
                            {attributes.attendancewk8Expected && <th> WK8 EXP     </th>}
                            {attributes.attendancewk8Actual && <th>  WK8 ACT   </th>}
                            {attributes.medicalInfodoctorName && <th>  Doctor Name   </th>}
                            {attributes.medicalInfodoctorPhone && <th>    Doctor Phone </th>}
                            {attributes.medicalInfoinsurance && <th>    Insurance </th>}
                            {attributes.medicalInfopolicyholder && <th>  Policyholder   </th>}
                            {attributes.medicalInfoillnesses && <th>    Illnesses </th>}
                            {attributes.medicalInfoallergiesDiet && <th>  Allergies / Diet   </th>}
                            {attributes.medicalInfomedications && <th>   Medications  </th>}
                            {attributes.medicalInfoactivities && <th>    Activities </th>}
                            {attributes.medicalInfoactivityNames && <th> Activity Names    </th>}
                            {attributes.medicalInfotreatments && <th> Treatments    </th>}
                            {attributes.medicalInfotreatmentNames && <th>   Treatment Names  </th>}
                            {attributes.medicalInfoimmunizations && <th>  Immunizations   </th>}
                            {attributes.medicalInfotetanus && <th>  Tetanus   </th>}
                            {attributes.medicalInfocomments && <th> Comments    </th>}
                            {attributes.parentparentID && <th>  Parent ID   </th>}
                            {attributes.parentregTime && <th>   Reg Time  </th>}
                            {attributes.parentlocation && <th>   Location  </th>}
                            {attributes.parentg1FirstName && <th>  G1 First Name   </th>}
                            {attributes.parentg1LastName && <th>    G1 Last Name </th>}
                            {attributes.parentg2FirstName && <th>   G2 First Name  </th>}
                            {attributes.parentg2LastName && <th>   G2 Last Name  </th>}
                            {attributes.parentaddress1 && <th>  Address1   </th>}
                            {attributes.parentaddress2 && <th>   Address2  </th>}
                            {attributes.parentcountry && <th>   Country  </th>}
                            {attributes.parentcity && <th> City   </th>}
                            {attributes.parentstate && <th>  State   </th>}
                            {attributes.parentzipcode && <th>    Zipcode </th>}
                            {attributes.parentemail1 && <th>   Email1  </th>}
                            {attributes.parentemail2 && <th> Email2    </th>}
                            {attributes.parentg1Phone1 && <th>  G1 Phone1   </th>}
                            {attributes.parentg1Phone2 && <th>  G1 Phone2   </th>}
                            {attributes.parentg2Phone1 && <th> G2 Phone1    </th>}
                            {attributes.parentg2Phone2 && <th>   G2 Phone2  </th>}
                            {attributes.emergencye1FirstName && <th> E1 First Name    </th>}
                            {attributes.emergencye1LastName && <th>   E1 Last Name  </th>}
                            {attributes.emergencye1Relationship && <th>   E1 Relationship  </th>}
                            {attributes.emergencye1Phone && <th>  E1 Phone   </th>}
                            {attributes.emergencye1Authorized && <th>  E1 Authorized   </th>}
                            {attributes.emergencye2FirstName && <th>  E2 First Name   </th>}
                            {attributes.emergencye2LastName && <th>   E2 Last Name  </th>}
                            {attributes.emergencye2Relationship && <th>   E2 Relationship  </th>}
                            {attributes.emergencye2Phone && <th>   E2 Phone  </th>}
                            {attributes.emergencye2Authorized && <th>  E2 Authorized   </th>}
                            {attributes.paymentsamountPaid && <th>   Amount Paid  </th>}
                            {attributes.paymentscredit && <th> Credit    </th>}
                            {attributes.paymentsearlyBird && <th>   Early Bird  </th>}

                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                            <tr>
                                {attributes.personalchildID &&  <td> {item.personalchildID }  </td>}
                                {attributes.personalfirstName &&  <td> {item.personalfirstName }  </td>}
                                {attributes.personallastName &&  <td> {item.personallastName }  </td>}
                                {attributes.personalgender &&  <td> {item.personalgender }  </td>}
                                {attributes.personaldob &&  <td> {item.personaldob }  </td>}
                                {attributes.personalschool &&  <td> {item.personalschool }  </td>}
                                {attributes.personalgrade &&  <td> {item.personalgrade }  </td>}
                                {attributes.personalshirtSize &&  <td> {item.personalshirtSize }  </td>}
                                {attributes.personalnumShirts &&  <td> {item.personalnumShirts }  </td>}

                                {attributes.personalgroup &&  <td> {item.personalgroup }  </td>}
                                {attributes.weekswk1AM &&  <td> {item.weekswk1AM }  </td>}
                                {attributes.weekswk1PM &&  <td> {item.weekswk1PM }  </td>}
                                {attributes.weekswk2AM &&  <td> {item.weekswk2AM }  </td>}
                                {attributes.weekswk2PM &&  <td> {item.weekswk2PM }  </td>}
                                {attributes.weekswk3AM &&  <td> {item.weekswk3AM }  </td>}
                                {attributes.weekswk3PM &&  <td> {item.weekswk3PM }  </td>}
                                {attributes.weekswk4AM &&  <td> {item.weekswk4AM }  </td>}
                                {attributes.weekswk4PM &&  <td> {item.weekswk4PM }  </td>}
                                {attributes.weekswk5AM &&  <td> {item.weekswk5AM }  </td>}
                                {attributes.weekswk5PM &&  <td> {item.weekswk5PM }  </td>}
                                {attributes.weekswk6AM &&  <td> {item.weekswk6AM }  </td>}
                                {attributes.weekswk6PM &&  <td> {item.weekswk6PM }  </td>}
                                {attributes.weekswk7AM &&  <td> {item.weekswk7AM }  </td>}
                                {attributes.weekswk7PM &&  <td> {item.weekswk7PM }  </td>}
                                {attributes.weekswk8AM &&  <td> {item.weekswk8AM }  </td>}
                                {attributes.weekswk8PM &&  <td> {item.weekswk8PM }  </td>}
                                {attributes.weeksextendedCare &&  <td> {item.weeksextendedCare }  </td>}
                                {attributes.attendancewk1Expected &&  <td> {item.attendancewk1Expected }  </td>}
                                {attributes.attendancewk1Actual &&  <td> {item.attendancewk1Actual }  </td>}
                                {attributes.attendancewk2Expected &&  <td> {item.attendancewk2Expected }  </td>}
                                {attributes.attendancewk2Actual &&  <td> {item.attendancewk2Actual }  </td>}
                                {attributes.attendancewk3Expected &&  <td> {item.attendancewk3Expected }  </td>}
                                {attributes.attendancewk3Actual &&  <td> {item.attendancewk3Actual }  </td>}
                                {attributes.attendancewk4Expected &&  <td> {item.attendancewk4Expected }  </td>}
                                {attributes.attendancewk4Actual &&  <td> {item.attendancewk4Actual }  </td>}
                                {attributes.attendancewk5Expected &&  <td> {item.attendancewk5Expected }  </td>}
                                {attributes.attendancewk5Actual &&  <td> {item.attendancewk5Actual }  </td>}
                                {attributes.attendancewk6Expected &&  <td> {item.attendancewk6Expected }  </td>}
                                {attributes.attendancewk6Actual &&  <td> {item.attendancewk6Actual }  </td>}
                                {attributes.attendancewk7Expected &&  <td> {item.attendancewk7Expected }  </td>}
                                {attributes.attendancewk7Actual &&  <td> {item.attendancewk7Actual }  </td>}
                                {attributes.attendancewk8Expected &&  <td> {item.attendancewk8Expected }  </td>}
                                {attributes.attendancewk8Actual &&  <td> {item.attendancewk8Actual }  </td>}
                                {attributes.medicalInfodoctorName &&  <td> {item.medicalInfodoctorName }  </td>}
                                {attributes.medicalInfodoctorPhone &&  <td> {item.medicalInfodoctorPhone }  </td>}
                                {attributes.medicalInfoinsurance &&  <td> {item.medicalInfoinsurance }  </td>}
                                {attributes.medicalInfopolicyholder &&  <td> {item.medicalInfopolicyholder }  </td>}
                                {attributes.medicalInfoillnesses &&  <td> {item.medicalInfoillnesses }  </td>}
                                {attributes.medicalInfoallergiesDiet &&  <td> {item.medicalInfoallergiesDiet }  </td>}
                                {attributes.medicalInfomedications &&  <td> {item.medicalInfomedications }  </td>}
                                {attributes.medicalInfoactivities &&  <td> {item.medicalInfoactivities }  </td>}
                                {attributes.medicalInfoactivityNames &&  <td> {item.medicalInfoactivityNames }  </td>}
                                {attributes.medicalInfotreatments &&  <td> {item.medicalInfotreatments }  </td>}
                                {attributes.medicalInfotreatmentNames &&  <td> {item.medicalInfotreatmentNames }  </td>}
                                {attributes.medicalInfoimmunizations &&  <td> {item.medicalInfoimmunizations }  </td>}
                                {attributes.medicalInfotetanus &&  <td> {item.medicalInfotetanus }  </td>}
                                {attributes.medicalInfocomments &&  <td> {item.medicalInfocomments }  </td>}
                                {attributes.parentparentID &&  <td> {item.parentparentID }  </td>}
                                {attributes.parentregTime &&  <td> {item.parentregTime }  </td>}
                                {attributes.parentlocation &&  <td> {item.parentlocation }  </td>}
                                {attributes.parentg1FirstName &&  <td> {item.parentg1FirstName }  </td>}
                                {attributes.parentg1LastName &&  <td> {item.parentg1LastName }  </td>}
                                {attributes.parentg2FirstName &&  <td> {item.parentg2FirstName }  </td>}
                                {attributes.parentg2LastName &&  <td> {item.parentg2LastName }  </td>}
                                {attributes.parentaddress1 &&  <td> {item.parentaddress1 }  </td>}
                                {attributes.parentaddress2 &&  <td> {item.parentaddress2 }  </td>}
                                {attributes.parentcountry &&  <td> {item.parentcountry }  </td>}
                                {attributes.parentcity &&  <td> {item.parentcity }  </td>}
                                {attributes.parentstate &&  <td> {item.parentstate }  </td>}
                                {attributes.parentzipcode &&  <td> {item.parentzipcode }  </td>}
                                {attributes.parentemail1 &&  <td> {item.parentemail1 }  </td>}
                                {attributes.parentemail2 &&  <td> {item.parentemail2 }  </td>}
                                {attributes.parentg1Phone1 &&  <td> {item.parentg1Phone1 }  </td>}
                                {attributes.parentg1Phone2 &&  <td> {item.parentg1Phone2 }  </td>}
                                {attributes.parentg2Phone1 &&  <td> {item.parentg2Phone1 }  </td>}
                                {attributes.parentg2Phone2 &&  <td> {item.parentg2Phone2 }  </td>}
                                {attributes.emergencye1FirstName &&  <td> {item.emergencye1FirstName }  </td>}
                                {attributes.emergencye1LastName &&  <td> {item.emergencye1LastName }  </td>}
                                {attributes.emergencye1Relationship &&  <td> {item.emergencye1Relationship }  </td>}
                                {attributes.emergencye1Phone &&  <td> {item.emergencye1Phone }  </td>}
                                {attributes.emergencye1Authorized &&  <td> {item.emergencye1Authorized }  </td>}
                                {attributes.emergencye2FirstName &&  <td> {item.emergencye2FirstName }  </td>}
                                {attributes.emergencye2LastName &&  <td> {item.emergencye2LastName }  </td>}
                                {attributes.emergencye2Relationship &&  <td> {item.emergencye2Relationship }  </td>}
                                {attributes.emergencye2Phone &&  <td> {item.emergencye2Phone }  </td>}
                                {attributes.emergencye2Authorized &&  <td> {item.emergencye2Authorized }  </td>}
                                {attributes.paymentsamountPaid &&  <td> {item.paymentsamountPaid }  </td>}
                                {attributes.paymentscredit &&  <td> {item.paymentscredit }  </td>}
                                {attributes.paymentsearlyBird &&  <td> {item.paymentsearlyBird }  </td>}



                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    <Table striped bordered className="schedule" >
                        <thead>
                        <tr>
                            {attributes.counselorscounselorID && <th> Counselor ID    </th>}
                            {attributes.counselorsFirstName && <th>  First Name  </th>}
                            {attributes.counselorsLastName && <th>  Last Name  </th>}
                            {attributes.counselorscounselorEmail && <th>  Email   </th>}
                            {attributes.counselorscounselorGroup && <th>  Group   </th>}
                            {attributes.counselorscounselorStatus && <th>  Status   </th>}



                        </tr>
                        </thead>
                        <tbody>
                        {values.map(item => (
                            <tr>

                                {attributes.counselorscounselorID &&  <td> {item.id }  </td>}
                                {attributes.counselorsFirstName &&  <td> {item.firstName }  </td>}
                                {attributes.counselorsLastName &&  <td> {item.lastName }  </td>}
                                {attributes.counselorscounselorEmail &&  <td> {item.email}  </td>}
                                {attributes.counselorscounselorGroup &&  <td> {item.group }  </td>}
                                {attributes.counselorscounselorStatus &&  <td> {item.role }  </td>}

                            </tr>
                        ))}

                        </tbody>
                    </Table>
                </form><br />
            </Container>
            </body>
        </div>

    return (

        <body>
            {showOptions ? <Options />: null}
            {showResults ? <Results />: null}
        </body>
    )

}

export default Roster;