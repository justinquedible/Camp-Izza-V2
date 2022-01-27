// Page for users to update their password

import React from 'react';

import {useParams } from 'react-router-dom';
import {FormControl, Form, Button} from 'react-bootstrap';
import './Login.css';
import AuthService from './services/auth-service';

import axios from 'axios';

interface resetDetailsProp {
    password: string,

}


const UpdatePasswordRequest : React.FC<resetDetailsProp> = () => {
    let token: any;
    ({token} = useParams());

    const [values, setValues] = React.useState({
        newPassword: '',

    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const {newPassword} = values;

        let verified:any = await AuthService.verifyAndUpdatePass(token, newPassword);

        // const login = {loginEmail, password};
        // await axios.post(URL + '/parentLogins/add', login);
        if (verified == false){
            window.location.href="login"
        }
        else {
            window.location.href= "/#/updateSuccess";
        }

    };
    const handleChange = (name: string) => (e: { target: { value: any; }; }) => {
        setValues({...values, [name]: e.target.value});
    };


    return (
        <div className={"login"}>
            <body>
            <div className={"login-form"}>
                <h3>
                    Update Password
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId={"Email"}>
                        <Form.Control type={"password"}  placeholder={"New Password"} className={"login-form-input"}
                                      onChange={handleChange('newPassword')}/>
                    </Form.Group>

                    <Button className="newuser-button" type="submit">
                        Update
                    </Button>
                </Form>
                <br />
                <a className="fineText" href="#/login"> Cancel </a>

            </div>

            </body>
        </div>
    );
}

export default UpdatePasswordRequest ;