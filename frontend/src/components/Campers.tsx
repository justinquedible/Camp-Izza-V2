// Component used in Parent.tsx to display a list of campers of a parent

import * as React from "react";
import { Card, CardColumns } from "react-bootstrap";
import { Camper } from "../models/models";

interface props {
  campers: Camper[];
}

const Campers: React.FC<props> = ({ campers }) => {
  const handleCamperClick = (id: number) => {
    sessionStorage.setItem("camper_id", id.toString());
  };

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
