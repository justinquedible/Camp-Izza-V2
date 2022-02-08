import React from "react";
import { Container, Button, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { Camp_Week } from "./models/models";

export default function Groups() {
  const [weeks, setWeeks] = React.useState<Camp_Week[]>([]);

  React.useEffect(() => {
    (async () => {
      await axios.get(process.env.REACT_APP_API + "/api/camp_weeks/getCamp_Weeks").then((res) => {
        setWeeks(res.data);
      });
    })();
  }, []);

  return (
    <Container className="Admin-Buttons">
      <Button variant="primary" className="backButton" href="/#/admin">
        Back
      </Button>
      <br />
      <br />
      <h3> Groups </h3>
      <DropdownButton id="dropdown-item-button" title="Week">
        <Dropdown.Item as="button">Week 1</Dropdown.Item>
      </DropdownButton>
      {/* <div className={"buttonToggle"}>
        <Button variant="dark" className={"groupBtn"} onClick={handleAll}>
          {" "}
          ALL{" "}
        </Button>
        <Button variant="success" className={"groupBtn"} onClick={handleDates}>
          {" "}
          Dates{" "}
        </Button>
        <Button variant="warning" className={"groupBtn"} onClick={handleCoconuts}>
          {" "}
          Coconuts{" "}
        </Button>
        <Button variant="danger" className={"groupBtn"} onClick={handleTrees}>
          {" "}
          Trees{" "}
        </Button>
        <Button variant="info" className={"groupBtn"} onClick={handleLeaders}>
          {" "}
          Young Leaders{" "}
        </Button>
        {showAll ? <All /> : null}
        {showDates ? <Dates /> : null}
        {showCoconuts ? <Coconuts /> : null}
        {showTrees ? <Trees /> : null}
        {showLeaders ? <Leaders /> : null}
        {showPopup ? <Popup /> : null}
        {showCounselorPopup ? <CounselorPopup /> : null}
      </div> */}
    </Container>
  );
}
