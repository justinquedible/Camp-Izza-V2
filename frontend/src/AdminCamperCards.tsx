// Component that is unused but imported in ManageCampers page

import {Button, Card, CardDeck, Container} from "react-bootstrap";
import React from "react";
import AdminService from './services/admin-service';

interface CamperProps {
    firstName: string,
    lastName: string

}

const defaultCampers: CamperProps[] = [];

export const AdminCamperCards: (year: number) => JSX.Element = (year:number) => {
    const [data, setData]: [CamperProps[], (campers: CamperProps[]) => void] = React.useState(defaultCampers);

    // React.useEffect(() => {
    //     AdminService.getCampers(2021).then((response: { data: CamperProps[]; }) => {
    //         setData(response.data);
    //     });
    // },[]);

    return (
        <CardDeck>
            {

                data.map(item => (

                    <Card style={{width: '80%', display: 'block'}}>
                        <Card.Body>
                            <div className="row">
                                <div className="column">
                                    <h2> {item.firstName} </h2><br/>
                                    <p>Schedule</p>
                                    <table className={"manageTable"}>
                                        <tr>
                                            <td>Week 1:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 2:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 3:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 4:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 5:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 6:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 7:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 8:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 9:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                        <tr>
                                            <td>Week 10:</td>
                                            <td>Not Registered</td>
                                        </tr>
                                    </table>
                                    <br/>
                                    <Button variant={"success"}> Edit Scheduling </Button>
                                </div>
                                <div className="column"><br/>
                                    <p className={'group'}>Group: Coconuts</p>
                                    <a className={'blue'}>Attendance Report</a><br/>
                                    <a className={'red'}>Emergency Forms</a><br/><br/>
                                    Amount Paid: $0.00<br/>
                                    Credit: $0.00<br/>
                                    <input type={"text"} placeholder={"Update Credit"} className={"resizeCredit"}/>
                                    <Button className={"resizeCredit"}>Submit</Button><br/><br/>
                                    <a className={'blue'}>Go to camper info →</a>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>


                ))
            }

        </CardDeck>
    )

}