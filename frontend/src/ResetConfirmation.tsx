// Page that shows a message to the user that their password has been reset

import React from 'react';

import {FormControl, Form, Button} from 'react-bootstrap';
import './Login.css';

export default class ResetConfirmation extends React.Component {
    render() {
        return (
            <div className={"login"}>
                <body>
                <div className={"login-form"}>
                    <h3>
                        Reset Confirmed
                    </h3>
                    Please check your email for a reset link
                    <br />
                    <a className="fineText" href="/#/login"> Login </a>

                </div>

                </body>
            </div>
        );
    }
}