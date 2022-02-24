import React from "react";
import { Button, Container, Table, Tabs, Tab } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { getAuth, User } from "firebase/auth";
import { dateTimeToDate, dateTimeToTime, dateTimeToDateInput, dateTimeToMilitaryTime } from "./utils/DateTimeUtil";
import { Parent, Camper, Payment_Information } from "./models/models";
import axios from "axios";

interface Payment_InformationWithParents extends Payment_Information {
    email: string;
    firstName: string;
    lastName: string;
}

interface CamperWithRegisteredCamperWeeks extends Camper {
    camp_week_id: number;
    group_id: number;
    registered_camper_weeks_id: number;
}

export default function ParentFinances() {
    const history = useHistory();
    // const [parents, setParents] = React.useState<Parent[]>([]);
    const auth = getAuth();
    const [user, setUser] = React.useState<User>();
    const [campers, setCampers] = React.useState<CamperWithRegisteredCamperWeeks[]>([]);
    const [paymentInfo, setPaymentInfo] = React.useState<Payment_InformationWithParents[]>([]);
  
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                axios.get(process.env.REACT_APP_API + "api/payment_informations/getPayment_Information/" + user.uid).then((res) => {
                    setPaymentInfo(res.data);
                });
            //   await axios.get(process.env.REACT_APP_API + "api/campers/getCampersWithRegisteredCamperWeeks").then((res) => {
            //     setCampers(res.data);
            //   });
            }
        });
        return unsubscribe;
      }, [auth]);
    
    const getCamperInfo = (paymentInfo: Payment_InformationWithParents[]) => {
        for (let p of paymentInfo){
            for (let c of campers){
                if (p.registered_camper_weeks == c.registered_camper_weeks_id){
                    
                }
            }
        }
    }
  
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
                {/* <td>Camper</td> */}
                <td>Total Cost</td>
                <td>Total Paid (USD)</td>
                <td>Total Paid (Credit)</td>
                <td>Transaction Time</td>
                </tr>
            </thead>
            <tbody>
                {paymentInfo.map((payment, index) => (
                <tr key={index}>
                    {/* <td>{payment.email}</td> */}
                    {/* <td>
                    {payment.firstName} {payment.lastName}
                    </td> */}
                    <td>{payment.totalCost}</td>
                    <td>{payment.totalPaidUSD}</td>
                    <td>{payment.totalPaidCredit}</td>
                    <td>{dateTimeToDate(payment.transactionTime) + " " + dateTimeToTime(payment.transactionTime)}</td>
                    {/* payment.transactionTime.substring(0,25) */}
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
      </Container>
    );
  }