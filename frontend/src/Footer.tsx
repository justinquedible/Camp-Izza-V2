import "./Footer.css";
import React from "react";
import { Container, Row } from "react-bootstrap";

const FooterInstance = (
  <div className="footer">
    <Container fluid>
      <Row>
        <div className="textbox">
          <Container fluid className="mainText">
            Camp Izza is a 501 (c)(3) non-profit organization registered in the state of California with federal tax ID
            #26-2174441.
          </Container>
          <Container fluid>
            PO Box 50326, Irvine CA, 92690 • (949) 422-8123
            <br /> © 2022 Camp Izza
          </Container>
        </div>
      </Row>
    </Container>
  </div>
);

export default FooterInstance;
