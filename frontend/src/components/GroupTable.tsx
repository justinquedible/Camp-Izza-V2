// Component used in Parent.tsx to display a list of campers of a parent

import "../Dashboard.css";
import * as React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { Group, Registered_Counselor_WeekWithCounselor, Registered_Camper_WeekWithCamper } from "../models/models";

// NOTE: id values of counselors and campers are the id of their respective registered_counselor_week and
// registered_camper_week
interface props {
  group: Group;
  counselors: Registered_Counselor_WeekWithCounselor[];
  campers: Registered_Camper_WeekWithCamper[];
  mutable?: boolean;
  onRemoveCounselorClick: (id: number) => void;
  onRemoveCamperClick: (item: Registered_Camper_WeekWithCamper) => void;
}

const GroupTable: React.FC<props> = ({
  group,
  counselors,
  campers,
  mutable = false,
  onRemoveCounselorClick,
  onRemoveCamperClick,
}) => {
  return (
    <div className="grid-item">
      <h5>{group.name}</h5>
      <h6>
        <Row className="counselor-row">
          <p className="counselor-title">Counselors:</p>
          {counselors.map((item) => (
            <div key={item.id}>
              {"  "}
              {mutable ? (
                <Button variant="outline-danger" onClick={() => onRemoveCounselorClick(item.id)}>
                  🗑️ {item.firstName} {item.lastName}
                </Button>
              ) : (
                <u>
                  {item.firstName} {item.lastName},
                </u>
              )}
            </div>
          ))}
        </Row>
      </h6>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {campers.map((item) => (
            <tr key={item.id}>
              {/* Show numbers for campers */}
              <td>
                {mutable && (
                  <Button variant="outline-danger" onClick={() => onRemoveCamperClick(item)}>
                    🗑️
                  </Button>
                )}{" "}
                {item.firstName} {item.lastName}
              </td>
              <td>{item.grade !== 0 ? item.grade : "K"}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GroupTable;
