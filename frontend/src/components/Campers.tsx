// Component used in Parent.tsx to display a list of campers of a parent

import { Card, Row } from "react-bootstrap";

interface props {
  campers: { id: number; firstName: string; lastName: string }[];
  type?: string;
}

const Campers: React.FC<props> = ({ campers, type = "parent" }) => {
  const windowWidth = window.innerWidth;
  const cardPerRow = windowWidth > 1000 ? "4" : windowWidth > 700 ? "2" : "1";

  const handleCamperClick = (id: number) => {
    sessionStorage.setItem("camper_id", id.toString());
  };

  const handleCamperClickEmergencyForm = (id: number) => {
    sessionStorage.setItem("camper_id", [id.toString()].join(","));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${type === "parent" ? "1" : cardPerRow}, minmax(0, 1fr))`,
      }}
    >
      {campers.map((camper) => (
        <Card key={camper.id} border="success" style={{ width: "auto", margin: "15px" }}>
          <Card.Body>
            <Card.Title>
              {camper.firstName} {camper.lastName}
            </Card.Title>
            {type === "parent" ? (
              <div>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperForm">
                  👤 Info
                </Card.Link>
                <br />
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
                  📅 Edit/View Registration
                </Card.Link>
                <br />
                <Card.Link onClick={() => handleCamperClickEmergencyForm(camper.id)} href="/#/parent/emergencyForm">
                  📝 Emergency Form
                </Card.Link>
              </div>
            ) : (
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/admin/camperForm">
                  👤
                </Card.Link>
                <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/admin/camperScheduling">
                  📖
                </Card.Link>
                {/* <Card.Link onClick={() => handleCamperClick(camper.id)} href="/#/parent/camperScheduling">
                  📆
                </Card.Link> */}
                <Card.Link onClick={() => handleCamperClickEmergencyForm(camper.id)} href="/#/admin/emergencyForm">
                  📝
                </Card.Link>
              </Row>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Campers;
