// Page for admin to view, approve, deny, and activate counselors

import React from "react";
import { Button, Container, Table, Tabs, Tab } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { Parent, Camper, Payment_Information } from "./models/models";
import axios from "axios";

interface Payment_InformationWithParents extends Payment_Information {
  email: string;
  firstName: string;
  lastName: string;
}

export default function ManageParents() {
  const history = useHistory();
  const [parents, setParents] = React.useState<Parent[]>([]);
  const [campers, setCampers] = React.useState<Camper[]>([]);
  const [paymentInfo, setPaymentInfo] = React.useState<Payment_InformationWithParents[]>([]);

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/parents/getParents").then((res) => {
        setParents(res.data);
      });
      await axios.get(process.env.REACT_APP_API + "api/campers/getCampers").then((res) => {
        setCampers(res.data);
      });
      await axios
        .get(process.env.REACT_APP_API + "api/payment_informations/getBasicPayment_InformationsWithUserInfo")
        .then((res) => {
          setPaymentInfo(res.data);
        });
    })();
  }, []);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" onClick={handleGoBack}>
        Back
      </Button>
      <Tabs defaultActiveKey="credit">
        <Tab eventKey="credit" title="Credit">
          <br />
          <br />
          <h3>Parents</h3>
          <br />
          <br />
          <div className="overflowTable">
            <Table className={"manageTable"} striped bordered>
              <thead>
                <tr>
                  <td>Parent</td>
                  <td>Campers</td>
                  <td>Credit</td>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id}>
                    <td>
                      {parent.firstName} {parent.lastName}
                    </td>
                    <td>
                      {campers
                        .filter((camper) => camper.parent_id === parent.id)
                        .map((camper) => (
                          <p key={camper.id}>
                            {camper.firstName} {camper.lastName}
                          </p>
                        ))}
                    </td>
                    <td>{parent.credit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="transactions" title="Transactions">
          <br />
          <br />
          <h3>Parents</h3>
          <br />
          <br />
          <div className="overflowTable">
            <Table className={"manageTable"} striped bordered>
              <thead>
                <tr>
                  <td>Parent Email</td>
                  <td>Parent Name</td>
                  <td>Total Cost</td>
                  <td>Total Paid (USD)</td>
                  <td>Total Paid (Credit)</td>
                  <td>Transaction Time</td>
                </tr>
              </thead>
              <tbody>
                {paymentInfo.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.email}</td>
                    <td>
                      {payment.firstName} {payment.lastName}
                    </td>
                    <td>{payment.totalCost}</td>
                    <td>{payment.totalPaidUSD}</td>
                    <td>{payment.totalPaidCredit}</td>
                    <td>{payment.transactionTime}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}
