// Page for admin to view campers' attendance

import React, {ReactNode, Fragment, MouseEvent} from 'react';
import {
    Button,
    Container,
    Modal,
    ModalProps,
    Form,
    DropdownButton,
    Dropdown,
    ListGroup,
    Tab,
    Col
} from "react-bootstrap";
import './Dashboard.css';
import Moment from 'moment';

import {Typeahead} from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import AdminService from "./services/admin-service";
import CamperService from "./services/camper-service";
import {Omit, BsPrefixProps} from 'react-bootstrap/esm/helpers';


interface AttendanceProps {
    date?: Date | any, // DATE TIME, NOT THE FRUIT DATE

}

interface FullAttendance {
    camperRecords: {
        dates1: Camper,
        dates2: Camper,
        coconuts1: Camper,
        coconuts2: Camper,
        leaders1: Camper,
        leaders2: Camper,
        trees1: Camper,
        trees2: Camper
    }

}

interface Camper {
    [id: string]:
        {
            firstName: string;
            lastName: string;
            expected: string;
            status: string;
            bonusName: string;
        }
}

interface CamperYearDetails {
    id: number,
    firstName: string,
    lastName: string,
    group: string
    customOption: boolean,
    label: string
}

interface DisplayGroupings {
    coconuts: boolean;
    dates: boolean;
    trees: boolean;
    leaders: boolean;
}


