// Page for users to login

import React from 'react';

import {Redirect} from 'react-router-dom';
import {FormControl, Form, Button} from 'react-bootstrap';
import './Login.css';
import AuthService from './services/auth-service';

import axios from 'axios';

interface loginDetailsProp {
    email: string,
    password: string
}

const Login: React.FC<loginDetailsProp> = () => {
    const [values, setValues] = React.useState({
        loginEmail: '',
        password: ''
    });
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const {loginEmail, password} = values;
        await AuthService.login(loginEmail, password);

        if (AuthService.currentUser().roles.indexOf("adminRole") > -1){
            window.location.href="/#/admin"
            window.location.reload();
        }
        else if (AuthService.currentUser().roles.indexOf("parentRole") > -1){
            window.location.href="/#/parent"
            window.location.reload();
        }
        else if (AuthService.currentUser().roles.indexOf("counselorPending") > -1){
            window.location.href="/#/counselor/pending"
            window.location.reload();
        }
        else if (AuthService.currentUser().roles.indexOf("counselorRole") > -1){
            window.location.href="/#/counselor"
            window.location.reload();
        }
        else{
            window.location.href="/#/parent"
            window.location.reload();
        }
        //window.location.href="/#/parent"
        //window.location.reload();
    };
    const handleChange = (name: string) => (e: { target: { value: any; }; }) => {
        setValues({...values, [name]: e.target.value});
    };

    return (
            <div className={"login"}>

            <div className={"login-form"}>
                <h3>
                    Welcome Back!
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId={"Email"}>

                        <Form.Control type={"email"} placeholder={"Email"} className={"login-form-input"}
                                      onChange={handleChange('loginEmail')} required/>
                    </Form.Group>
                    <Form.Group controlId={"Password"}>
                        <span className={"rounded-pill"}>

                        <Form.Control type={"password"} placeholder={"Password"} className={"login-form-input"}
                                      onChange={handleChange('password')} required/>
                        </span>
                    </Form.Group>

                <Button variant="outline-primary" className="login-button"  type="submit">
                    Sign In
                </Button>
                </Form>
                <br />

                <Button className="newuser-button" href="/#/signup">
                    New Guardian
                </Button>
                <Button className="newuser-button" href="/#/signupcounselor">
                    New Counselor
                </Button>
                <Button className="password-button" href="/#/resetpassword">
                    Forgot Password?
                </Button>

            </div>

            </div>
        );
    }

export default Login;
