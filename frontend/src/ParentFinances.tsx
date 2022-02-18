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

export default function ParentFinances() {
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
    
  
    const handleParentClick = (parent_id: string) => {
      sessionStorage.setItem("parent_id", parent_id);
      history.push("/parent");
    }
  
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
                <td>Parent Email</td>
                <td>Parent Name</td>
                <td>Total Cost</td>
                <td>Total Paid (USD)</td>
                <td>Total Paid (Credit)</td>
                <td>Transaction Time</td>
                </tr>
            </thead>
            <tbody>
                {/* {paymentInfo.map((payment, index) => (
                <tr key={index}>
                    <td>{payment.email}</td>
                    <td>
                    {payment.firstName} {payment.lastName}
                    </td>
                    <td>{payment.totalCost}</td>
                    <td>{payment.totalPaidUSD}</td>
                    <td>{payment.totalPaidCredit}</td>
                    <td>{payment.transactionTime.substring(0,25)}</td>
                </tr>
                ))} */}
            </tbody>
            </Table>
        </div>
      </Container>
    );
  }