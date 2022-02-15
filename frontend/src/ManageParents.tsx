// Page for admin to view, approve, deny, and activate counselors

import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import { Parent, Camper } from "./models/models";
import axios from "axios";

export default function ManageParents() {
  const history = useHistory();
  const [parents, setParents] = React.useState<Parent[]>([]);
  const [campers, setCampers] = React.useState<Camper[]>([]);

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "api/parents/getParents").then((res) => {
        setParents(res.data);
      });
      await axios.get(process.env.REACT_APP_API + "api/campers/getCampers").then((res) => {
        setCampers(res.data);
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
      <br />
      <br />
      <h3> Manage Parents </h3>
      <br />
      <br />
      <div className="overflowTable">
        <Table className={"manageTable"}>
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
    </Container>
  );
}
