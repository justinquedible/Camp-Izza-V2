import React from "react";
import { Button, Container, Table, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [paymentInfo, setPaymentInfo] = React.useState<Payment_InformationWithParents[]>([]);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await axios
          .get(process.env.REACT_APP_API + "api/payment_informations/getPayment_InformationByUser_id/" + user.uid)
          .then((res) => {
            setPaymentInfo(res.data);
          });
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Container className="Admin-Buttons">
      {isLoading ? (
        <div className="center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <Button variant="primary" className="backButton" onClick={handleGoBack}>
            Back
          </Button>
          <Button variant="success" className="backButton" href="/#/parent/campers" style={{ marginLeft: 30 }}>
            Campers
          </Button>
          <br />
          <br />
          <h3>Payment History</h3>
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
        </div>
      )}
    </Container>
  );
}
