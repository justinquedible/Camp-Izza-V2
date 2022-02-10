// Component used in Parent.tsx to display a list of campers of a parent

import * as React from "react";
import { Card, CardColumns, Row } from "react-bootstrap";
import { Camper } from "../models/models";

interface props {
  campers: Camper[];
  type?: string;
}

const Campers: React.FC<props> = ({ campers, type = "parent" }) => {
  const handleCamperClick = (id: number) => {
    sessionStorage.setItem("camper_id", id.toString());
  };

  return (
    <CardColumns>
      {campers.map((camper) => (
        <Card key={camper.id} border="success" style={{ width: "90%" }}>
          <Card.Body>
            <Card.Title>
              {camper.firstName} {camper.lastName}
            </Card.Title>
            {type === "parent" ? (
              <div>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperForm">
                  📝 Info
                </Card.Link>
                <br />
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
                  📅 Scheduling
                </Card.Link>
              </div>
            ) : (
              <Row style={{ marginLeft: "20%" }}>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperForm">
                  ℹ️
                </Card.Link>
                <br />
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
                  📖
                </Card.Link>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
                  📆
                </Card.Link>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
                  📝
                </Card.Link>
              </Row>
            )}
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
};

export default Campers;
