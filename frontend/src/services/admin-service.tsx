import axios from "axios";
import api_url from "../API_URL/api_url";

const API_URL = api_url;

const getCampersInYear = (year: number) => {

    return axios.get(API_URL + "adminAPI/registeredProgram/getCampers/" + year).catch();

};

const getCamperSchedule = (camperID:number) => {
    const date = new Date();
    let year = date.getFullYear();
    return axios.post(API_URL + "adminAPI/registeredProgram/getCamperWeeks/" + year, {
        camperID
    }).catch();

};

const getAllCampersReg = () => {
    return axios.get(API_URL + "adminAPI/registeredProgram/getAllCampers/").catch();
}

const getAttendanceInDate = (date: Date | any) => {
    let data = {
        "date": date
    };
    let requestHeader = {
        'Content-Type':'application/json'
    };
    return axios.get(API_URL + "api/attendances/getAttendance", {params: data,
        headers: requestHeader}).catch();
}
const updateAttendance = (date: Date | any, camperID: string | any, time: string | any) => {
    return axios.post(API_URL + "api/attendances/updateAttendance", {date, camperID, time});
}

const updateBonusAttendance = (date: Date | any, bonusCamperName: string | any, bonusCamperGroup: string | any, time: string | any) => {
    return axios.post(API_URL + "api/attendances/updateBonusCamperStringAttendance", {date, bonusCamperName, bonusCamperGroup, time})
}

const getAttendanceReport = (id: string | null, year: string | null) => {

        return axios.get("api/attendances/getAttendanceReport/" + id + "/" + year);

}

const getGroupLimits = () => {
    return axios.get(API_URL + "adminAPI/registeredProgram/getYearGroupLimits/").catch();
}


const setGroupLimits = (datesAMLimit: number, datesPMLimit: number, cocoAMLimit: number, cocoPMLimit:
    number, treeAMLimit: number, treePMLimit: number, leadAMLimit: number, leadPMLimit: number) => {
    const date = new Date();
    let year = date.getFullYear();
    return axios.post(API_URL + "adminAPI/registeredProgram/setYearGroupLimits/", {
        year, datesAMLimit, datesPMLimit, cocoAMLimit, cocoPMLimit, treeAMLimit, treePMLimit, leadAMLimit,
        leadPMLimit
    }).catch();
}

const getProgramWeeks = () => {
    const date = new Date();
    let year = date.getFullYear();
    return axios.get(API_URL + "adminAPI/registeredProgram/allWeeksYear/"+year).catch();
}

const getProgramInfo = () => {
    const date = new Date();
    let year = date.getFullYear();
    return axios.get(API_URL + "adminAPI/registeredProgram/allWeeksYearCutoff/"+year).catch();
}

const getProgramPrice = () => {
    const date = new Date();
    let year = date.getFullYear();
    return axios.get(API_URL + "adminAPI/registeredProgram/getYearPricing/"+year).catch();
}

const setProgramPrice = (pricing_base_rate: number,
                         pricing_extra_rate: number,
                         extra_shirts: number,
                         extended_rate: number,) => {
    const date = new Date();
    let year = date.getFullYear();

    return axios.post(API_URL + "adminAPI/registeredProgram/setYearPricing/", {
        year, pricing_base_rate, pricing_extra_rate, extra_shirts, extended_rate,
    }).catch();
}

const setProgramWeeks = (allWeeks: (string | number  | never[])[][], cutoff:string, amTimeStart: any, amTimeEnd: any, amECTimeStart: any, amECTimeEnd: any, pmTimeStart: any, pmTimeEnd: any, pmECTimeStart: any, pmECTimeEnd: any,
                         fullTimeStart: any, fullTimeEnd: any, fullECTimeStart: any, fullECTimeEnd: any, amSelected: boolean, amECSelected: boolean, pmSelected: boolean, pmECSelected: boolean, fullSelected: boolean, fullECSelected: boolean) => {
    const date = new Date();
    let year = date.getFullYear();

    return axios.post(API_URL + "adminAPI/registeredProgram/editWeeks/"+year, {
        year, allWeeks, cutoff, amTimeStart, amTimeEnd, amECTimeStart, amECTimeEnd, pmTimeStart, pmTimeEnd, pmECTimeStart, pmECTimeEnd,
        fullTimeStart, fullTimeEnd, fullECTimeStart, fullECTimeEnd, amSelected, amECSelected, pmSelected, pmECSelected, fullSelected, fullECSelected
    }).catch();
}

