// // Page that is unused because it is already integrated in NewManageCampers.tsx

// import React from "react";
// import { Button, Card, Container } from "react-bootstrap";
// import "./Dashboard.css";
// import AdminService from "./services/admin-service";

// // Attendance Report given a camper name and yar

// interface Props {}

export default function AttendanceReport() {
  //   const [data, setData] = React.useState([]);
  //   React.useEffect(() => {
  //     let camper = localStorage.getItem("currentChildID");
  //     let year = localStorage.getItem("currentYear");
  //     AdminService.getAttendanceReport(camper, year).then((response) => {
  //       setData(response.data);
  //     });
  //   }, []);
  //   return (
  //     <body>
  //       <Container className="Admin-Buttons">
  //         <Button variant="primary" className="backButton" href="/#/admin/manageCampers">
  //           {" "}
  //           Back{" "}
  //         </Button>
  //         <br />
  //         <br />
  //         <h3> Attendance Report </h3>
  //         <p>{localStorage.getItem("currentChild")}</p>
  //         <p>Group: Dates</p>
  //         <p>Summer: 2021</p>
  //         <br />
  //         <hr />
  //         <br />
  //         <div className={"overflowTable"}>
  //           <table className={"manageTable"}>
  //             {Object.entries(data).map(([k, v], index) => (
  //               <tr>
  //                 <td>
  //                   <p>Week {index + 1}</p>
  //                   {Object.entries(v)
  //                     .filter(([x, y]) => x === "startDate" || x === "endDate")
  //                     .sort((a, b) => b[0].localeCompare(a[0]))
  //                     .map(([key, val]) => (
  //                       <div>{key == "startDate" ? <p> {val} → </p> : <p> {val} </p>}</div>
  //                     ))}
  //                 </td>
  //                 {Object.entries(v).filter(([x, y]) => x !== "startDate" && x != "endDate").length === 0 ? (
  //                   <i>
  //                     <br /> No Records found{" "}
  //                   </i>
  //                 ) : (
  //                   Object.entries(v)
  //                     .filter(([x, y]) => x != "startDate" && x != "endDate")
  //                     .map(([key, val]) => (
  //                       <td>
  //                         Date: {key} <br />
  //                         Present for: {val}{" "}
  //                       </td>
  //                     ))
  //                 )}
  //               </tr>
  //             ))}
  //           </table>
  //           <br />
  //           <hr />
  //           <br />
  //         </div>
  //       </Container>
  //     </body>
  //   );
}
