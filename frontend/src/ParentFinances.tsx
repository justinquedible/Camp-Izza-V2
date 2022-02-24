import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { dateTimeToDate, dateTimeToTime } from "./utils/DateTimeUtil";
import { Payment_Information } from "./models/models";
import axios from "axios";

interface Payment_InformationWithParents extends Payment_Information {
  email: string;
  firstName: string;
  lastName: string;
}

export default function ParentFinances() {
  const history = useHistory();
  const auth = getAuth();
  const [paymentInfo, setPaymentInfo] = React.useState<Payment_InformationWithParents[]>([]);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await axios
          .get(process.env.REACT_APP_API + "api/payment_informations/getPayment_InformationByUser_id/" + user.uid)
          .then((res) => {
            setPaymentInfo(res.data);
          });
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" onClick={handleGoBack}>
        Back
      </Button>
      <br />
      <br />
      <h3>Finances</h3>
      <br />
      <br />
      <div className="overflowTable">
        <Table className={"manageTable"} striped bordered>
          <thead>
            <tr>
              <td>Total Cost</td>
              <td>Total Paid (USD)</td>
              <td>Total Paid (Credit)</td>
              <td>Transaction Time</td>
            </tr>
          </thead>
          <tbody>
            {paymentInfo.map((payment, index) => (
              <tr key={index}>
                <td>{payment.totalCost}</td>
                <td>{payment.totalPaidUSD}</td>
                <td>{payment.totalPaidCredit}</td>
                <td>{dateTimeToDate(payment.transactionTime) + " " + dateTimeToTime(payment.transactionTime)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
