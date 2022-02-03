import React from "react";
import { Button } from "react-bootstrap";

const CompletedTransaction = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Thank you for registering!</h1>
      <br />
      <Button variant="outline-primary" className="backButton" href="/#/parent">
        Back to Dashboard
      </Button>
    </div>
  );
};

export default CompletedTransaction;
