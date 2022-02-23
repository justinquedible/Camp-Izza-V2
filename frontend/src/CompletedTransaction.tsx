import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { User } from "./models/models";

const CompletedTransaction = () => {
  const history = useHistory();
  const auth = getAuth();

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await axios.get(`${process.env.REACT_APP_API}/api/users/getUser/${user.uid}`).then((res) => {
          setUser(res.data);
        });
      }
    });
    return unsubscribe;
  }, [auth, history]);

  const handleBack = () => {
    if (user?.role === "admin") {
      history.push("/admin");
    } else if (user?.role === "parent") {
      history.push("/parent");
    }
  };

  return (
    <Container style={{ textAlign: "center", paddingTop: 150 }}>
      <h1>Thank you for registering!</h1>
      <br />
      <h4>An email will be sent to you shortly.</h4>
      <br />
      <Button variant="outline-primary" className="backButton" onClick={handleBack}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default CompletedTransaction;
