// Contains the url path for each file

import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignupParent from "./SignupParent";
import ResetPassword from "./ResetPassword";
import ResetConfirmation from "./ResetConfirmation";
import UpdatePassword from "./UpdatePassword";
import Parent from "./Parent";
import HouseholdForm from "./HouseholdForm";
import CamperForm from "./CamperForm";
import CamperScheduling from "./CamperScheduling";
import Checkout from "./Checkout";
import Admin from "./Admin";
import Sessions from "./Sessions";

import ManageCampers from "./ManageCampers";
import Groups from "./Groups";
import AdminAttendance from "./AdminAttendance";
import AttendanceReport from "./AttendanceReport";
import BonusCamper from "./BonusCamper";
import SignUpCounselor from "./NewSignupCounselor";
import Pending from "./Pending";
import ManageCounselors from "./ManageCounselors";
import Profile from "./Profile";
import Roster from "./Roster";

import Counselor from "./Counselor";
import CounselorAttendance from "./CounselorAttendance";
import EmergencyForm from "./EmergencyForm";
import NavBarInstance from "./NavBar";
import FooterInstance from "./Footer";
import AdminProtected from "./AdminProtected";
import AdminCamperForm from "./AdminCamperForm";
import CompletedTransaction from "./CompletedTransaction";
import CamperInfo from "./CamperInfo";
import CounselorInfo from "./CounselorInfo";
import CounselorForm from "./CounselorForm";
import AttendanceOfCounselor from "./AttendanceOfCounselor";

// Firebase SDK's initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// This web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBauLdb1E6LBMffHi-KPj-4a47YSSbk70Y",
  authDomain: "rugged-sunbeam-229808.firebaseapp.com",
  projectId: "rugged-sunbeam-229808",
  storageBucket: "rugged-sunbeam-229808.appspot.com",
  messagingSenderId: "969542780809",
  appId: "1:969542780809:web:de14bfc28933790ddec358",
  measurementId: "G-4F4LPJZ4CT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">{NavBarInstance()}</header>
      <div>
        <HashRouter>
          <div>
            <Switch>
              {/* Login and Registration */}
              <Route exact path={"/"} component={Login} />
              <Route exact path={"/home"} component={Login} />
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/signupParent"} component={SignupParent} />
              <Route exact path={"/resetPassword"} component={ResetPassword} />
              <Route exact path={"/resetConfirmation"} component={ResetConfirmation} />
              <Route exact path={"/updatePassword"} component={UpdatePassword} />
              {/* Parent */}
              <Route exact path={"/parent"} component={Parent} />
              <Route exact path={"/parent/householdForm"} component={HouseholdForm} />
              <Route exact path={"/parent/camperForm"} component={CamperForm} />
              <Route exact path={"/parent/camperScheduling"} component={CamperScheduling} />
              <Route exact path={"/parent/checkout"} component={Checkout} />
              <Route exact path={"/parent/completedTransaction"} component={CompletedTransaction} />
              {/* Admin */}
              <Route exact path={"/admin"} component={Admin} />
              <Route exact path={"/admin/sessions"} component={Sessions} />

              <Route exact path={"/admin/manageCampers"} component={ManageCampers} />
              <Route exact path={"/admin/groups"} component={Groups} />
              <Route exact path={"/admin/attendance"} component={AdminAttendance} />
              <Route exact path={"/admin/attendance/bonuscamper"} component={BonusCamper} />
              <Route exact path={"/admin/AttendanceReport"} component={AttendanceReport} />
              <Route exact path={"/admin/roster"} component={Roster} />
              <Route exact path={"/admin/managecounselors"} component={ManageCounselors} />
              <Route exact path={"/admin/AdminCamperForm"} component={AdminCamperForm} />
              <Route exact path={"/admin/emergencyform"} component={EmergencyForm} />
              <Route exact path={"/signupCounselor"} component={SignUpCounselor} />
              <Route exact path={"/counselor/pending"} component={Pending} />

              <Route exact path={"/CamperInfo"} component={CamperInfo} />

              <Route exact path={"/Profile"} component={Profile} />

              <Route exact path={"/counselor"} component={Counselor} />
              <Route exact path={"/counselorInfo"} component={CounselorInfo} />
              <Route exact path={"/counselorForm"} component={CounselorForm} />
              <Route exact path={"/counselor/takeAttendance"} component={CounselorAttendance} />
              <Route exact path={"/counselor/myAttendance"} component={AttendanceOfCounselor} />
            </Switch>
          </div>
        </HashRouter>
      </div>
      <footer>{FooterInstance}</footer>
    </div>
  );
}

export default App;
