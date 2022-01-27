import React from "react";
import { Button } from "react-bootstrap";

const CompletedTransaction = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <body style={{ textAlign: "center" }}>
        <h1>Thank you for registering!</h1>
        <br />
        <Button
          variant="outline-primary"
          className="backButton"
          href="/#/parent"
        >
          {" "}
          Back to Dashboard{" "}
        </Button>
      </body>
    </div>
  );
};

export default CompletedTransaction;
