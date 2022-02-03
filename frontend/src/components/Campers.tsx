// Component used in Parent.tsx to display a list of campers of a parent

import * as React from "react";
import { Card, CardColumns } from "react-bootstrap";

interface camper {
  id: number;
  firstName: string;
  lastName: string;
}

interface props {
  campers: camper[];
}

const Campers: React.FC<props> = ({ campers }) => {
  function handleCamperClick(id: number) {
    sessionStorage.setItem("camper_id", id.toString());
  }

  return (
    <CardColumns>
      {campers.map((camper) => (
        <Card key={camper.id} border="success" style={{ width: "80%" }}>
          <Card.Body>
            <Card.Title>{camper.firstName}</Card.Title>
            <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperForm">
              📝 Info
            </Card.Link>
            <br />
            <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
              📅 Scheduling
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
};

export default Campers;
