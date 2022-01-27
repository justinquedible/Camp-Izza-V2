// Page for counselors to sign up

import React from "react";

import { Redirect } from "react-router-dom";
import { FormControl, Form, Button } from "react-bootstrap";
import "./Login.css";

import axios from "axios";
import AuthService from "./services/auth-service";

interface loginDetailsProp {
  email: string;
  password: string;
}

const SignUpCounselor: React.FC<loginDetailsProp> = () => {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    loginEmail: "",
    password: "",
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { firstName, lastName, loginEmail, password } = values;
    // await AuthService.register(firstName, lastName, loginEmail, password);
    if (
      await AuthService.counselorRegister(
        firstName,
        lastName,
        loginEmail,
        password
      )
    ) {
      window.location.href = "/#/counselor/pending";
    }
    // const login = {loginEmail, password};
    // await axios.post(URL + '/auth/signup', login);
  };
  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div className={"login"}>
      <body>
        <div className={"login-form"}>
          <p>Counselor Signup</p>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId={"FirstName"}>
              <Form.Control
                placeholder={"First Name"}
                className={"login-form-input"}
                onChange={handleChange("firstName")}
              />
            </Form.Group>

            <Form.Group controlId={"LastName"}>
              <Form.Control
                placeholder={"Last Name"}
                className={"login-form-input"}
                onChange={handleChange("lastName")}
              />
            </Form.Group>

            <Form.Group controlId={"Email"}>
              <Form.Control
                onChange={handleChange("loginEmail")}
                type={"email"}
                placeholder={"Email"}
                className={"login-form-input"}
              />
            </Form.Group>
            <Form.Group controlId={"Password"}>
              <span className={"rounded-pill"}>
                <Form.Control
                  onChange={handleChange("password")}
                  type={"password"}
                  placeholder={"Password"}
                  className={"login-form-input"}
                />
              </span>
            </Form.Group>
            <Button
              variant="outline-primary"
              className="login-button"
              type="submit"
              href="/#/counselor/pending"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <p className="fineText">
              {" "}
              Upon sign up as a counselor, your account will be pending until
              admin approval is received. If admin approval is not received,
              your account will be deleted. Please contact Camp Izza for further
              details.{" "}
            </p>
          </Form>
          <br />

          <p className="fineText">
            {" "}
            Already a user? <a href="/#/login"> Log In </a>
          </p>
        </div>
      </body>
    </div>
  );
};
export default SignUpCounselor;