export const Attendance: React.FC<AttendanceProps> = () => {
    const [showUpdate, setShowUpdate] = React.useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => {
        setShowUpdate(true);
        setTimeout(handleCloseUpdate, 2500);
    };
    const [dateTimeValue, setDateTime] = React.useState({
            date: undefined
        }
    );

    const [bonusCamper, setBonusCamper] = React.useState({
        status: false,
        group: ""
    })

    const [mergeCamper, setMergeCamper] = React.useState({
        status: false,
        group: "",
        camperName: "",
        time: ""
    })

    const defaultCampers: CamperYearDetails[] = [];
    const [campersInYear, setCampersInYear]: [CamperYearDetails[], (campers: CamperYearDetails[]) => void] = React.useState(defaultCampers);


    const [data, setData] = React.useState<FullAttendance>({
        camperRecords: {
            dates1: {},
            dates2: {},
            coconuts1: {},
            coconuts2: {},
            leaders1: {},
            leaders2: {},
            trees1: {},
            trees2: {}

        }
    });

    const [showGroups, setDisplayGroups] = React.useState<DisplayGroupings>({
        coconuts: true,
        trees: true,
        leaders: true,
        dates: true,
    });


    const handleDisplayGroup = (group: string) => {
        switch (group.substring(0, group.length - 1)) {
            case "coconuts":
                return (showGroups.coconuts);
            case "trees":
                return (showGroups.trees);
            case "leaders":
                return (showGroups.leaders);
            case "dates":
                return (showGroups.dates);
        }
        return false;
    }

    const [selection, setSelections] = React.useState(defaultCampers);


    async function getCampersInGroup(group: string) {
        // @Todo switch to get campers in current year (waiting for more data)
        await CamperService.getGroupInfo(group).then((response: { data: any }) => {
            setCampersInYear(response.data);
        });
        setShowUpdate(true);
    }


    function MergeCamperModal(props: JSX.IntrinsicAttributes & Omit<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {
        return (<Modal {...props}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                       scrollable>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Merge Attendance
                    </Modal.Title>
                    <h4>Merging {mergeCamper.camperName} to an
                        Existing {mergeCamper.group.substring(0, 1).toUpperCase()}{mergeCamper.group.substring(1, mergeCamper.group.length - 1)} {mergeCamper.group.substring(mergeCamper.group.length - 1)} Camper: </h4>
                </Modal.Header>
                <Modal.Body>
                    {campersInYear.map((item) =>

                            <ListGroup>
                                <ListGroup.Item action
                                                onClick={() => {
                                                    handleMergeRecord(item.id.toString(), mergeCamper.time, mergeCamper.camperName, mergeCamper.group)
                                                }}> {item.firstName} {item.lastName}</ListGroup.Item>
                            </ListGroup>

                    )}

                </Modal.Body>


            </Modal>

        )
    }

    function BonusCamperModal(props: JSX.IntrinsicAttributes & Omit<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {
        // @ts-ignore
        return (<Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Any Unexpected Campers on {dateTimeValue.date}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Creating Attendance for Bonus Camper(s)</h4>
                <Fragment>
                    <Form.Group>
                        <Form.Label>Campers
                            in {bonusCamper.group.substring(0, 1).toUpperCase()}{bonusCamper.group.substring(1, bonusCamper.group.length - 1)} {bonusCamper.group.substring(bonusCamper.group.length - 1)} Group:</Form.Label>
                        <Typeahead
                            allowNew={true}
                            id="camperSearch"
                            multiple
                            // newSelectionPrefix={"Add New Camper"}
                            clearButton
                            labelKey={(option) => `${option.firstName} ${option.lastName}`}
                            onChange={setSelections}
                            options={campersInYear}
                            placeholder="Choose a Camper..."
                            selected={selection}
                        />


                    </Form.Group>
                </Fragment>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={props.onHide}>Cancel</Button>
                <DropdownButton title={"Save Bonus Campers as..."} key={"success"}>
                    <Dropdown.Item onClick={() => handleBonusCamper(selection, "am")}>
                        AM
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBonusCamper(selection, "pm")}>
                        PM
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBonusCamper(selection, "full")}>
                        Full
                    </Dropdown.Item>
                </DropdownButton>
            </Modal.Footer>
        </Modal>);
    }


    // @ts-ignore
    const Result = () => {

        return (
            <div>

                {Object.entries(data.camperRecords).sort((a, b) => a[0].localeCompare(b[0])).map(([group, value]) =>
                    <div
                        style={{display: ((!handleDisplayGroup(group) || (dateTimeValue.date == undefined)) ? 'none' : 'block')}}>
                        <h5>📋 {group.substring(0, 1).toUpperCase()}{group.substring(1, group.length - 1)} {group.substring(group.length - 1)}</h5>

                        <h6>Registered Camper Attendance</h6>
                        <table className={"attendanceTable"}>

                            <tr>
                                <th> Name</th>
                                <th> Expected Attendance</th>
                                <th> Actual Attendance</th>

                            </tr>

                            {Object.entries(value).filter(([x, y]) => x.substring(0, 5) != "bonus" && y.expected != "None").sort((a, b) => a[0].localeCompare(b[0])).map(([id, item]) => (
                                <tr>
                                    <td> {item.firstName} {item.lastName}</td>
                                    <td style={{color: (item.status != item.expected ? 'red' : 'green')}}>
                                        {item.expected}
                                    </td>

                                    <td>
                                        <select id={id} onChange={handleChange("updateCamper")}>
                                            {item.status == "Absent" ?
                                                <option selected value={["absent", id]}>Absent
                                                </option> : <option value={["absent", id]}>Absent</option>}
                                            {item.status == "AM" ?
                                                <option selected value={["am", id]}>AM</option> :
                                                <option value={["am", id]}>AM</option>}
                                            {item.status == "PM" ?
                                                <option selected value={["pm", id]}>PM</option> :
                                                <option value={["pm", id]}>PM</option>}
                                            {item.status == "Full" ?
                                                <option selected value={["full", id]}>Full
                                                </option> : <option value={["full", id]}>Full</option>}
                                        </select>
                                    </td>
                                </tr>

                            ))}
                        </table>
                        <br/>
                        <h6>Non-Registered (Bonus) Camper Attendance</h6>
                        <table className={"bonusAttendanceTable"}>

                            <tr>
                                <th> Bonus Camper Name</th>
                                <th> Attendance</th>
                                <th> Merge to an Existing Camper</th>
                                <th> Delete Record</th>
                            </tr>

                            {Object.entries(value).filter(([x, y]) => x.substring(0, 5) == "bonus" || y.expected == "None").sort((a, b) => a[0].localeCompare(b[0])).map(([id, item]) => (
                                <tr>
                                    {item.bonusName ? <td>{item.bonusName}</td> :
                                        <td>{item.firstName} {item.lastName}</td>}
                                    <td>

                                        <select id={id} onChange={handleChange("updateBonusCamper")}>
                                            {item.status == "Absent" ?
                                                <option selected value={["absent", item.bonusName, group, id]}>Remove
                                                    Record
                                                </option> : <option value={["absent", item.bonusName, group, id]}>Remove
                                                    Record</option>}
                                            {item.status == "AM" ?
                                                <option selected value={["am", item.bonusName, group, id]}>AM</option> :
                                                <option value={["am", item.bonusName, group, id]}>AM</option>}
                                            {item.status == "PM" ?
                                                <option selected value={["pm", item.bonusName, group, id]}>PM</option> :
                                                <option value={["pm", item.bonusName, group, id]}>PM</option>}
                                            {item.status == "Full" ?
                                                <option selected value={["full", item.bonusName, group, id]}>Full
                                                </option> :
                                                <option value={["full", item.bonusName, group, id]}>Full</option>}
                                        </select>
                                    </td>
                                    {item.bonusName ? <td><Button variant={"warning"}
                                                                  onClick={() => getCampersInGroup(group).then(r => {
                                                                      setMergeCamper({
                                                                          group: group,
                                                                          status: true,
                                                                          camperName: item.bonusName,
                                                                          time: item.status.toLowerCase()
                                                                      })
                                                                  })}>Merge</Button></td> :
                                        <td><i>Already an Existing Camper</i></td>}
                                    <td><Button variant={"danger"}
                                                onClick={() => deleteBonusCamper(id, item.bonusName, group)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </table>

                        <div>
                            <p className={"addPadding"}>➕ Bonus Campers &nbsp;&nbsp; [<a className={"blue"}
                                                                                         onClick={() => {
                                                                                             getCampersInGroup(group).then(r => {
                                                                                                     setBonusCamper({
                                                                                                         ...bonusCamper,
                                                                                                         group: group,
                                                                                                         status: true
                                                                                                     })
                                                                                                 }
                                                                                             );
                                                                                         }}>Add a Bonus
                                Camper</a>] </p>
                            <br/> <br/>
                        </div>

                    </div>
                )}


            </div>
        )
    }


    const handleMergeRecord = (newCamperID: string, newTime: string, oldCamperName: string, oldCamperGroup: string) => {
        setMergeCamper({time: "", camperName: "", group: "", status: false});
        updateAttendanceRecord(newCamperID, newTime).then(r => {
            updateBonusAttendanceRecord(oldCamperName, "absent", oldCamperGroup).then(response => {
                handleShowUpdate();
            })
        })
    }

    const handleChange = (name: string) => {
        return (e: { target: { value: any; }; }) => {

            if (name == "date") {
                setDateTime({...dateTimeValue, [name]: e.target.value});
            } else if (name == "updateCamper") {
                updateAttendanceRecord(e.target.value.split(",")[1], e.target.value.split(",")[0]).then(r => {
                    handleShowUpdate();
                });
            } else if (name == "updateBonusCamper") {
                if (e.target.value.split(",")[1]) {
                    updateBonusAttendanceRecord(e.target.value.split(",")[1], e.target.value.split(",")[0], e.target.value.split(",")[2]).then(r => {
                        handleShowUpdate();
                    });
                } else {
                    updateAttendanceRecord(e.target.value.split(",")[3], e.target.value.split(",")[0]).then(r => {
                        handleShowUpdate();
                    })
                }
            }
        };
    }
    const deleteBonusCamper = (camperID: string, camperName: string, camperGroup: string) => {
        if (camperName) {
            updateBonusAttendanceRecord(camperName, "absent", camperGroup).then(r =>
                handleShowUpdate());
        } else {
            updateAttendanceRecord(camperID, "absent").then(r =>
                handleShowUpdate());
        }
    }

    const handleBonusCamper = (identifier: CamperYearDetails[], newVal: string) => {
        identifier.forEach(i => {

            if (i.customOption || i.label) {
                updateBonusAttendanceRecord(i.label, newVal, bonusCamper.group).then(r => {

                    setBonusCamper({group: "", status: false})

                    handleShowUpdate();
                });
            } else {

                updateAttendanceRecord(String(i.id), newVal).then(r => {

                    setBonusCamper({group: "", status: false})

                    handleShowUpdate();
                });
            }

        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        const {date} = dateTimeValue;
        if (date != undefined) {

            await AdminService.getAttendanceInDate(date).then((response: { data: any }) => {
                setData(response.data);
            });
        }
    }

    const handleDateSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const {date} = dateTimeValue;
        if (date != undefined) {

            await AdminService.getAttendanceInDate(date).then((response: { data: any }) => {
                setData(response.data);
            });
        }
    }

    const getNumItems = () => {
        let expected = 0
        let actual = 0
        Object.entries(data.camperRecords).forEach(
            ([key, value]) => {
                Object.entries(value).forEach(
                    ([id, item]) => {
                        actual += item.status != "Absent" ? 1 : 0
                        expected += item.expected != "None" ? 1 : 0
                    }
                )
            }
        );
        return (actual.toString() + "/" + expected.toString())
    }

    const updateAttendanceRecord = async (id: string, newVal: string) => {
        await AdminService.updateAttendance(dateTimeValue.date, id, newVal);
    }

    const updateBonusAttendanceRecord = async (name: string, newVal: string, group: string) => {
        await AdminService.updateBonusAttendance(dateTimeValue.date, name, group, newVal);
    }


    // @ts-ignore
    return (
        <body>

        <Modal show={showUpdate} onHide={handleCloseUpdate} size={"sm"} onShow={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Update Attendance</Modal.Title>
            </Modal.Header>
            <Modal.Body>Camper's attendance has been updated successfully! </Modal.Body>
        </Modal>

        <BonusCamperModal
            show={bonusCamper.status}
            onHide={() => {
                setBonusCamper({group: "", status: false});
                setSelections(defaultCampers);
            }}
        />

        <MergeCamperModal
            show={mergeCamper.status}
            onHide={() => setMergeCamper({group: "", status: false, camperName: "", time: ""})}
        />


        <Container className="Admin-Buttons">
            <Button variant="primary" className="backButton" href="/#/admin"> Back </Button><br/><br/>
            <h3> Attendance </h3>
            <form >
                <p className={"buttonToggle"}> 🗓️ Select a date:</p>
                <div className={"buttonToggle"}><input type={"date"} className={"oneRow"}
                                                       onBlur={handleChange("date")}/>
                    <Button variant={"success"} type={"submit"} onClick={handleDateSubmit}> Go </Button></div>
            </form>
            <br/>
            <h6> -------------------- </h6><br/>

            <h4 className={"buttonToggle"}> {dateTimeValue.date == undefined ? "Choose a Date" : Moment(dateTimeValue.date).format("MMMM Do YYYY")}</h4>
            <br/>
            <h6> All Campers Present: {dateTimeValue.date == undefined ? "NA/NA" : getNumItems()}</h6>
            <h6> Counselors Present: NA/NA </h6><br/>
            <h6> -------------------- </h6><br/><br/>

            <div className={"buttonToggle"}>

                <Button variant="success" className={"groupBtn"} onClick={() => setDisplayGroups({
                    coconuts: false,
                    leaders: false,
                    trees: false,
                    dates: true
                })}> Dates </Button>
                <Button variant="warning" className={"groupBtn"} onClick={() => setDisplayGroups({
                    coconuts: true,
                    leaders: false,
                    trees: false,
                    dates: false
                })}> Coconuts </Button>
                <Button variant="danger" className={"groupBtn"} onClick={() => setDisplayGroups({
                    coconuts: false,
                    leaders: false,
                    trees: true,
                    dates: false
                })}> Trees </Button>
                <Button variant="info" className={"groupBtn"} onClick={() => setDisplayGroups({
                    coconuts: false,
                    leaders: true,
                    trees: false,
                    dates: false
                })}> Young Leaders </Button>
                <Button variant="outline-primary" className={"groupBtn"} onClick={() => setDisplayGroups({
                    coconuts: true,
                    leaders: true,
                    trees: true,
                    dates: true
                })}>Reset to All Groups</Button>

                {data != undefined ? <Result/> : null}
            </div>

        </Container>
        </body>
    )

}
export default Attendance;