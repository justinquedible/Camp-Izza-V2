// Page for parents to sign up

import "./Login.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import axios from "axios";

export default function SignUp() {
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
            role: "parent",
          });
          await axios.post(process.env.REACT_APP_API + "api/parents/addParent", {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            firstName: "",
            lastName: "",
            phone: "",
            guardian2FirstName: "",
            guardian2LastName: "",
            guardian2Phone: "",
            guardian2Email: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            zipCode: "",
            state: "CA",
            country: "USA",
          });
          for (let i = 0; i < 2; i++) {
            await axios.post(process.env.REACT_APP_API + "api/emergency_contacts/addEmergency_Contact", {
              user_id: userCredential.user.uid,
              firstName: "",
              lastName: "",
              relation: "",
              phone: "",
              authPickUp: false,
            });
          }
          history.push("/parent");
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
        <p>Parent / Guardian Signup</p>
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
        </Form>
        <br />

        <p className="fineText">
          Already a user? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