const getWeeksHolidays = (weekID: number) => {

    return axios.get(API_URL + "adminAPI/registeredProgram/getWeekHolidays/"+weekID).catch();
}

const setWeeksHolidays = (weekID: number, holiday:String) => {

    return axios.post(API_URL + "adminAPI/registeredProgram/setWeekHolidays/"+weekID, {
        holiday
    }).catch();
}

const removeWeeksHolidays = (weekID: number, holidayID:number) => {

    return axios.post(API_URL + "adminAPI/registeredProgram/removeWeekHolidays/"+weekID, {
        holidayID
    }).catch();
}

const getPersonalCamper = () => {

    return axios.get(API_URL + "adminAPI/roster/personalCamper").catch();
}

const getAllCounselors = () => {

    return axios.get(API_URL + "adminAPI/roster/counselorInfo").catch();
}

const requestInfo = (personalchildID:boolean,  personalfirstName:boolean,  personallastName:boolean,  personalgender:boolean,  personaldob:boolean,  personalschool:boolean,  personalgrade:boolean,  personalshirtSize:boolean,  personalnumShirts:boolean,
                     personalallReg:boolean,  personalaccCreated:boolean,  personalgroup:boolean,  weekswk1AM:boolean,  weekswk1PM:boolean,  weekswk2AM:boolean,  weekswk2PM:boolean,  weekswk3AM:boolean,  weekswk3PM:boolean,  weekswk4AM:boolean,  weekswk4PM:boolean,  weekswk5AM:boolean,
                     weekswk5PM:boolean,  weekswk6AM:boolean,  weekswk6PM:boolean,  weekswk7AM:boolean,  weekswk7PM:boolean,  weekswk8AM:boolean,  weekswk8PM:boolean,  weeksextendedCare:boolean,  attendancewk1Expected:boolean,  attendancewk1Actual:boolean,  attendancewk2Expected:boolean,
                     attendancewk2Actual:boolean,  attendancewk3Expected:boolean,  attendancewk3Actual:boolean,  attendancewk4Expected:boolean,  attendancewk4Actual:boolean,  attendancewk5Expected:boolean,  attendancewk5Actual:boolean,  attendancewk6Expected:boolean,
                     attendancewk6Actual:boolean,  attendancewk7Expected:boolean,  attendancewk7Actual:boolean,  attendancewk8Expected:boolean,  attendancewk8Actual:boolean,  medicalInfodoctorName:boolean,  medicalInfodoctorPhone:boolean,  medicalInfoinsurance:boolean,
                     medicalInfopolicyholder:boolean,  medicalInfoillnesses:boolean,  medicalInfoallergiesDiet:boolean,  medicalInfomedications:boolean,  medicalInfoactivities:boolean,  medicalInfoactivityNames:boolean,  medicalInfotreatments:boolean,
                     medicalInfotreatmentNames:boolean,  medicalInfoimmunizations:boolean,  medicalInfotetanus:boolean,  medicalInfocomments:boolean,  parentparentID:boolean,  parentregTime:boolean,  parentlocation:boolean,  parentg1FirstName:boolean,
                     parentg1LastName:boolean,  parentg2FirstName:boolean,  parentg2LastName:boolean,  parentaddress1:boolean,  parentaddress2:boolean,  parentcountry:boolean,  parentcity:boolean,  parentstate:boolean,  parentzipcode:boolean,  parentemail1:boolean,  parentemail2:boolean,
                     parentg1Phone1:boolean,  parentg1Phone2:boolean,  parentg2Phone1:boolean,  parentg2Phone2:boolean,  emergencye1FirstName:boolean,  emergencye1LastName:boolean,  emergencye1Relationship:boolean,  emergencye1Phone:boolean,  emergencye1Authorized:boolean,
                     emergencye2FirstName:boolean,  emergencye2LastName:boolean,  emergencye2Relationship:boolean,  emergencye2Phone:boolean,  emergencye2Authorized:boolean,  paymentsamountPaid:boolean,  paymentscredit:boolean,  paymentsearlyBird:boolean,
                     counselorscounselorID:boolean,  counselorscounselorEmail:boolean,  counselorscounselorGroup:boolean,  counselorscounselorStatus:boolean, personalyearCreated: boolean, year:number) => {

    return axios.post(API_URL + "adminAPI/roster/requestInfo", {
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
        counselorscounselorID, counselorscounselorEmail, counselorscounselorGroup, counselorscounselorStatus, personalyearCreated, year
    }).catch();
}

