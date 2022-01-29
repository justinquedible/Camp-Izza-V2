// Page for users to login

import "./Login.css";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const auth = getAuth();

  const routeUser = React.useCallback(
    async (user: User) => {
      axios.get(process.env.REACT_APP_API + "api/users/getUser/" + user.uid).then((res) => {
        console.log(res.data);
        if (res.data.role === "parent") {
          history.replace("/parent");
        } else if (res.data.role === "counselor") {
          history.replace("/counselor");
        } else if (res.data.role === "admin") {
          history.replace("/admin");
        }
      });
    },
    [history]
  );

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        setIsLoading(false);
        routeUser(user);
      }
    });
    return unsubscribe;
  }, [auth, routeUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("logged in");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        alert(error.code);
      });
  };

  return (
    <div className="login">
      <div className="login-form">
        <h3>Welcome Back</h3>
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
            />
          </Form.Group>

          <Button variant="outline-primary" className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>
        <br />

        <Button className="newuser-button" onClick={() => history.push("/signupParent")}>
          New Guardian
        </Button>
        <Button className="newuser-button" onClick={() => history.push("/signupCounselor")}>
          New Counselor
        </Button>
        <Button className="password-button" onClick={() => history.push("/resetPassword")}>
          Forgot Password?
        </Button>
      </div>
    </div>
  );
}
