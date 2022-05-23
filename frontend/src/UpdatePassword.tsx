// Page for users to update their password

import "./Login.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth, updatePassword, signInWithEmailAndPassword } from "firebase/auth";

export default function UpdatePassword() {
  const [passwordOld, setPasswordOld] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [showPasswordUpdated, setShowPasswordUpdated] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const history = useHistory();
  const auth = getAuth();

  const verifyOldPassword = async () => {
    let isCorrect = false;
    if (auth.currentUser && auth.currentUser.email) {
      await signInWithEmailAndPassword(auth, auth.currentUser.email, passwordOld)
        .then(() => {
          isCorrect = true;
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
    return isCorrect;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!(await verifyOldPassword())) {
      console.log("Old password is incorrect");
      return;
    }
    if (auth.currentUser) {
      if (password === passwordConfirm) {
        setIsUpdating(true);
        updatePassword(auth.currentUser, password)
          .then(() => {
            setShowPasswordUpdated(true);
            setIsUpdating(false);
            console.log("password updated");
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
        <h3>Update Password</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Old Password">
            <Form.Control
              type="password"
              placeholder="Old Password"
              className="login-form-input"
              required
              onChange={(e) => setPasswordOld(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Control
              type="password"
              placeholder="New Password"
              className="login-form-input"
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="Confirm Password">
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              className="login-form-input"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
              isInvalid={password !== passwordConfirm}
            />
            <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
          </Form.Group>

          {showPasswordUpdated && <h6 style={{ color: "green" }}>Password Updated!</h6>}

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