const emergencyInfo = (camperId: number) => {
    let personalfirstName  = true;let personallastName  = true;let personalgender  = true;let personaldob  = true;
    let personalschool  = true;let personalgrade  = true;let weeksextendedCare  = true;let medicalInfodoctorName  = true;let medicalInfodoctorPhone  = true;
    let medicalInfoinsurance  = true;let medicalInfopolicyholder  = true;let medicalInfoillnesses  = true;
    let medicalInfoallergiesDiet  = true;let medicalInfomedications  = true;let medicalInfoactivities  = true;let medicalInfoactivityNames  = true;let medicalInfotreatments  = true;let medicalInfotreatmentNames  = true;let medicalInfoimmunizations  = true;let medicalInfotetanus  = true;let medicalInfocomments  = true;let parentg1FirstName  = true;let parentg1LastName  = true;let parentg2FirstName  = true;let parentg2LastName  = true;
    let parentemail1  = true;let parentemail2  = true;let parentg1Phone1  = true;let parentg1Phone2  = true;let parentg2Phone1  = true;
    let parentg2Phone2  = true;let emergencye1FirstName  = true;let emergencye1LastName  = true;let emergencye1Relationship  = true;let emergencye1Phone  = true;
    let emergencye2FirstName  = true;let emergencye2LastName  = true;let emergencye2Relationship  = true; let emergencye2Phone = true
    let parentaddress1 = true;
    return axios.post(API_URL + "adminAPI/roster/emergencyInfo",{
        camperId, personalfirstName, personallastName, personalgender, personaldob, personalschool, personalgrade, weeksextendedCare,
        medicalInfodoctorName, medicalInfodoctorPhone, medicalInfoinsurance, medicalInfopolicyholder, medicalInfoillnesses, medicalInfoallergiesDiet,
        medicalInfomedications, medicalInfoactivities, medicalInfoactivityNames, medicalInfotreatments, medicalInfotreatmentNames, medicalInfoimmunizations,
        medicalInfotetanus, medicalInfocomments, parentg1FirstName, parentg1LastName, parentg2FirstName, parentg2LastName, parentemail1, parentemail2, parentg1Phone1,
        parentg1Phone2, parentg2Phone1, parentg2Phone2, emergencye1FirstName, emergencye1LastName, emergencye1Relationship, emergencye1Phone, emergencye2FirstName,
        emergencye2LastName, emergencye2Relationship, emergencye2Phone, parentaddress1
    })
}




export default {
    getCampersInYear, getAllCampersReg, getGroupLimits, setGroupLimits, getProgramWeeks, getProgramPrice,
    setProgramPrice, setProgramWeeks, getWeeksHolidays, setWeeksHolidays, removeWeeksHolidays, getProgramInfo,
    getPersonalCamper, requestInfo, getAttendanceInDate, updateAttendance, updateBonusAttendance, emergencyInfo,
    getCamperSchedule, getAllCounselors,getAttendanceReport
}