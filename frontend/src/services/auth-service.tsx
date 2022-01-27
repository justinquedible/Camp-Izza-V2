import axios from "axios";
import { stringify } from "querystring";
import api_url from "../API_URL/api_url";

const API_URL = api_url + "auth/";

const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  let roles = ["parentRole"];

  return axios
    .post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password,
      roles,
    })
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("Email already registered");
        return false;
      }
    });
};

const counselorRegister = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  let role = ["counselorPending"];
  let payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    roles: role,
  };

  return axios.post(API_URL + "signup", payload).catch((error) => {
    if (error.response.status === 400) {
      window.alert("Email already registered");
      return false;
    }
  });
};

const reset = (email: string) => {
  return axios
    .post(API_URL + "forgot-password", {
      email,
    })
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("This email is not registered in the system.");
        throw new Error("Error: Email not registered");
      }
    });
};

const verifyAndUpdatePass = (token: string, password: string) => {
  return axios
    .post(API_URL + "confirm-reset", {
      token,
    })
    .then((response) => {
      if ((response.status = 200)) {
        let email: string = response.data.email;
        updatePass(email, password).then((r) => console.log("worked"));
        return email;
      } else if ((response.status = 400)) {
        return false;
      }
    });
};

const updatePass = (email: string, password: string) => {
  return axios
    .post(API_URL + "reset-password", {
      email,
      password,
    })
    .then((response) => {});
};

const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      //localStorage.setItem("user", JSON.stringify(response.data));
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        window.alert("Invalid email or password");
        throw new Error("Error: Invalid email or password");
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const currentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};

const currentChild = () => {
  return localStorage.getItem("currentChild") as string;
};

const isLoggedin = () => {
  var loggedIn: boolean;
  if (localStorage.getItem("user") == null) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }
  return loggedIn;
};

const verifyAccess = () => {
  if (currentUser().roles.indexOf("adminRole") > -1) {
    return true;
  }
  return false;
};

const getPendingCounselors = () => {
  return axios.get(API_URL + "pending-counselors", {}).catch();
};

const getAllCounselors = () => {
  return axios.get(API_URL + "all-counselors", {}).catch();
};

const getArchivedCounselors = () => {
  return axios.get(API_URL + "archived-counselors", {}).catch();
};

const changeCounselorActive = (id: number) => {
  let role = "counselorRole";
  let payload = {
    id: id,
    roles: role,
  };

  return axios
    .post(API_URL + "change-counselor-active", payload)
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("Error Role");
        return false;
      }
    });
};

const changeCounselorArchive = (id: number) => {
  let role = "counselorArchived";
  let payload = {
    id: id,
    roles: role,
  };

  return axios
    .post(API_URL + "change-counselor-archived", payload)
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("Error Role");
        return false;
      }
    });
};

const deleteCounselor = (id: number) => {
  let role = "counselorArchived";
  let payload = {
    id: id,
    roles: role,
  };

  return axios.post(API_URL + "delete-counselor", payload).catch((error) => {
    if (error.response.status === 400) {
      window.alert("Error Role");
      return false;
    }
  });
};

const getGroupInfo = (group: string) => {
  return axios.post(API_URL + "counselor-groups", {
    group,
  });
};

const assignGroup = (id: number, group: string) => {
  return axios.post(API_URL + "change-counselorGroup", {
    id,
    group,
  });
};

export default {
  register,
  login,
  logout,
  currentUser,
  isLoggedin,
  reset,
  updatePass,
  verifyAndUpdatePass,
  currentChild,
  verifyAccess,
  counselorRegister,
  getPendingCounselors,
  changeCounselorActive,
  getAllCounselors,
  getArchivedCounselors,
  changeCounselorArchive,
  deleteCounselor,
  getGroupInfo,
  assignGroup,
};
