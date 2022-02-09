// Page for counselors to sign up

import "./Login.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import axios from "axios";

export default function SignUpCounselor() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const auth = getAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: UserCredential) => {
          await axios.post(process.env.REACT_APP_API + "api/users/addUser", {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            role: "counselor",
          });
          history.push("/counselor");
        })
        .catch((error) => {
          setIsLoading(false);
          let errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <p>Counselor Signup</p>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              className="login-form-input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              className="login-form-input"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Form.Group>

          <Form.Group controlId="Confirm Password">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              className="login-form-input"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              isInvalid={password !== passwordConfirm}
            />
            <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
          </Form.Group>

          <Button variant="outline-primary" className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          <p className="fineText">
            Upon sign up as a counselor, your account will be pending until admin approval is received. If admin
            approval is not received, your account will be deleted. Please contact Camp Izza for further details.
          </p>
        </Form>
        <br />

        <p className="fineText">
          Already a user? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
