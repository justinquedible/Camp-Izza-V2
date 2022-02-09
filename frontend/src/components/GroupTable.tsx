// Component used in Parent.tsx to display a list of campers of a parent

import "../Dashboard.css";
import * as React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { Group } from "../models/models";
import axios from "axios";

// NOTE: id properties are the id of the registered_counselor_week and registered_camper_week
interface props {
  group: Group;
  counselors: { id: number; firstName: string; lastName: string }[];
  campers: { id: number; firstName: string; lastName: string; grade: number; gender: string }[];
  mutable?: boolean;
}

const GroupTable: React.FC<props> = ({ group, counselors, campers, mutable = false }) => {
  const removeCounselor = () => {};

  return (
    <Row>
      <Col>
        <div className="grid-item">
          <h5>{group.name}</h5>
          <h6>
            <Row className="counselor-row">
              <p className="counselor-title">Counselors:</p>
              {counselors.map((item) => (
                <div key={item.id}>
                  {"  "}
                  {mutable ? (
                    <Button variant="outline-danger" onClick={removeCounselor}>
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
                  <td>
                    {mutable && <Button variant="outline-danger">🗑️</Button>} {item.firstName} {item.lastName}
                  </td>
                  <td>{item.grade !== 0 ? item.grade : "K"}</td>
                  <td>{item.gender}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
      {mutable && (
        <Col xs="auto">
          <br />
          <br />
          <br />
          <Button variant="outline-primary"> + Assign Counselor </Button>
          <br />
          <br />
          <Button variant="primary"> + Assign Camper </Button>
        </Col>
      )}
    </Row>
  );
};

export default GroupTable;
