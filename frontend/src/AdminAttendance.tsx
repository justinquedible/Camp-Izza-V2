// import React from "react";
// import AdminService from "./services/admin-service";
// import { Button, DropdownButton, Dropdown } from "react-bootstrap";
// import { visitLexicalEnvironment } from "typescript";

// interface AdminAttendanceProps {}

export default function AdminAttendance() {
  //   const dates = ["7/1", "7/2", "7/3", "7/4", "7/5"];
  //   const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"];
  //   const terms = ["Fall 2019", "Winter 2019", "Spring 2019", "Summer 2019"];
  //   const [term, setTerm] = React.useState("Select Term");
  //   React.useEffect(() => {
  //     renderTermDropdown();
  //     renderWeekDropdown();
  //     AdminService.getAllCounselors().then((response) => {
  //       if (response.status === 200) {
  //         let counselors = response.data;
  //         if (counselors.length > 0) {
  //           let table = document.getElementById("attendanceTable") as HTMLTableElement;
  //           // Add dropdown menus above days
  //           //   renderDropdownRow();
  //           renderDays();
  //           // TODO: Add weeks to dropdown button
  //           // let weeksDropdown = document.getElementById("weeksDropdown");
  //           // let htmlarray = [];
  //           // if (weeksDropdown) {
  //           //   for (let w of weeks) {
  //           //     let node: Node = <Dropdown.Item onClick={}>{w}</Dropdown.Item>;
  //           //     //   htmlString += `<Dropdown.Item onClick={}>{${w}}</Dropdown.Item>`;
  //           //     weeksDropdown.appendChild(node);
  //           //     // htmlarray.push("<option>" + w + "</option>");
  //           //   }
  //           // }
  //           // weeksDropdown.innerHTML = htmlString;
  //           // let weeksDropdown = document.getElementById("weeksDropdown");
  //           // if (weeksDropdown) {
  //           //   weeksDropdown.innerHTML = htmlarray.join("");
  //           // }
  //           // }
  //           // let week = weeksDropdown.value;
  //           //   for (let w of weeks) {
  //           //     // let option = document.createElement("option");
  //           //     // option.value = w;
  //           //     // option.text = w;
  //           //     // weeksDropdown.appendChild(option);
  //           //   }
  //           // Adding dates to table
  //           let row = table.insertRow(2);
  //           row.style.backgroundColor = "#F2F2F2";
  //           row.insertCell(0);
  //           dates.reverse();
  //           for (let d of dates) {
  //             let cell = row.insertCell(1);
  //             cell.innerHTML = d;
  //           }
  //           // Adding counselors to table
  //           for (let c of counselors) {
  //             let row = table.insertRow(3);
  //             row.insertCell(0).innerHTML = c.firstName + " " + c.lastName;
  //             for (let col = 1; col < 6; col++) {
  //               row.insertCell(col).innerHTML = "<input type='text'>";
  //             }
  //           }
  //         }
  //       } else if (response.status === 400) {
  //         return false;
  //       }
  //     });
  //   }, []);
  //   const renderTermDropdown = () => {
  //     let dropdown = document.getElementById("termDropdown");
  //     if (dropdown) {
  //       let htmlarray = [];
  //       for (let t of terms) {
  //         htmlarray.push(`<option value="${t}">${t}</option>`);
  //       }
  //       dropdown.innerHTML = htmlarray.join("");
  //     }
  //   };
  //   const renderWeekDropdown = () => {
  //     let dropdown = document.getElementById("weeksDropdown");
  //     if (dropdown) {
  //       let htmlarray = [];
  //       for (let w of weeks) {
  //         htmlarray.push(`<option value="${w}">${w}</option>`);
  //       }
  //       dropdown.innerHTML = htmlarray.join("");
  //     }
  //   };
  //   const renderAttendanceDropdown = () => {
  //     return (
  //       <select name="attendance" id="attendanceDropdown" style={{ textAlign: "center" }}>
  //         <option value="-">-</option>
  //         <option style={{ color: "#3E9724" }} value="P">
  //           P
  //         </option>
  //         <option style={{ color: "#C80000" }} value="A">
  //           A
  //         </option>
  //       </select>
  //     );
  //   };
  //   const renderDays = () => {
  //     let table = document.getElementById("attendanceTable") as HTMLTableElement;
  //     let row = table.insertRow(1);
  //     let cell = row.insertCell(0);
  //     cell.innerHTML = "Name";
  //     cell.style.fontWeight = "bold";
  //     let days = ["M", "T", "W", "Th", "F"];
  //     for (let d of days.reverse()) {
  //       let cell = row.insertCell(1);
  //       cell.innerHTML = d;
  //       cell.style.fontWeight = "bold";
  //     }
  //   };
  //   // const renderWeeks = () => {
  //   //   let weeksDropdown = document.getElementById(
  //   //     "weeksDropdown"
  //   //   ) as DropdownButton;
  //   // const renderCell = () = {
  //   //     return <div> <p>-</p> </div>;
  //   // }
  //   return (
  //     <body>
  //       <br />
  //       <br />
  //       <br />
  //       <br />
  //       <br />
  //       <br />
  //       <div style={{ marginLeft: "2.5%" }}>
  //         <Button variant="primary" className="backButton" href="/#/admin">
  //           {" "}
  //           Back to Dashboard{" "}
  //         </Button>
  //       </div>
  //       <div style={{ textAlign: "center" }}>
  //         <h1>Counselor Attendance Report</h1>
  //         {/* <DropdownButton title={term}>
  //           <Dropdown.Item title={"Summer"} onClick={() => {}}>
  //             Summer 2019
  //           </Dropdown.Item>
  //         </DropdownButton> */}
  //         <select name="term" id="termDropdown" style={{ width: "12%", textAlign: "center" }}>
  //           {" "}
  //         </select>
  //         {/* <option value="Select Term">Select Term</option> */}
  //         <br />
  //         <select name="weeks" id="weeksDropdown" style={{ width: "12%", textAlign: "center" }}>
  //           {" "}
  //         </select>
  //         {/* <DropdownButton title={"Select Weeks"} id="weeksDropdown">
  //           <Dropdown.Item onClick={() => {}}>Week 1</Dropdown.Item>
  //           <Dropdown.Item onClick={() => {}}>Week 2</Dropdown.Item>
  //         </DropdownButton> */}
  //       </div>
  //       <div style={{ marginLeft: "10%" }}>
  //         <p>
  //           {" "}
  //           <span style={{ color: "#3E9724" }}>P </span> = Present
  //         </p>
  //         <p>
  //           {" "}
  //           <span style={{ color: "#C80000" }}>A </span> = Absent
  //         </p>
  //       </div>
  //       <div style={{ marginLeft: "20%", marginRight: "20%" }}>
  //         <table id="attendanceTable">
  //           <tr>
  //             <td></td>
  //             <td>{renderAttendanceDropdown()}</td>
  //             <td>{renderAttendanceDropdown()}</td>
  //             <td>{renderAttendanceDropdown()}</td>
  //             <td>{renderAttendanceDropdown()}</td>
  //             <td>{renderAttendanceDropdown()}</td>
  //           </tr>
  //           {/* <tr>
  //             <td style={{ fontWeight: "bold" }}>Name</td>
  //             <td style={{ fontWeight: "bold" }}>M</td>
  //             <td style={{ fontWeight: "bold" }}>T</td>
  //             <td style={{ fontWeight: "bold" }}>W</td>
  //             <td style={{ fontWeight: "bold" }}>Th</td>
  //             <td style={{ fontWeight: "bold" }}>F</td>
  //           </tr> */}
  //           {/* <tr style={{ backgroundColor: "#F2F2F2" }}>
  //             <td></td>
  //             <td>7/1</td>
  //             <td>7/2</td>
  //             <td>7/3</td>
  //             <td>7/4</td>
  //             <td>7/5</td>
  //           </tr> */}
  //         </table>
  //       </div>
  //     </body>
  //   );
}
