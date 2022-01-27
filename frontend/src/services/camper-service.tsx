import axios from "axios";
import api_url from "../API_URL/api_url";

const API_URL = api_url + "api/campers/";

const addCamper = (
  firstName: string,
  lastName: string,
  genderEnum: string,
  dobDate: string,
  schoolName: string,
  gradeNum: number,
  shirtEnum: string,
  doctorName: string,
  doctorPhone: string,
  insurance: string,
  policy_holder: string,
  illnesses: string,
  illnesses_names: string,
  allergies: string,
  allergy_names: string,
  medication: string,
  medication_names: string,
  activities: string,
  activity_names: string,
  medical_treatments: string,
  medical_treatment_names: string,
  immunizations: string,
  tetanus_date: string,
  comment: string,
  userID: number
) => {
  return axios
    .post(API_URL + "add", {
      firstName,
      lastName,
      genderEnum,
      dobDate,
      schoolName,
      gradeNum,
      shirtEnum,
      doctorName,
      doctorPhone,
      insurance,
      policy_holder,
      illnesses,
      illnesses_names,
      allergies,
      allergy_names,
      medication,
      medication_names,
      activities,
      activity_names,
      medical_treatments,
      medical_treatment_names,
      immunizations,
      tetanus_date,
      comment,
      userID,
    })
    .then((data) => console.log(data))
    .catch((error) => {
      if (error.response.status === 500) {
        window.alert("500 Internal Server Error: Please try again later");
        // throw new Error("500 Internal Server Error: Please try again later");
      }
    });
};

const delCamper = (id: number) => {
  return axios.post(API_URL + "del/" + id);
};

const getInfo = (firstName: string | null, userID: string | null) => {
  return axios.post(API_URL + "getInfo", {
    firstName,
    userID,
  });
};

const getCamperInfo = (campersID: string | null) => {
  let camperID = Number(campersID);

  return axios.post(API_URL + "getCamperInfo", {
    camperID,
  });
};

const addCamperSchedule = (
  name: string,
  userId: number,
  numShirts: number,
  currentWeeksRegistered: Array<any>
) => {
  const date = new Date();
  let currentYear = date.getFullYear();
  return axios.post(API_URL + "addSchedule", {
    name,
    userId,
    currentYear,
    numShirts,
    currentWeeksRegistered,
  });
};

const getScheduleInfo = (camperName: string, userID: number) => {
  const date = new Date();
  let currentYear = date.getFullYear();
  return axios.post(API_URL + "getScheduleInfo", {
    camperName,
    userID,
    currentYear,
  });
};

const getCamperScheduleInfo = (camperID: number) => {
  const date = new Date();
  let year = date.getFullYear();
  return axios.post(API_URL + "getCamperScheduleInfo", {
    camperID,
    year,
  });
};

const getGroupInfo = (group: string) => {
  return axios.post(API_URL + "getGroupInfo", {
    group,
  });
};

const assignGroup = (id: number, group: string) => {
  return axios.post(API_URL + "assignGroup", {
    id,
    group,
  });
};

const assignCredit = (id: number, amount: number) => {
  return axios.post(API_URL + "setCredit/" + id, {
    amount,
  });
};
// Camper ID and Amount for credit or payment
const assignPaid = (id: number, amount: number) => {
  return axios.post(API_URL + "setPaid/" + id, {
    amount,
  });
};

const getCredit = (id: number) => {
  return axios.get(API_URL + "getCredit/" + id).catch();
};

const getPaid = (id: number) => {
  return axios.get(API_URL + "getPaid/" + id).catch();
};

export default {
  addCamper,
  getInfo,
  addCamperSchedule,
  getScheduleInfo,
  delCamper,
  getGroupInfo,
  getCamperScheduleInfo,
  assignGroup,
  assignPaid,
  assignCredit,
  getPaid,
  getCredit,
  getCamperInfo,
};
