// Page for users to reset their password

import "./Login.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const [email, setEmail] = React.useState("");
  const auth = getAuth();
  const history = useHistory();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("email sent to", email);
        history.push("/resetConfirmation");
      })
      .catch((error) => {
        console.log(error);
        let errorCode = error.code;
        alert(errorCode);
      });
  };

  return (
    <div className="login">
      <div className="login-form">
        <h3>Reset Password</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Email">
            <Form.Control
              placeholder="Email"
              className="login-form-input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="newuser-button" type="submit">
            Send Reset Link
          </Button>
        </Form>
        <p className="fineText">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
