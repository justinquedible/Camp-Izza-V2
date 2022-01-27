// Page for admin to view, approve, deny, and activate counselors

import React from 'react';
import {Button, Card, CardColumns, Container} from "react-bootstrap";
import './Dashboard.css';
import AuthService from './services/auth-service';
import {List} from "rsuite";

interface Props {
}

interface Roles{
    id: number
    roleName: string
}


interface Counselors {
    firstName: string,
    lastName: string,
    email: string
    id: number

}



const defaultCounselors:Counselors[] = [];

const allCounselors:Counselors[] = [];

const archviedCounselors:Counselors[] = [];




export const ManageCounselors: React.FC<Props> = () => {

    const [pending, setPending]: [Counselors[], (counselors: Counselors[]) => void] = React.useState(defaultCounselors);
    const [data, setData]: [Counselors[], (counselors: Counselors[]) => void] = React.useState(allCounselors);
    const [archive, setArchive]: [Counselors[], (counselors: Counselors[]) => void] = React.useState(archviedCounselors);

    React.useEffect(() => {

        AuthService.getPendingCounselors().then(r => setPending(r.data))
        AuthService.getAllCounselors().then(response => setData(response.data))
        AuthService.getArchivedCounselors().then(responses => setArchive(responses.data))
    }, []);



    const handleAccept = (id:number) => {
        AuthService.changeCounselorActive(id).catch()
        window.location.reload();
        //AuthService.getAllCounselors().then(response => setData(response.data))
        //AuthService.getArchivedCounselors().then(responses => setArchive(responses.data))
    }

    const handleArchive = (id:number) => {
        AuthService.changeCounselorArchive(id).catch()
        window.location.reload();


    }

    const handleDeny = (id:number) => {
        AuthService.deleteCounselor(id).catch()
        window.location.reload();


    }

    return (
        <body>
        <Container className="Admin-Buttons">
            <Button variant="primary" className="backButton" href="/#/admin/"> Back </Button><br /><br />
            <h3> Manage Counselors </h3>
            <h6> View pending accounts and list all counselors. </h6><br /><br />

            <h5> Pending Accounts </h5>

            <div className="overflowTable">

                <table className={"manageTable"}>

                    <tr>
                        <td> Last Name </td>
                        <td> First Name </td>
                        <td> Email </td>
                        <td> Options </td>
                    </tr>
                    {pending.map(item => (

                        <tr>
                            <td> {item.lastName} </td>
                            <td>{item.firstName} </td>
                            <td> {item.email}  </td>
                            <td> <Button variant="success" onClick={()=>handleAccept(item.id)}>Approve</Button> &nbsp;
                                <Button variant="danger" onClick={()=>handleDeny(item.id)}>Deny</Button> </td>
                        </tr>
                    ))}

                </table>
            </div>

            <br /><br />

            <h5> Active Counselors </h5>

            <div className="overflowTable">
                <table className={"manageTable"}>
                    <tr>
                        <td> Last Name </td>
                        <td> First Name </td>
                        <td> Group </td>
                        <td> Status </td>
                        <td> Options </td>
                    </tr>
                    {data.map(item => (

                        <tr>
                            <td> {item.lastName} </td>
                            <td>{item.firstName} </td>
                            <td> {item.email}  </td>
                            <td> Active </td>
                            <td> <Button variant="secondary" onClick={()=>handleArchive(item.id)}>Deactivate</Button> </td>
                        </tr>
                    ))}
                </table>
            </div>

            <br /><br />

            <h5> Inactive Counselors </h5>

            <div className="overflowTable">
                <table className={"manageTable"}>
                    <tr>
                        <td> Last Name </td>
                        <td> First Name </td>
                        <td> Group </td>
                        <td> Status </td>
                        <td> Options </td>
                    </tr>
                    {archive.map(item => (

                        <tr>
                            <td> {item.lastName} </td>
                            <td>{item.firstName} </td>
                            <td> {item.email}  </td>
                            <td> Inactive </td>
                            <td> <Button variant="success"  onClick={()=>handleAccept(item.id)}> Activate </Button> </td>
                        </tr>
                    ))}
                </table>
            </div>

            <br /><br />


        </Container>
        </body>
    )

}

export default ManageCounselors;
