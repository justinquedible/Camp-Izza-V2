// This was a test prototype for using the current users information

import React from "react";
import AuthService from './services/auth-service';
import {Button, Form} from "react-bootstrap";
import './Login.css';

const Profile = () => {
    const currentUser = AuthService.currentUser();
    //currentUser = AuthService.currentUser();


        return (
            <div className={"login"}>
                <body>
                <div className={"login-form"}>
                    <h3>
                        Welcome {currentUser.firstName + " " +currentUser.lastName}
                    </h3>


                </div>

                </body>
            </div>
        );

}
export default Profile;