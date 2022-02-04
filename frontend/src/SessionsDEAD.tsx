// Page for admin to view and edit camp groups, dates, and pricing

import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import "./Dashboard.css";
import AuthService from "./services/auth-service";
import CamperService from "./services/camper-service";
import AdminService from "./services/admin-service";
import ParentService from "./services/parent-service";

interface Props {}

interface IGroups {
  datesAMLimit: number;
  datesPMLimit: number;
  cocoAMLimit: number;
  cocoPMLimit: number;
  treeAMLimit: number;
  treePMLimit: number;
  leadAMLimit: number;
  leadPMLimit: number;
}

interface Holiday {
  holiday: string;
  holiday_id: number;
}

const group = {} as IGroups;

const holidayArray: Holiday[] = [];

export const Sessions: React.FC<Props> = () => {
  const [showGroupsForm, setGroupsForm] = React.useState(true);
  const [showDatesForm, setDatesForm] = React.useState(false);
  const [showPricingForm, setPricingForm] = React.useState(false);
  const [showPopup, setPopup] = React.useState(false);
  const [showList1, setList1] = React.useState(holidayArray); // Used for holidays

  const handleClose = () => {
    setPopup(false);
  };

  const Popup = () => (
    <div>
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Holidays </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Holiday: <input type={"Date"} onChange={handleWeekChange("weekHoliday")} value={weeks.weekHoliday} />
          <Button variant="success" size={"sm"} onClick={handleHolidayChange}>
            {" "}
            Add{" "}
          </Button>
          <ol className={"holidays"}>
            Current Holidays:
            {showList1.map((item) => (
              <li>
                {" "}
                {item.holiday} &nbsp;
                <Button variant="danger" size={"sm"} onClick={() => removeHoliday(item.holiday_id)}>
                  {" "}
                  Remove{" "}
                </Button>
              </li>
            ))}
          </ol>
        </Modal.Body>
      </Modal>
    </div>
  );

  const handlePopup = (list: number) => {
    weeks.weekHoliday = "";
    AdminService.getWeeksHolidays(list).then((r) => setList1(r.data));
    weeks.currentWeekID = list;
    setPopup(true);
  };

  const [weeks, setWeeks] = React.useState({
    week1start: "",
    week1end: "",
    week1id: 0,
    week1holidays: [],
    week2start: "",
    week2end: "",
    week2id: 0,
    week3start: "",
    week3end: "",
    week3id: 0,
    week4start: "",
    week4end: "",
    week4id: 0,
    week5start: "",
    week5end: "",
    week5id: 0,
    week6start: "",
    week6end: "",
    week6id: 0,
    week7start: "",
    week7end: "",
    week7id: 0,
    week8start: "",
    week8end: "",
    week8id: 0,
    // week9start: "",
    // week9end: "",
    // week9id: 0,
    // week10start: "",
    // week10end: "",
    // week10id: 0,
    weekHoliday: "",
    currentWeekID: 0,
    cutoff: "",
    amTimeStart: "",
    amTimeEnd: "",
    amECTimeStart: "",
    amECTimeEnd: "",
    pmTimeStart: "",
    pmTimeEnd: "",
    pmECTimeStart: "",
    pmECTimeEnd: "",
    fullTimeStart: "",
    fullTimeEnd: "",
    fullECTimeStart: "",
    fullECTimeEnd: "",
    amSelected: false,
    amECSelected: false,
    pmSelected: false,
    pmECSelected: false,
    fullSelected: false,
    fullECSelected: false,
  });

  const [limits, setLimits] = React.useState({
    datesAMLimit: 0,
    datesPMLimit: 0,
    cocoAMLimit: 0,
    cocoPMLimit: 0,
    treeAMLimit: 0,
    treePMLimit: 0,
    leadAMLimit: 0,
    leadPMLimit: 0,
  });

  const [price, setPrice] = React.useState({
    pricing_base_rate: 0,
    pricing_extra_rate: 0,
    extra_shirts: 0,
    extended_rate: 0,
  });

  const date = new Date();
  let year = date.getFullYear();

  const handlePriceChange = (name: string) => (e: { target: { value: any } }) => {
    setPrice({ ...price, [name]: e.target.value });
  };

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setLimits({ ...limits, [name]: e.target.value });
  };

  const handleWeekChange = (name: string) => (e: { target: { value: any } }) => {
    setWeeks({ ...weeks, [name]: e.target.value });
  };

  const handleWeekToggle = (name: string) => {
    let str = "weeks." + name;

    if (eval(str) == false) {
      setWeeks({ ...weeks, [name]: true });
    } else {
      setWeeks({ ...weeks, [name]: false });
    }
  };

  const handleHolidayChange = () => {
    AdminService.setWeeksHolidays(weeks.currentWeekID, weeks.weekHoliday).catch();
    weeks.weekHoliday = "";
    setPopup(false);
  };

  const removeHoliday = (id: number) => {
    let weekID = weeks.currentWeekID;
    AdminService.removeWeeksHolidays(weekID, id).catch();
    setPopup(false);
  };

  React.useEffect(() => {
    AdminService.getGroupLimits().then((response) => {
      setLimits(response.data);
    });

    AdminService.getProgramPrice().then((response) => {
      setPrice(response.data);
    });

    AdminService.getProgramWeeks().then((response) => {
      // setAllWeeks(response.data)

      for (let i = 0; i < response.data.length; i++) {
        let num = i + 1;
        const dataString = "weeks.week" + num + "start = response.data[" + i + "].startDate";
        const dataStr = "weeks.week" + num + "end = response.data[" + i + "].endDate";
        const dataS = "weeks.week" + num + "id = response.data[" + i + "].weekId";
        eval(dataString);
        eval(dataStr);
        eval(dataS);
      }
    });
    AdminService.getProgramInfo().then((response) => {
      weeks.cutoff = response.data.cutoff;
      weeks.amTimeStart = response.data.amTimeStart;
      weeks.amTimeEnd = response.data.amTimeEnd;
      weeks.amECTimeStart = response.data.amECTimeStart;
      weeks.amECTimeEnd = response.data.amECTimeEnd;
      weeks.pmTimeStart = response.data.pmTimeStart;
      weeks.pmTimeEnd = response.data.pmTimeEnd;
      weeks.pmECTimeStart = response.data.pmECTimeStart;
      weeks.pmECTimeEnd = response.data.pmECTimeEnd;
      weeks.fullTimeStart = response.data.fullTimeStart;
      weeks.fullTimeEnd = response.data.fullTimeEnd;
      weeks.fullECTimeStart = response.data.fullECTimeStart;
      weeks.fullECTimeEnd = response.data.fullECTimeEnd;
      weeks.amSelected = JSON.parse(response.data.amSelected);
      weeks.amECSelected = JSON.parse(response.data.amECSelected);
      weeks.pmSelected = JSON.parse(response.data.pmSelected);
      weeks.pmECSelected = JSON.parse(response.data.pmECSelected);
      weeks.fullSelected = JSON.parse(response.data.fullSelected);
      weeks.fullECSelected = JSON.parse(response.data.fullECSelected);
    });
  }, []);

  const handleWeeksSubmit = async (e: { preventDefault: () => void }) => {
    const {
      week1start,
      week1end,
      week1id,
      week1holidays,
      week2start,
      week2end,
      week2id,
      week3start,
      week3end,
      week3id,
      week4start,
      week4end,
      week4id,
      week5start,
      week5end,
      week5id,
      week6start,
      week6end,
      week6id,
      week7start,
      week7end,
      week7id,
      week8start,
      week8end,
      week8id,
      cutoff,
      amTimeStart,
      amTimeEnd,
      amECTimeStart,
      amECTimeEnd,
      pmTimeStart,
      pmTimeEnd,
      pmECTimeStart,
      pmECTimeEnd,
      fullTimeStart,
      fullTimeEnd,
      fullECTimeStart,
      fullECTimeEnd,
      amSelected,
      amECSelected,
      pmSelected,
      pmECSelected,
      fullSelected,
      fullECSelected,
    } = weeks;
    const allWeeks = [
      [week1start, week1end, week1id, week1holidays],
      [week2start, week2end, week2id],
      [week3start, week3end, week3id],
      [week4start, week4end, week4id],
      [week5start, week5end, week5id],
      [week6start, week6end, week6id],
      [week7start, week7end, week7id],
      [week8start, week8end, week8id],
    ];
    await AdminService.setProgramWeeks(
      allWeeks,
      cutoff,
      amTimeStart,
      amTimeEnd,
      amECTimeStart,
      amECTimeEnd,
      pmTimeStart,
      pmTimeEnd,
      pmECTimeStart,
      pmECTimeEnd,
      fullTimeStart,
      fullTimeEnd,
      fullECTimeStart,
      fullECTimeEnd,
      amSelected,
      amECSelected,
      pmSelected,
      pmECSelected,
      fullSelected,
      fullECSelected
    );
  };

  const handleLimitSubmit = async (e: { preventDefault: () => void }) => {
    const { datesAMLimit, datesPMLimit, cocoAMLimit, cocoPMLimit, treeAMLimit, treePMLimit, leadAMLimit, leadPMLimit } =
      limits;
    await AdminService.setGroupLimits(
      datesAMLimit,
      datesPMLimit,
      cocoAMLimit,
      cocoPMLimit,
      treeAMLimit,
      treePMLimit,
      leadAMLimit,
      leadPMLimit
    );
  };

  const handlePriceSubmit = async (e: { preventDefault: () => void }) => {
    const { pricing_base_rate, pricing_extra_rate, extra_shirts, extended_rate } = price;
    await AdminService.setProgramPrice(pricing_base_rate, pricing_extra_rate, extra_shirts, extended_rate);
  };

  const GroupsForm = () => (
    <div>
      <h4>Group Limits</h4>
      <br />
      <div className={"sessionsForms"}>
        <form>
          <h5>Group 1: Dates</h5>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              AM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.datesAMLimit}
                onBlur={handleChange("datesAMLimit")}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              PM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.datesPMLimit}
                onBlur={handleChange("datesPMLimit")}
              />{" "}
            </div>
          </div>
          <h5>Group 2: Coconuts</h5>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              AM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.cocoAMLimit}
                onBlur={handleChange("cocoAMLimit")}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              PM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.cocoPMLimit}
                onBlur={handleChange("cocoPMLimit")}
              />{" "}
            </div>
          </div>
          <h5>Group 3: Trees</h5>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              AM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.treeAMLimit}
                onBlur={handleChange("treeAMLimit")}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              PM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.treePMLimit}
                onBlur={handleChange("treePMLimit")}
              />{" "}
            </div>
          </div>
          <h5>Group 4: Young Leaders</h5>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              AM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.leadAMLimit}
                onBlur={handleChange("leadAMLimit")}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              PM Limit{" "}
              <input
                type={"Number"}
                placeholder={"0"}
                defaultValue={limits.leadPMLimit}
                onBlur={handleChange("leadPMLimit")}
              />{" "}
            </div>
          </div>
          <br />
          <div className="center">
            <Button variant="success" className="buttonTxt" type="submit" onClick={handleLimitSubmit}>
              {" "}
              Save{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const handleGroups = () => {
    setGroupsForm(true);
    setDatesForm(false);
    setPricingForm(false);
  };

  const handleWeekClear = (weekID: number) => {
    const dataS = "weeks.week" + weekID + 'start = ""';
    const dataSt = "weeks.week" + weekID + 'end = ""';
    const dataStr = "handleWeekChange('week" + weekID + "start')";
    const dataStri = "handleWeekChange('week" + weekID + "end')";

    eval(dataS);
    eval(dataSt);
    eval(dataStr);
    eval(dataStri);
  };

  const DatesForm = () => (
    <div>
      <h4>Camp Dates</h4>
      <br />
      <div className={"sessionsForms"}>
        <form>
          <b>***To set dates use the calendar icon***</b>
          <h5>Weeks</h5>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              Week 1 Start <input type={"Date"} onChange={handleWeekChange("week1start")} value={weeks.week1start} />
              {weeks.week1id !== 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week1id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 1 End <input type={"Date"} onChange={handleWeekChange("week1end")} value={weeks.week1end} />
            </div>
          </div>

          <div className={"row shadeGray"}>
            <div className={"column"}>
              {" "}
              Week 2 Start <input type={"Date"} onChange={handleWeekChange("week2start")} value={weeks.week2start} />
              {weeks.week2id !== 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week2id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 2 End <input type={"Date"} onChange={handleWeekChange("week2end")} value={weeks.week2end} />
            </div>
          </div>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              Week 3 Start <input type={"Date"} onChange={handleWeekChange("week3start")} value={weeks.week3start} />
              {weeks.week3id != 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week3id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 3 End <input type={"Date"} onChange={handleWeekChange("week3end")} value={weeks.week3end} />
            </div>
          </div>
          <div className={"row shadeGray"}>
            <div className={"column"}>
              {" "}
              Week 4 Start <input type={"Date"} onChange={handleWeekChange("week4start")} value={weeks.week4start} />
              {weeks.week4id != 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week4id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 4 End <input type={"Date"} onChange={handleWeekChange("week4end")} value={weeks.week4end} />
            </div>
          </div>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              Week 5 Start <input type={"Date"} onChange={handleWeekChange("week5start")} value={weeks.week5start} />
              {weeks.week5id != 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week5id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 5 End <input type={"Date"} onChange={handleWeekChange("week5end")} value={weeks.week5end} />
            </div>
          </div>
          <div className={"row shadeGray"}>
            <div className={"column"}>
              {" "}
              Week 6 Start <input type={"Date"} onChange={handleWeekChange("week6start")} value={weeks.week6start} />
              {weeks.week6id != 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week6id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 6 End <input type={"Date"} onChange={handleWeekChange("week6end")} value={weeks.week6end} />
            </div>
          </div>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              Week 7 Start <input type={"Date"} onChange={handleWeekChange("week7start")} value={weeks.week7start} />
              {weeks.week7id != 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week7id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 7 End <input type={"Date"} onChange={handleWeekChange("week7end")} value={weeks.week7end} />
            </div>
          </div>
          <div className={"row shadeGray"}>
            <div className={"column"}>
              {" "}
              Week 8 Start <input type={"Date"} onChange={handleWeekChange("week8start")} value={weeks.week8start} />
              {weeks.week8id != 0 && (
                <Button
                  variant="success"
                  className="holidayBtn"
                  type="submit"
                  onClick={() => handlePopup(weeks.week8id)}
                >
                  {" "}
                  Add Holiday{" "}
                </Button>
              )}
            </div>
            <div className={"column"}>
              {" "}
              Week 8 End <input type={"Date"} onChange={handleWeekChange("week8end")} value={weeks.week8end} />
            </div>
          </div>
          {/* <div className={"row"}>
                        <div className={"column"}> Week 9 Start <input type={"Date"} onChange={handleWeekChange('week9start')} value={weeks.week9start}/>
                            {weeks.week9id != 0 && <Button variant="success" className="holidayBtn" type="submit" onClick={()=>handlePopup(weeks.week9id)}> Add Holiday </Button>}
                        </div>
                        <div className={"column"}> Week 9 End <input type={"Date"} onChange={handleWeekChange('week9end')} value={weeks.week9end}/>
                        </div>
                    </div>
                    <div className={"row shadeGray"}>
                        <div className={"column"}> Week 10 Start <input type={"Date"} onChange={handleWeekChange('week10start')} value={weeks.week10start}/>
                            {weeks.week10id != 0 && <Button variant="success" className="holidayBtn" type="submit" onClick={()=>handlePopup(weeks.week10id)}> Add Holiday </Button>}
                        </div>
                        <div className={"column"}> Week 10 End <input type={"Date"} onChange={handleWeekChange('week10end')} value={weeks.week10end}/>
                        </div>
                    </div><br /> */}

          <br />

          <h5>Additional Settings</h5>

          <div className={"row"}>
            <div className={"column"}>
              Current Year <input type={"Number"} value={year} />
            </div>
            <div className={"column"}>
              Early Bird Cutoff Date <input type={"Date"} value={weeks.cutoff} onChange={handleWeekChange("cutoff")} />
            </div>
          </div>

          <div className={"row shadeGray"}>
            <div className={"column33"}>
              AM Start & End
              <input type="time" onChange={handleWeekChange("amTimeStart")} value={weeks.amTimeStart} required />
              <input type="time" onChange={handleWeekChange("amTimeEnd")} value={weeks.amTimeEnd} required />
            </div>
            <div className={"column33"}>
              AM + EC Start & End
              <input type="time" onChange={handleWeekChange("amECTimeStart")} value={weeks.amECTimeStart} required />
              <input type="time" onChange={handleWeekChange("amECTimeEnd")} value={weeks.amECTimeEnd} required />
            </div>
            <div className={"column33"}>
              PM Start & End
              <input type="time" onChange={handleWeekChange("pmTimeStart")} value={weeks.pmTimeStart} required />
              <input type="time" onChange={handleWeekChange("pmTimeEnd")} value={weeks.pmTimeEnd} required />
            </div>
          </div>

          <div className={"row shadeGray"}>
            <div className={"column33"}>
              PM + EC Start & End
              <input type="time" onChange={handleWeekChange("pmECTimeStart")} value={weeks.pmECTimeStart} required />
              <input type="time" onChange={handleWeekChange("pmECTimeEnd")} value={weeks.pmECTimeEnd} required />
            </div>
            <div className={"column33"}>
              Full Start & End
              <input type="time" onChange={handleWeekChange("fullTimeStart")} value={weeks.fullTimeStart} required />
              <input type="time" onChange={handleWeekChange("fullTimeEnd")} value={weeks.fullTimeEnd} required />
            </div>
            <div className={"column33"}>
              Full + EC Start & End
              <input
                type="time"
                onChange={handleWeekChange("fullECTimeStart")}
                value={weeks.fullECTimeStart}
                required
              />
              <input type="time" onChange={handleWeekChange("fullECTimeEnd")} value={weeks.fullECTimeEnd} required />
            </div>
          </div>

          <div className={"row"}>
            <div className={"column"}>
              Registration options offered: <br />
              <input
                type={"checkbox"}
                className={"sameLine"}
                checked={weeks.amSelected}
                onChange={() => handleWeekToggle("amSelected")}
              />
              <p className={"sameLine"}> AM </p>
              <br />
              <input
                type={"checkbox"}
                className={"sameLine"}
                checked={weeks.amECSelected}
                onChange={() => handleWeekToggle("amECSelected")}
              />
              <p className={"sameLine"}> AM + EC </p>
              <br />
              <input
                type={"checkbox"}
                className={"sameLine"}
                checked={weeks.pmSelected}
                onChange={() => handleWeekToggle("pmSelected")}
              />
              <p className={"sameLine"}> PM </p>
              <br />
              <input
                type={"checkbox"}
                className={"sameLine"}
                checked={weeks.pmECSelected}
                onChange={() => handleWeekToggle("pmECSelected")}
              />
              <p className={"sameLine"}> PM + EC </p>
              <br />
              <input
                type={"checkbox"}
                className={"sameLine"}
                checked={weeks.fullSelected}
                onChange={() => handleWeekToggle("fullSelected")}
              />
              <p className={"sameLine"}> Full </p>
              <br />
              <input
                type={"checkbox"}
                className={"sameLine"}
                checked={weeks.fullECSelected}
                onChange={() => handleWeekToggle("fullECSelected")}
              />
              <p className={"sameLine"}> Full + EC </p>
            </div>
          </div>

          <br />
          <div className="center">
            <Button variant="success" className="buttonTxt" type="submit" onClick={handleWeeksSubmit}>
              {" "}
              Save{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const handleDates = () => {
    setDatesForm(true);
    setGroupsForm(false);
    setPricingForm(false);
  };

  const PricingForm = () => (
    <div>
      <h4>Yearly Session Pricing</h4>
      <br />
      <div className={"sessionsForms"}>
        <form>
          <h5>Just in Case Pricing</h5>

          <div className={"row"}>
            {(price.pricing_extra_rate / 5) % 10 < 5 && (
              <div className={"column"}>
                Full-Day Daily Rate
                <input
                  type={"Number"}
                  value={Math.floor(price.pricing_extra_rate / 5 / 10) * 10 + 5}
                  className={"notRequired"}
                />
              </div>
            )}
            {(price.pricing_extra_rate / 5) % 10 >= 5 && (
              <div className={"column"}>
                Full-Day Daily Rate
                <input
                  type={"Number"}
                  value={Math.floor(price.pricing_extra_rate / 5 / 10) * 10 + 10}
                  className={"notRequired"}
                />
              </div>
            )}
            {(price.pricing_extra_rate / 5) % 10 < 5 && (
              <div className={"column"}>
                Half-Day Daily Rate
                <input
                  type={"Number"}
                  value={Math.floor(price.pricing_extra_rate / 5 / 10) * 10 + 5 - 20}
                  className={"notRequired"}
                />
              </div>
            )}
            {(price.pricing_extra_rate / 5) % 10 >= 5 && (
              <div className={"column"}>
                Half-Day Daily Rate
                <input
                  type={"Number"}
                  value={Math.floor(price.pricing_extra_rate / 5 / 10) * 10 + 10 - 20}
                  className={"notRequired"}
                />
              </div>
            )}
          </div>

          <div className={"row"}>
            <div className={"column"}>
              Extended Care Pricing
              <input
                type={"text"}
                placeholder={"$0.00"}
                defaultValue={price.extra_shirts}
                onBlur={handlePriceChange("extra_shirts")}
              />
            </div>
            <div className={"column"}>
              Extra Shirt Pricing
              <input
                type={"Number"}
                placeholder={"$0.00"}
                defaultValue={price.extended_rate}
                onBlur={handlePriceChange("extended_rate")}
              />
            </div>
          </div>
          <h5>Weekly Pricing</h5>

          <div className={"row"}>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;[EARLY] Pricing for One Week
          </div>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              Early Half-Day Pricing{" "}
              <input type={"Number"} placeholder={"$0.00"} defaultValue={price.pricing_base_rate - 100} />{" "}
            </div>
            <div className={"column"}>
              Early Full-Day Pricing{" "}
              <input
                type={"Number"}
                placeholder={"$0.00"}
                defaultValue={price.pricing_base_rate}
                onBlur={handlePriceChange("pricing_base_rate")}
              />{" "}
            </div>
          </div>

          <div className={"row shadeGray"}>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;[LATE] Pricing for One Week
          </div>
          <div className={"row shadeGray"}>
            <div className={"column"}>
              {" "}
              Late Half-Day Pricing{" "}
              <input type={"Number"} placeholder={"$0.00"} defaultValue={price.pricing_extra_rate - 100} />
            </div>
            <div className={"column"}>
              {" "}
              Late Full-Day Pricing{" "}
              <input
                type={"Number"}
                placeholder={"$0.00"}
                defaultValue={price.pricing_extra_rate}
                onBlur={handlePriceChange("pricing_extra_rate")}
              />{" "}
            </div>
          </div>

          <div className={"row"}>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;[EARLY] Pricing for Holiday Week
          </div>
          <div className={"row"}>
            <div className={"column"}>
              {" "}
              4-Day Week Half Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={((price.pricing_base_rate - 100) / 5) * 4}
                className={"notRequired"}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              3-Day Week Half Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={((price.pricing_base_rate - 100) / 5) * 3}
                className={"notRequired"}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              4-Day Week Full Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={(price.pricing_base_rate / 5) * 4}
                className={"notRequired"}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              3-Day Week Full Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={(price.pricing_base_rate / 5) * 3}
                className={"notRequired"}
              />{" "}
            </div>
          </div>

          <div className={"row shadeGray"}>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;[LATE] Pricing for Holiday Week
          </div>
          <div className={"row shadeGray"}>
            <div className={"column"}>
              {" "}
              4-Day Week Half Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={((price.pricing_extra_rate - 100) / 5) * 4}
                className={"notRequiredGray"}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              3-Day Week Half Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={((price.pricing_extra_rate - 100) / 5) * 3}
                className={"notRequiredGray"}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              4-Day Week Full Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={(price.pricing_extra_rate / 5) * 4}
                className={"notRequiredGray"}
              />{" "}
            </div>
            <div className={"column"}>
              {" "}
              3-Day Week Full Day
              <input
                type={"Number"}
                placeholder={"$0.00"}
                value={(price.pricing_extra_rate / 5) * 3}
                className={"notRequiredGray"}
              />{" "}
            </div>
          </div>

          <br />
          <div className="center">
            <Button variant="success" className="buttonTxt" type="submit" onClick={handlePriceSubmit}>
              {" "}
              Save{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const handlePricing = () => {
    setPricingForm(true);
    setGroupsForm(false);
    setDatesForm(false);
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
        <h3> Sessions </h3>
        <div className={"buttonToggle"}>
          <Button variant="info" className={"groupBtn"} onClick={handleGroups}>
            {" "}
            Groups{" "}
          </Button>
          <Button variant="warning" className={"groupBtn"} onClick={handleDates}>
            {" "}
            Dates{" "}
          </Button>
          <Button variant="danger" className={"groupBtn"} onClick={handlePricing}>
            {" "}
            Pricing{" "}
          </Button>
          {showGroupsForm ? <GroupsForm /> : null}
          {showDatesForm ? <DatesForm /> : null}
          {showPricingForm ? <PricingForm /> : null}
          {showPopup ? <Popup /> : null}
        </div>
      </Container>
    </body>
  );
};
export default Sessions;
