// Page for admin to view groups and add/remove campers/counselors to groups

import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import "./Dashboard.css";
import CamperService from "./services/camper-service";
import AuthService from "./services/auth-service";
import axios from "axios";

interface Props {}

interface ICampers {
  firstName: string;
  group: string;
  lastName: string;
  id: number;
}

const camperArray: ICampers[] = [];

export const Groups: React.FC<Props> = () => {
  const [showAll, setAll] = React.useState(true);
  const [showDates, setDates] = React.useState(false);
  const [showCoconuts, setCoconuts] = React.useState(false);
  const [showTrees, setTrees] = React.useState(false);
  const [showLeaders, setLeaders] = React.useState(false);
  const [showList1, setList1] = React.useState(camperArray); // Used for group 1
  const [showList15, setList15] = React.useState(camperArray); // Used for group 1
  const [showList2, setList2] = React.useState(camperArray); // Used for group 2
  const [showList25, setList25] = React.useState(camperArray); // Used for group 2
  const [showList8, setList8] = React.useState(camperArray); // Used for group 1 Counselors
  const [showList9, setList9] = React.useState(camperArray); // Used for group 2 Counselors
  const [showList3, setList3] = React.useState(camperArray); // Used for unassigned campers or counselors
  const [showList4, setList4] = React.useState(camperArray); // These and below used for all groups
  const [showList5, setList5] = React.useState(camperArray);
  const [showList55, setList55] = React.useState(camperArray);
  const [showList6, setList6] = React.useState(camperArray);
  const [showList65, setList65] = React.useState(camperArray);
  const [showList7, setList7] = React.useState(camperArray);
  const [showList75, setList75] = React.useState(camperArray);
  const [showSelected, setSelected] = React.useState("none");
  const [showNum, setNum] = React.useState(0);

  const [showPopup, setPopup] = React.useState(false);
  const [showCounselorPopup, setCounselorPopup] = React.useState(false);

  React.useEffect(() => {
    handleAll();
  }, []);

  const handleClose = () => {
    setPopup(false);
  };

  const handleCounselorClose = () => {
    setCounselorPopup(false);
  };

  const assignCamper = (id: number) => {
    let group = showSelected;

    CamperService.assignGroup(id, showSelected + showNum).then((response) => {
      handleClose();
      eval("handle" + group[0].toUpperCase() + group.substring(1) + "();");
    });
  };

  const assignCounselor = (id: number) => {
    let group = showSelected;

    AuthService.assignGroup(id, showSelected + showNum).then((response) => {
      handleCounselorClose();
      eval("handle" + group[0].toUpperCase() + group.substring(1) + "();");
    });
  };

  const removeCounselor = (id: number) => {
    let group = showSelected;
    AuthService.assignGroup(id, "none").then((response) => {
      eval("handle" + group[0].toUpperCase() + group.substring(1) + "();");
    });
  };

  const removeCamper = (id: number) => {
    let group = showSelected;
    CamperService.assignGroup(id, "none").then((response) => {
      eval("handle" + group[0].toUpperCase() + group.substring(1) + "();");
    });
  };

  const Popup = () => (
    <div>
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Unassigned Campers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {showList3.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="success" size={"sm"} onClick={() => assignCamper(item.id)}>
                  {" "}
                  Assign{" "}
                </Button>
              </li>
            ))}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  const handlePopup = (list: number) => {
    CamperService.getGroupInfo("none").then((response) => {
      setList3(response.data);
    });
    setNum(list);

    setPopup(true);
  };

  const CounselorPopup = () => (
    <div>
      <Modal show={showCounselorPopup} onHide={handleCounselorClose}>
        <Modal.Header closeButton>
          <Modal.Title>Unassigned Counselors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {showList3.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="success" size={"sm"} onClick={() => assignCounselor(item.id)}>
                  {" "}
                  Assign{" "}
                </Button>
              </li>
            ))}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCounselorClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  const handleCounselorPopup = (list: number) => {
    AuthService.getGroupInfo("none").then((response) => {
      setList3(response.data);
    });
    setNum(list);

    setCounselorPopup(true);
  };

  const All = () => (
    <div>
      <h4> 👥 All Groups 👥</h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Dates 1
          <ul>
            {showList15.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList1.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
        <div className={"column groupBox"}>
          Dates 2
          <ul>
            {showList25.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList2.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className={"row"}>
        <div className={"column groupBox"}>
          Coconuts 1
          <ul>
            {showList8.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList3.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
        <div className={"column groupBox"}>
          Coconuts 2
          <ul>
            {showList9.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList4.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className={"row"}>
        <div className={"column groupBox"}>
          Trees 1
          <ul>
            {showList55.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList5.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
        <div className={"column groupBox"}>
          Trees 2
          <ul>
            {showList65.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList6.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className={"row"}>
        <div className={"column groupBox"}>
          Young Leaders
          <ul>
            {showList75.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ul>
          <ol>
            {showList7.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );

  const handleAll = () => {
    AuthService.getGroupInfo("dates1").then((response) => {
      setList15(response.data);
    });
    CamperService.getGroupInfo("dates1").then((response) => {
      setList1(response.data);
    });
    AuthService.getGroupInfo("dates2").then((response) => {
      setList25(response.data);
    });
    CamperService.getGroupInfo("dates2").then((response) => {
      setList2(response.data);
    });
    AuthService.getGroupInfo("coconuts1").then((response) => {
      setList8(response.data);
    });
    CamperService.getGroupInfo("coconuts1").then((response) => {
      setList3(response.data);
    });
    AuthService.getGroupInfo("coconuts2").then((response) => {
      setList9(response.data);
    });
    CamperService.getGroupInfo("coconuts2").then((response) => {
      setList4(response.data);
    });
    AuthService.getGroupInfo("trees1").then((response) => {
      setList55(response.data);
    });
    CamperService.getGroupInfo("trees1").then((response) => {
      setList5(response.data);
    });
    AuthService.getGroupInfo("trees2").then((response) => {
      setList65(response.data);
    });
    CamperService.getGroupInfo("trees2").then((response) => {
      setList6(response.data);
    });
    AuthService.getGroupInfo("leaders1").then((response) => {
      setList75(response.data);
    });
    CamperService.getGroupInfo("leaders1").then((response) => {
      setList7(response.data);
    });

    setAll(true);
    setDates(false);
    setCoconuts(false);
    setTrees(false);
    setLeaders(false);
  };

  const Dates = () => (
    <div>
      <h4> ✏️ Edit Group: Dates 1 </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList8.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList1.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(1)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(1)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
      <br />
      <br />
      <h4> ✏️ Edit Group: Dates 2 </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList9.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList2.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(2)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(2)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
    </div>
  );

  const handleDates = () => {
    CamperService.getGroupInfo("dates1").then((response) => {
      setList1(response.data);
    });
    CamperService.getGroupInfo("dates2").then((response) => {
      setList2(response.data);
    });
    AuthService.getGroupInfo("dates1").then((response) => {
      setList8(response.data);
    });
    AuthService.getGroupInfo("dates2").then((response) => {
      setList9(response.data);
    });
    setSelected("dates");
    setDates(true);
    setAll(false);
    setCoconuts(false);
    setTrees(false);
    setLeaders(false);
  };

  const Coconuts = () => (
    <div>
      <h4> ✏️ Edit Group: Coconuts 1 </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList8.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList1.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(1)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(1)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
      <br />
      <br />
      <h4> ✏️ Edit Group: Coconuts 2 </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList9.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList2.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(2)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(2)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
    </div>
  );

  const handleCoconuts = () => {
    CamperService.getGroupInfo("coconuts1").then((response) => {
      setList1(response.data);
    });
    CamperService.getGroupInfo("coconuts2").then((response) => {
      setList2(response.data);
    });
    AuthService.getGroupInfo("coconuts1").then((response) => {
      setList8(response.data);
    });
    AuthService.getGroupInfo("coconuts2").then((response) => {
      setList9(response.data);
    });
    setSelected("coconuts");
    setCoconuts(true);
    setDates(false);
    setAll(false);
    setTrees(false);
    setLeaders(false);
  };

  const Trees = () => (
    <div>
      <h4> ✏️ Edit Group: Trees 1 </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList8.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList1.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(1)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(1)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
      <br />
      <br />
      <h4> ✏️ Edit Group: Trees 2 </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList9.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList2.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(2)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(2)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
    </div>
  );

  const handleTrees = () => {
    CamperService.getGroupInfo("trees1").then((response) => {
      setList1(response.data);
    });
    CamperService.getGroupInfo("trees2").then((response) => {
      setList2(response.data);
    });
    AuthService.getGroupInfo("trees1").then((response) => {
      setList8(response.data);
    });
    AuthService.getGroupInfo("trees2").then((response) => {
      setList9(response.data);
    });
    setSelected("trees");
    setTrees(true);
    setDates(false);
    setAll(false);
    setCoconuts(false);
    setLeaders(false);
  };

  const Leaders = () => (
    <div>
      <h4> ✏️ Edit Group: Young Leaders </h4>
      <br />
      <div className={"row"}>
        <div className={"column groupBox"}>
          Members
          <ul>
            {showList8.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCounselor(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ul>
          <ol>
            {showList1.map((item) => (
              <li>
                {" "}
                {item.firstName} {item.lastName} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeCamper(item.id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"column"}>
          <Button variant="primary" onClick={() => handlePopup(1)}>
            {" "}
            + Assign Camper{" "}
          </Button>
          <br />
          <br />
          <Button variant="outline-primary" onClick={() => handleCounselorPopup(1)}>
            {" "}
            + Assign Counselor{" "}
          </Button>
        </div>
      </div>
    </div>
  );

  const handleLeaders = () => {
    CamperService.getGroupInfo("leaders1").then((response) => {
      setList1(response.data);
    });
    AuthService.getGroupInfo("leaders1").then((response) => {
      setList8(response.data);
    });

    setSelected("leaders");
    setLeaders(true);
    setDates(false);
    setAll(false);
    setCoconuts(false);
    setTrees(false);
  };

  return (
    <body>
      <Container className="Admin-Buttons">
        <Button variant="primary" className="backButton" href="/#/admin">
          {" "}
          Back{" "}
        </Button>
        <br />
        <br />
        <h3> Groups </h3>
        <div className={"buttonToggle"}>
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
        </div>
      </Container>
    </body>
  );
};
export default Groups;
