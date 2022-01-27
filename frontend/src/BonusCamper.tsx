// Page for bonus campers, not used anywhere
// Not sure what this page does yet

import React from 'react';
import {Button, Container} from "react-bootstrap";
import './Dashboard.css';

interface Props {
}

export const BonusCamper: React.FC<Props> = () => {
    const [showMerge, setMerge] = React.useState(false);
    const [showDelete, setDelete] = React.useState(false);

    const MergeOptions = () =>
        <div> <p>Select an existing camper to merge the bonus camper with:</p><br />
            <form>
                <div className={"sameLineForm"}>
                    <input type="radio" name="choice" value="yes" className={"sameLineForm"} />
                    Camper Name 1
                </div>
                <div className={"sameLineForm"}>
                    <input type="radio" name="choice" value="yes" className={"sameLineForm"} />
                    Camper Name 2
                </div><br />
                <div className="center"><Button variant="success" href={"/#/camperform"}> Submit </Button></div>
            </form>
        </div>

    const handleMerge = () => {
        setMerge(true);
        setDelete(false);
    }

    const DeleteOptions = () =>
        <div className="form-popup">
            <form className="form-container center">
                <p> Are you sure you want to delete this camper? </p>
                <Button variant="danger" className="formBtn" type="submit">Delete</Button>
            </form>
        </div>

    const handleDelete = () => {
        setMerge(false);
        setDelete(true)
    }

    return (
        <body>
        <Container className="Admin-Buttons">
            <Button variant="primary" className="backButton" href="/#/admin/attendance"> Back </Button><br /><br />
            <h3> Manage Bonus Camper: [Name] </h3><br />

            <h5 className={"buttonToggle"}>Attendance Record</h5>
            <table className={"buttonToggle attendanceTable"}>
                <tr>
                    <th>Date</th>
                    <th>Attendance</th>
                </tr>
                <tr>
                    <td>6/1</td>
                    <td>Full</td>
                </tr>
            </table><br />

            <div className={"buttonToggle"}>
                <Button variant="success" className={"groupBtn"} onClick={handleMerge}> Merge </Button>
                <Button variant="danger" className={"groupBtn"} onClick={handleDelete}> Delete </Button>
                <br />
                {showMerge ? <MergeOptions />: null}
                {showDelete ? <DeleteOptions />: null}
            </div>
        </Container>
        </body>
    )

}

export default BonusCamper;
