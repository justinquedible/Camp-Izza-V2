// Page for users to reset their password

import React from 'react';

import {Redirect} from 'react-router-dom';
import {FormControl, Form, Button} from 'react-bootstrap';
import './Login.css';
import AuthService from './services/auth-service';

import axios from 'axios';

interface resetDetailsProp {
    email: string,

}
const ResetPassword : React.FC<resetDetailsProp> = () => {
    const [values, setValues] = React.useState({
        loginEmail: '',

    });
    const handleSubmit = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();
        const {loginEmail} = values;
        await AuthService.reset(loginEmail);
        // const login = {loginEmail, password};
        // await axios.post(URL + '/parentLogins/add', login);
        window.location.href="/#/resetConfirmed"
        window.location.reload();

    };
    const handleChange = (name: string) => (e: { target: { value: any; }; }) => {
        setValues({...values, [name]: e.target.value});
    };

    return (
        <div className={"login"}>
            <body>
            <div className={"login-form"}>
                <h3>
                    Reset Password
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId={"Email"}>
                        <Form.Control placeholder={"Email"} className={"login-form-input"}
                                      onChange={handleChange('loginEmail')}/>
                    </Form.Group>

                <Button className="newuser-button" type="submit">
                    Send Reset Link
                </Button>
                </Form>
                <br />
                <a className="fineText" href="/#/login"> Cancel </a>

            </div>

            </body>
        </div>
    );
}

export default ResetPassword ;