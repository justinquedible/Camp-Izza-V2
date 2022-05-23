// Page for users to update their password

import "./Login.css";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth, updateEmail } from "firebase/auth";

export default function UpdateEmail() {
  const [email, setEmail] = React.useState("");
  const [emailConfirm, setEmailConfirm] = React.useState("");
  const [showEmailUpdated, setShowEmailUpdated] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const history = useHistory();
  const auth = getAuth();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (auth.currentUser) {
      if (email === emailConfirm) {
        setIsUpdating(true);
        updateEmail(auth.currentUser, email)
          .then(async () => {
            await axios.put(process.env.REACT_APP_API + "api/users/updateUserEmail/" + auth.currentUser?.uid, {
              email: email,
            });
            setShowEmailUpdated(true);
            setIsUpdating(false);
            console.log("email updated");
            setTimeout(() => window.location.reload(), 1000);
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h3>Update Email</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Email">
            <Form.Control
              type="text"
              placeholder="New Email"
              className="login-form-input"
              required
              minLength={6}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="Confirm Email">
            <Form.Control
              type="text"
              placeholder="Confirm New Email"
              className="login-form-input"
              required
              onChange={(e) => setEmailConfirm(e.target.value)}
              isInvalid={email !== emailConfirm}
            />
            <Form.Control.Feedback type="invalid">Emails do not match.</Form.Control.Feedback>
          </Form.Group>

          {showEmailUpdated && <h6 style={{ color: "green" }}>Email Updated!</h6>}

          <Button className="newuser-button" type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Form>

        <Button
          className="password-button"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
