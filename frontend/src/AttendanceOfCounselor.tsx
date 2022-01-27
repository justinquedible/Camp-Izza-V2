import React from "react";
import AdminService from "./services/admin-service";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { visitLexicalEnvironment } from "typescript";

interface AdminAttendanceProps {}

export const AttendaceOfCounselor: React.FC<AdminAttendanceProps> = () => {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const terms = ["Fall 2019", "Winter 2019", "Spring 2019", "Summer 2019"];

  const [term, setTerm] = React.useState("Select Term");

  React.useEffect(() => {
    renderTermDropdown();

    AdminService.getAllCounselors().then((response) => {
      if (response.status === 200) {
        let counselors = response.data;
        // TODO: get individual counselor
        if (counselors.length > 0) {
          let table = document.getElementById("attendanceTable") as HTMLTableElement;

          renderDays();

          // TODO: Add real camp weeks to table
          for (let w of weeks.reverse()) {
            let row = table.insertRow(1);
            row.insertCell(0).innerHTML = w;
            for (let col = 1; col < 6; col++) {
              // TODO:Add actual attendance to each row and make it colored if its P or A
              row.insertCell(col).innerHTML = "P";
            }
          }
        }
      } else if (response.status === 400) {
        return false;
      }
    });
  }, []);

  const renderTermDropdown = () => {
    let dropdown = document.getElementById("termDropdown");
    if (dropdown) {
      let htmlarray = [];
      for (let t of terms) {
        htmlarray.push(`<option value="${t}">${t}</option>`);
      }
      dropdown.innerHTML = htmlarray.join("");
    }
  };

  const renderAttendanceDropdown = () => {
    return (
      <select name="attendance" id="attendanceDropdown" style={{ textAlign: "center" }}>
        <option value="-">-</option>
        <option style={{ color: "#3E9724" }} value="P">
          P
        </option>
        <option style={{ color: "#C80000" }} value="A">
          A
        </option>
      </select>
    );
  };

  const renderDays = () => {
    let table = document.getElementById("attendanceTable") as HTMLTableElement;
    let row = table.insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML = "Week";
    cell.style.fontWeight = "bold";
    let days = ["M", "T", "W", "Th", "F"];
    for (let d of days.reverse()) {
      let cell = row.insertCell(1);
      cell.innerHTML = d;
      cell.style.fontWeight = "bold";
    }
  };

  return (
    <body>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ marginLeft: "2.5%" }}>
        <Button variant="primary" className="backButton" href="/#/counselor">
          Back to Dashboard
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>My Attendance</h1>
        <select name="term" id="termDropdown" style={{ width: "12%", textAlign: "center" }}>
          {" "}
        </select>

        <br />
      </div>
      <div style={{ marginLeft: "10%" }}>
        <p>
          {" "}
          <span style={{ color: "#3E9724" }}>P </span> = Present
        </p>
        <p>
          {" "}
          <span style={{ color: "#C80000" }}>A </span> = Absent
        </p>
      </div>

      <div style={{ marginLeft: "20%", marginRight: "20%" }}>
        <table id="attendanceTable"></table>
      </div>
    </body>
  );
};

export default AttendaceOfCounselor;
