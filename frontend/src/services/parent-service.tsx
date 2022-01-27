import axios from "axios";
import {stringify} from "querystring";
import api_url from "../API_URL/api_url";

const API_URL = api_url + "/api/parents/";

const addHouseHold = (parentEmail: string,
    guardianNameFirst1: string, guardianNameLast1: string, guardianNameFirst2: string, guardianNameLast2: string,
                     test:string, guardianEmail2: string, guardian1areacode:string, guardian1Phone1: string,
                      guaridan2areacode: string, guardian2Phone1: string, address1: string, address2: string,
                      country: string, city: string, state: string, zipPostalCode:string,emergency1first:string, emergency1last:string, emergency1relationship:string, emergency1areacode: string,
                      emergency1Phone: string, emergency2first:string, emergency2last:string, emergency2relationship:string,emergency2areacode: string, emergency2Phone: string) => {
    let guardianEmail1 = parentEmail;

    return axios.post(API_URL + "add", {
        parentEmail,
        guardianNameFirst1, guardianNameLast1, guardianNameFirst2, guardianNameLast2,
        guardianEmail1, guardianEmail2, guardian1areacode,guardian1Phone1, guaridan2areacode, guardian2Phone1, address1,
        address2, country, city, state, zipPostalCode, emergency1first, emergency1last, emergency1relationship, emergency1areacode ,emergency1Phone,
        emergency2first, emergency2last, emergency2relationship, emergency2areacode, emergency2Phone,
    });
};



const getInfo =(parentEmail:string) => {
    return axios.post(API_URL + "getInfo", {
        parentEmail,
    });
}



export default {
    addHouseHold,
    getInfo
};
