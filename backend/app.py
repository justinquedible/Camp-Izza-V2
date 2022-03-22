from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os
from config import config
from PrefixMiddleware import PrefixMiddleware
from registrationEmail import sendRegistrationEmail

app = Flask(__name__)
app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix='/api')
CORS(app)

# Example api call
# localhost:5000/api/users/getUsers

# USERS
# All users
@app.route("/users/getUsers")
def getUsers():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from users")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# A user
@app.route("/users/getUser/<user_id>")
def getUser(user_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from users where id = %s", (user_id,))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/users/addUser", methods=["POST"])
def addUser():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into users (id, email, role) values (%s, %s, %s)",
                   (data["id"], data["email"], data["role"]))
    cursor.close()
    return jsonify({"status": "success"})


# PARENTS
# All parents
@app.route("/parents/getParents")
def getParents():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from parents")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# A parent
@app.route("/parents/getParent/<parent_id>")
def getParent(parent_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from parents where id = %s", (parent_id,))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/parents/addParent", methods=["POST"])
def addParent():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into parents (id, email, firstName, lastName, phone, guardian2FirstName, "
                   "guardian2LastName, guardian2Email, guardian2Phone, addressLine1, addressLine2, city, zipCode, "
                   "state, country, credit) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                   (data["id"], data["email"], data["firstName"], data["lastName"], data["phone"],
                    data["guardian2FirstName"], data["guardian2LastName"], data["guardian2Email"],
                    data["guardian2Phone"], data["addressLine1"], data["addressLine2"], data["city"], data["zipCode"],
                    data["state"], data["country"], data["credit"]))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/parents/updateParent/<parent_id>", methods=["PUT"])
def updateParent(parent_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update parents set firstName=%s, lastName=%s, phone=%s, guardian2FirstName=%s, "
                   "guardian2LastName=%s, guardian2Email=%s, guardian2Phone=%s, addressLine1=%s, addressLine2=%s, "
                   "city=%s, zipCode=%s, state=%s, country=%s, credit=%s where id = %s",
                   (data["firstName"], data["lastName"], data["phone"], data["guardian2FirstName"],
                    data["guardian2LastName"], data["guardian2Email"], data["guardian2Phone"], data["addressLine1"],
                    data["addressLine2"], data["city"], data["zipCode"], data["state"], data["country"], data["credit"], parent_id))
    cursor.close()
    return jsonify({"status": "success"})


# COUNSELORS
# All counselors
@app.route("/counselors/getCounselors")
def getCounselors():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from counselors")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# A counselor
@app.route("/counselors/getCounselor/<counselor_id>")
def getCounselor(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from counselors where id = %s", (counselor_id,))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/counselors/addCounselor", methods=["POST"])
def addCounselor():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into counselors (id, email, firstName, lastName, gender, dob, phone, altPhone, "
                   "approved, active) values (%s, %s, %s, %s, %s, %s,%s, %s, %s,%s)",
                   (data["id"], data["email"], data["firstName"], data["lastName"], data["gender"], data["dob"],
                    data["phone"], data["altPhone"], data["approved"], data["active"]))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/counselors/updateCounselor/<counselor_id>", methods=["PUT"])
def updateCounselors(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update counselors set email=%s, firstName=%s, lastName=%s, gender=%s, dob=%s, phone=%s,"
                   " altphone=%s,approved=%s, active=%s where id = %s",
                   (data["email"], data["firstName"], data["lastName"], data["gender"], data["dob"],
                    data["phone"], data["altPhone"], data["approved"], data["active"], counselor_id))
    cursor.close()
    return jsonify({"status": "success"})


# CAMPERS
# All campers
@app.route("/campers/getCampers")
def getCampers():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from campers")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/campers/getCampersWithRegisteredCamperWeeks")
def getCampersWithRegisteredCamperWeeks():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from campers, registered_camper_weeks where campers.id = registered_camper_weeks.camper_id")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/campers/getCampersRoster")
def getCampersRoster():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select c.id as camper_id, c.firstName as camperFirstName, c.lastName as camperLastName, c.*, "
                   "p.id as parent_id, p.firstName as parentFirstName, p.lastName as parentLastName, p.*, cmr.* from "
                   "campers c, parents p, camper_medical_records cmr where c.parent_id = p.id and c.id = cmr.camper_id")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# A camper
@app.route("/campers/getCamper/<camper_id>")
def getCamper(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)    
    cursor.execute("select * from campers where id = %s", (camper_id,))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/campers/getCampersByParentID/<parent_id>")
def getCamperByParent_id(parent_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from campers where parent_id = %s", (parent_id,))
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/campers/getCampersRegisteredCurrentYear")
def getCampersRegisteredCurrentYear():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select distinct c.id, c.firstName, c.lastName from registered_camper_weeks r, campers c, "
                   "camp_weeks cw where r.camper_id = c.id and r.camp_week_id = cw.id and YEAR(cw.start) = YEAR("
                   "CURDATE())")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/campers/getCampersRegisteredAllYears")
def getCampersRegisteredAllYears():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select distinct c.id, c.firstName, c.lastName from registered_camper_weeks r, campers c where "
                   "r.camper_id = c.id")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/campers/getCampersRegisteredAllYearsSortByRegistrationDate")
def getCampersRegisteredAllYearsSortByRegistrationDate():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select distinct id, firstName, lastName from (select distinct c.id as id, firstName, lastName, "
                   "transactionTime from (select registered_camper_weeks_id, transactionTime from "
                   "payment_informations) as p, registered_camper_weeks as r, campers as c where "
                   "p.registered_camper_weeks_id = r.id and r.camper_id = c.id order by p.transactionTime desc) as t")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/campers/getCampersUnregistered")
def getCampersUnregistered():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select t1.id, t1.firstName, t1.lastName from (select distinct c.id, c.firstName, c.lastName from "
                   "campers c) t1 left join (select distinct c.id, c.firstName, c.lastName from "
                   "registered_camper_weeks r, campers c where r.camper_id = c.id) t2 on t1.id = t2.id where t2.id is null;")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/campers/addCamper", methods=["POST"])
def addCamper():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into campers (parent_id, firstName, lastName, gender, dob, grade, school, "
                   "shirtSize, numShirts, paid) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                   (data["parent_id"], data["firstName"], data["lastName"], data["gender"], data["dob"],
                    data["grade"], data["school"], data["shirtSize"], data["numShirts"], data["paid"]))
    cursor.close()
    return jsonify({"status": "success", "camper_id": cursor.lastrowid})


@app.route("/campers/updateCamper/<camper_id>", methods=["PUT"])
def updateCamper(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update campers set firstName=%s, lastName=%s, gender=%s, dob=%s,  grade=%s, school=%s, "
                   "shirtSize=%s, numShirts=%s, paid=%s where id = %s",
                   (data["firstName"], data["lastName"], data["gender"], data["dob"], data["grade"],
                    data["school"], data["shirtSize"], data["numShirts"], data["paid"], camper_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/campers/deleteCamper/<camper_id>", methods=["DELETE"])
def deleteCamper(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from campers where id = %s", (camper_id,))
    cursor.close()
    return jsonify({"status": "success"})


# ADMIN
# All admin
@app.route("/admins/getAdmins")
def getAdmins():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from admins")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# An admin
@app.route("/admins/getAdmin/<admin_id>")
def getAdmin(admin_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from admins where id = %s", (admin_id,))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


# COUNSELORS' ATTENDANCE
# Attendance of all counselors
@app.route("/counselor_attendances/getAll_Counselor_Attendances")
def getCounselor_Attendances():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from counselor_attendances")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# Attendance of a counselor
@app.route("/counselor_attendances/getCounselor_AttendanceByCounselorID/<counselor_id>")
def getCounselor_AttendanceByCounselorID(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from counselor_attendances where counselor_id = %s", (counselor_id,))
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


# TODO: figure our how to update using two givens
@app.route("/counselor_attendances/updateCounselor_Attendance/<counselor_id>", methods=["PUT"])
def updateCounselor_Attendance(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update counselor_attendances set date=%s, present=%s, comment=%s where counselor_id = %s ",
                   (data["date"], data["present"], data["comment"], counselor_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/counselor_attendances/addCounselor_Attendance", methods=["POST"])
def addCounselor_Attendance():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into counselor_attendances (id, counselor_id, date, present, comment) "
                   "values (%s, %s, %s, %s, %s)",
                   (data["id"], data["counselor_id"], data["date"], data["present"], data["comment"]))
    cursor.close()
    return jsonify({"status": "success"})


# CAMPERS' ATTENDANCE
# Attendance of all campers
@app.route("/camper_attendances/getCamper_Attendances")
def getCamper_Attendances():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camper_attendances")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# Attendance of a camper
@app.route("/camper_attendances/getCamper_AttendanceByCamperID/<int:camper_id>")
def getCamper_AttendanceByCamperID(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camper_attendances where camper_id = %s", (camper_id,))
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/camper_attendances/updateCamper_Attendance/<camper_id>", methods=["PUT"])
def updateCamper_Attendance(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update camper_attendances set date=%s, present=%s, comment=%s where camper_id = %s ",
                   (data["date"], data["present"], data["comment"] if "comment" in data else "", camper_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/camper_attendances/addCamper_Attendance", methods=["POST"])
def addCamper_Attendance():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into camper_attendances (id, camper_id, date, present, pickedUp, comment) "
                   "values (%s, %s, %s, %s, %s, %s)",
                   (data["id"], data["camper_id"], data["date"], data["present"], data["pickedUp"],
                    data["comment"] if "comment" in data else ""))
    cursor.close()
    return jsonify({"status": "success"})


# CAMP WEEKS
# All camp weeks
@app.route("/camp_weeks/getCamp_Weeks")
def getCamp_Weeks():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camp_weeks")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/camp_weeks/getCamp_WeeksCurrentYear")
def getCamp_WeeksCurrentYear():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camp_weeks where YEAR(start) = YEAR(CURDATE()) order by start")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# A camp week
@app.route("/camp_weeks/getCamp_Week/<int:camp_weeks_id>")
def getCamp_Week(camp_weeks_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camp_weeks where id = %s", (camp_weeks_id,))
    rows = cursor.fetchone()
    cursor.close()
    return jsonify(rows)


@app.route("/camp_weeks/updateCamp_Weeks/<int:camp_week_id>", methods=["PUT"])
def updateCamp_Week(camp_week_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update camp_weeks set term=%s, name=%s, start=%s, end=%s, earlyCost=%s, regularCost=%s, "
                   "earlyCutOff=%s where id = %s ",
                   (data["term"], data["name"], data["start"], data["end"], data["earlyCost"], data["regularCost"],
                    data["earlyCutOff"], camp_week_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/camp_weeks/addCamp_Weeks", methods=["POST"])
def addCamp_Week():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into camp_weeks (term, name, start, end, earlyCost, regularCost, earlyCutOff) "
                   "values (%s, %s, %s, %s, %s, %s, %s)",
                   (data["term"], data["name"], data["start"], data["end"], data["earlyCost"], data["regularCost"],
                    data["earlyCutOff"]))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/camp_weeks/deleteCamp_Weeks/<int:camp_week_id>", methods=["DELETE"])
def deleteCamp_Week(camp_week_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from camp_weeks where id = %s ", (camp_week_id,))
    cursor.close()
    return jsonify({"status": "success"})


# REGISTERED CAMPER WEEKS
@app.route("/registered_camper_weeks/getRegistered_Camper_Weeks")
def getRegistered_Camper_Weeks():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_camper_weeks")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_camper_weeks/getRegistered_Camper_WeekByCamperID/<camper_id>")
def getRegistered_Camper_WeekByCamperID(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_camper_weeks where camper_id = %s", (camper_id,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_camper_weeks/getRegistered_Camper_WeekByCampWeekId/<camp_week_id>")
def getRegistered_Camper_WeekByCampWeekId(camp_week_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_camper_weeks where camp_week_id = %s", (camp_week_id,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_camper_weeks/getRegistered_Camper_WeekByGroupId/<group_id>")
def getRegistered_Camper_WeekByGroupId(group_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_camper_weeks where group_id = %s", (group_id,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# regsitered_camper_weeks join with campers
@app.route("/registered_camper_weeks/getRegistered_Camper_WeeksWithCampers")
def getRegistered_Camper_WeeksWithCampers():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select r.*, c.firstName as firstName, c.lastName as lastName, c.grade as grade, "
                   "c.gender as gender from registered_camper_weeks r, campers c where r.camper_id = c.id")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# regsitered_camper_weeks join with camp_weeks
@app.route("/registered_camper_weeks/getRegistered_Camper_WeeksWithCamp_WeeksByCamperID/<camper_id>")
def getRegistered_Camper_WeeksWithCamp_Weeks(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select t2.id as camp_week_id, name, start, end, t1.id as registered_camp_week_id from (select * "
                   "from camp_weeks where YEAR(start) = YEAR(CURDATE())) t2 left join (select c.id as id from "
                   "camp_weeks c, registered_camper_weeks r where c.id = r.camp_week_id and r.camper_id = %s and "
                   "YEAR(start) = YEAR(CURDATE())) t1 on t1.id = t2.id order by start", (camper_id,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_camper_weeks/updateRegistered_Camper_Week/<int:registered_camper_weeks_id>",
           methods=["PUT"])
def updateRegistered_Camper_Weeks(registered_camper_weeks_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update registered_camper_weeks set camper_id=%s, camp_week_id=%s, group_id=%s where id = %s ",
                   (data["camper_id"], data["camp_week_id"], data["group_id"], registered_camper_weeks_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/registered_camper_weeks/addRegistered_Camper_Week", methods=["POST"])
def addRegistered_Camper_Week():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into registered_camper_weeks (camper_id, camp_week_id, group_id) "
                   "values (%s, %s, %s)", (data["camper_id"], data["camp_week_id"], data["group_id"]))
    cursor.close()
    return jsonify({"status": "success", "registered_camper_weeks_id": cursor.lastrowid})


@app.route("/registered_camper_weeks/deleteRegistered_Camper_Week/<int:registered_camper_weeks_id>", methods=["DELETE"])
def deleteRegistered_Camper_Week(registered_camper_weeks_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from registered_camper_weeks where id = %s ", (registered_camper_weeks_id,))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/registered_camper_weeks/deleteRegistered_Camper_WeekByCampWeek/<int:camp_week_id>", methods=["DELETE"])
def deleteRegistered_Camper_WeekByCampWeek(camp_week_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from registered_camper_weeks where camp_week_id = %s ", (camp_week_id,))
    cursor.close()
    return jsonify({"status": "success"})



@app.route("/registered_camper_weeks/getRegistered_Camper_WeekWithCamperIdAndCampWeekId/<int:camp_week_id>/"
           "<int:camper_id>")
def getRegistered_Camper_WeekWithCamperIdAndCampWeekId(camp_week_id, camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_camper_weeks where camp_week_id = %s and camper_id = %s ", (camp_week_id,
                                                                                                       camper_id))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_camper_weeks/deleteRegistered_Camper_WeekWithCamperIdAndCampWeekId/<int:camp_week_id>/"
           "<int:camper_id>", methods=["DELETE"])
def deleteRegistered_Camper_WeekWithCamperIdAndCampWeekId(camp_week_id, camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from registered_camper_weeks where camp_week_id = %s and camper_id = %s ", (camp_week_id,
                                                                                                       camper_id))
    cursor.close()
    return jsonify({"status": "success"})


# REGISTERED COUNSELOR WEEKS
@app.route("/registered_couselor_weeks/getRegistered_Counselor_Weeks")
def getRegistered_Counselor_Weeks():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_counselor_weeks")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_couselor_weeks/getRegistered_Counselor_WeekByCounselorID/<counselor_id>")
def getRegistered_Counselor_WeekByCounselorID(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from registered_counselor_weeks where counselor_id = %s", (counselor_id,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)

# registered_counselor_weeks join with counselor
@app.route("/registered_counselor_weeks/getRegistered_Counselor_WeeksWithCounselors")
def getRegistered_Counselor_WeeksWithCounselors():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select r.*, c.firstName as firstName, c.lastName as lastName from registered_counselor_weeks r, "
                   "counselors c where r.counselor_id = c.id")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/registered_counselor_weeks/updateRegistered_Counselor_Week/<int:registered_counselor_weeks_id>",
           methods=["PUT"])
def updateRegistered_Counselor_Weeks(registered_counselor_weeks_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update registered_counselor_weeks set counselor_id=%s, camp_week_id=%s, group_id=%s where id = %s ",
                   (data["counselor_id"], data["camp_week_id"], data["group_id"], registered_counselor_weeks_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/registered_counselor_weeks/addRegistered_Counselor_Week", methods=["POST"])
def addRegistered_Counselor_Week():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into registered_counselor_weeks (counselor_id, camp_week_id, group_id) "
                   "values (%s, %s, %s)",
                   (data["counselor_id"], data["camp_week_id"], data["group_id"]))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/registered_counselor_weeks/deleteRegistered_Counselor_Week/<int:registered_counselor_weeks_id>",
           methods=["DELETE"])
def deleteRegistered_Counselor_Week(registered_counselor_weeks_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from registered_counselor_weeks where id = %s ", (registered_counselor_weeks_id,))
    cursor.close()
    return jsonify({"status": "success"})



# CAMPERS' MEDICAL RECORDS
@app.route("/camper_medical_records/getCamper_Medical_Records")
def getAllCamper_Medical_Records():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camper_medical_records")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/camper_medical_records/getCamper_Medical_RecordByCamperID/<int:camper_id>")
def getCamper_Medical_RecordByCamperID(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from camper_medical_records where camper_id = %s", (camper_id,))
    rows = cursor.fetchone()
    cursor.close()
    return jsonify(rows)


@app.route("/camper_medical_records/updateCamper_Medical_Record/<int:camper_id>", methods=["PUT"])
def updateCamper_Medical_Record(camper_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update camper_medical_records set doctorName=%s, doctorPhone=%s, insuranceCarrier=%s, "
                   "policyHolder=%s, allergies=%s, restrictedActivities=%s, illnesses=%s, immunizations=%s, "
                   "medicalTreatments=%s, medications=%s, tetanusDate=%s, comments=%s where camper_id = %s ",
                   (data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
                    data["policyHolder"], data["allergies"], data["restrictedActivities"], data["illnesses"],
                    data["immunizations"], data["medicalTreatments"], data["medications"],
                    data["tetanusDate"], data["comments"], camper_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/camper_medical_records/addCamper_Medical_Record", methods=["POST"])
def addCamper_Medical_Record():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into camper_medical_records (camper_id, doctorName, doctorPhone, insuranceCarrier, "
                   "policyHolder, allergies, restrictedActivities, illnesses, immunizations, medicalTreatments,"
                   "medications, tetanusDate, comments) "
                   "values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s)",
                   (data["camper_id"], data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
                    data["policyHolder"], data["allergies"], data["restrictedActivities"], data["illnesses"],
                    data["immunizations"], data["medicalTreatments"], data["medications"],
                    data["tetanusDate"], data["comments"]))
    cursor.close()
    return jsonify({"status": "success"})


# COUNSELORS' MEDICAL RECORDS
@app.route("/counselor_medical_records/getCounselor_Medical_Records")
def getAllCounselor_Medical_Records():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from counselor_medical_records")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/counselor_medical_records/getCounselor_Medical_RecordByCounselorID/<counselor_id>")
def getCounselor_Medical_RecordByCounselorID(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from counselor_medical_records where counselor_id = %s", (counselor_id,))
    rows = cursor.fetchone()
    cursor.close()
    return jsonify(rows)


@app.route("/counselor_medical_records/updateCounselor_Medical_Record/<counselor_id>", methods=["PUT"])
def updateCounselor_Medical_Record(counselor_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update counselor_medical_records set doctorName=%s, doctorPhone=%s, insuranceCarrier=%s, "
                   "policyHolder=%s, illnesses=%s, allergies=%s, immunizations=%s, medications=%s, "
                   "accommodations=%s where counselor_id = %s ",
                   (data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
                    data["policyHolder"], data["illnesses"], data["allergies"], data["immunizations"],
                    data["medications"], data["accommodations"], counselor_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/counselor_medical_records/addCounselor_Medical_Record", methods=["POST"])
def addCounselor_Medical_Record():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute(
        "insert into counselor_medical_records (counselor_id, doctorName, doctorPhone, insuranceCarrier, "
        "policyHolder, illnesses, allergies, immunizations, medications, accommodations) "
        "values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (data["counselor_id"], data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
         data["policyHolder"], data["illnesses"], data["allergies"], data["immunizations"],
         data["medications"], data["accommodations"]))
    cursor.close()
    return jsonify({"status": "success"})


# CAMP GROUPS
# All groups
@app.route("/groups/getGroups")
def getGroups():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from `groups`")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/groups/getGroupsWithCampWeeks")
def getGroupsWithCampWeeks():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select `groups`.id as id, `groups`.name as name, camperLimit, camp_week_id, camp_weeks.name as "
                   "camp_week_name from `groups`, camp_weeks where `groups`.camp_week_id = camp_weeks.id")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/groups/getGroupsByCampWeekIDAndName/<camp_week_id>/<group_name>")
def getGroupsByCampWeekIDAndName(camp_week_id, group_name):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"select * from `groups` where camp_week_id = %s and name LIKE '{group_name}%'", (camp_week_id,))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/groups/getNumOfCampersInGroup/<group_id>")
def getNumOfCampersInGroup(group_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select count(id) as camperCount from registered_camper_weeks where group_id = %s", (group_id,))
    rows = cursor.fetchone()
    cursor.close()
    return jsonify(rows)


# A group
@app.route("/groups/getGroup/<int:group_id>")
def getGroup(group_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from `groups` where id = %s", (group_id,))
    rows = cursor.fetchone()
    cursor.close()
    return jsonify(rows)


@app.route("/groups/updateGroup/<int:group_id>", methods=["PUT"])
def updateGroup(group_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update `groups` set name=%s, camp_week_id=%s, camperLimit=%s where id = %s ",
                   (data["name"], data["camp_week_id"], data["camperLimit"], group_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/groups/addGroup", methods=["POST"])
def addGroup():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into `groups` (name, camp_week_id, camperLimit) values (%s, %s,%s)",
                   (data["name"], data["camp_week_id"], data["camperLimit"]))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/groups/deleteGroup/<int:group_id>", methods=["DELETE"])
def deleteGroup(group_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from `groups` where id = %s ", (group_id,))
    cursor.close()
    return jsonify({"status": "success"})


# EMERGENCY CONTACTS
@app.route("/emergency_contacts/getEmergency_Contacts")
def getEmergency_Contact():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from emergency_contacts")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


@app.route("/emergency_contacts/getEmergency_ContactsByUserID/<user_id>")
def getEmergency_ContactByUserID(user_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from emergency_contacts where user_id = %s", (user_id,))
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/emergency_contacts/updateEmergency_Contact/<emergency_contact_id>", methods=["PUT"])
def updateEmergency_Contact(emergency_contact_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update emergency_contacts set firstName=%s, lastName=%s, relation=%s, phone=%s, "
                   "authPickUp=%s where id = %s ", (data["firstName"], data["lastName"], data["relation"],
                                                    data["phone"], data["authPickUp"], emergency_contact_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/emergency_contacts/addEmergency_Contact", methods=["POST"])
def addEmergency_Contact():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into emergency_contacts (user_id, firstName, lastName, relation, phone, authPickUp) "
                   "values (%s, %s, %s, %s, %s, %s)",
                   (data["user_id"], data["firstName"], data["lastName"], data["relation"],
                    data["phone"], data["authPickUp"]))
    cursor.close()
    return jsonify({"status": "success"})


# PAYMENT INFORMATION
@app.route("/payment_informations/getPayment_Informations")
def getPayment_informations():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from payment_informations")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/payment_informations/getBasicPayment_InformationsWithUserInfo")
def getBasicPayment_InformationsWithUserInfo():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select distinct email, firstName, lastName, totalCost, totalPaidUSD, totalPaidCredit, "
                   "transactionTime from payment_informations, parents where payment_informations.user_id = "
                   "parents.id order by transactionTime desc")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/payment_informations/getPayment_InformationByUser_id/<user_id>")
def getPayment_InformationByUser_id(user_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select distinct totalCost, totalPaidUSD, totalPaidCredit, transactionTime "
                   "from payment_informations "
                   "where user_id = %s order by transactionTime desc", (user_id,))
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/payment_informations/getBasicPayment_InformationsWithUserInfoAndRegisteredCamperWeeks/")
def getBasicPayment_InformationsWithUserInfoAndRegisteredCamperWeeks():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select distinct email, firstName, lastName, totalCost, totalPaidUSD, totalPaidCredit, transactionTime, registered_camper_weeks_id "
                   "from payment_informations, parents "
                   "where payment_informations.user_id = parents.id order by transactionTime desc")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/payment_informations/getPayment_InformationByUserIDAndRegisteredCamperWeekID/<user_id>/<registered_camper_weeks_id>")
def getPayment_InformationByUser_idAndRegisteredCamperWeekID(user_id, registered_camper_weeks_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from payment_informations where user_id = %s and registered_camper_weeks_id = %s",
                   (user_id, registered_camper_weeks_id))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/payment_informations/campers/getPaymentInformationsAndCampers/<user_id>")
def getPayment_InformationAndCampersWithUserId(user_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select p.id, user_id, p.registered_camper_weeks_id, p.numShirts, p.totalCost, p.totalPaidUSD, "
                   "p.totalPaidCredit, p.transactionTime, t1.id, t1.firstName, t1.lastName "
                   "from payment_informations p, (select r.id, r.camper_id, c.firstName, c.lastName"
                                                " from registered_camper_weeks r, campers c "
                                                "where r.camper_id = c.id) t1 "
                   "where p.registered_camper_weeks_id = t1.id")
    row = cursor.fetchall()
    cursor.close()
    return jsonify(row)


@app.route("/payment_informations/addPayment_Information", methods=["POST"])
def addPayment_informations():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into payment_informations (user_id, registered_camper_weeks_id, numShirts, totalCost, "
                   "totalPaidUSD, totalPaidCredit, transactionTime) "
                   "values (%s, %s, %s, %s, %s, %s, %s)",
                   (data["user_id"], data["registered_camper_weeks_id"] if "registered_camper_weeks_id" in data else
                   None, data["numShirts"], data["totalCost"], data["totalPaidUSD"], data["totalPaidCredit"],
                    data["transactionTime"]))
    cursor.close()
    return jsonify({"status": "success"})


# SHIRTS
# All shirts
@app.route("/shirts/getShirts")
def getShirts():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from shirts")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(rows)


# A shirt
@app.route("/shirts/getShirt/<shirt_id>")
def getShirt(shirt_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from shirts where id = %s", (shirt_id,))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/shirts/getShirtByShirtNameAndSize/<shirt_name>/<shirt_size>")
def getShirtByShirtNameAndSize(shirt_name, shirt_size):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("select * from shirts where name = %s and size = %s ", (shirt_name, shirt_size))
    row = cursor.fetchone()
    cursor.close()
    return jsonify(row)


@app.route("/shirts/updateShirt/<shirt_id>", methods=["PUT"])
def updateShirt(shirt_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("update shirts set name=%s, size=%s, price=%s where id = %s ",
                   (data["name"], data["size"], data["price"], shirt_id))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/shirts/addShirt", methods=["POST"])
def addShirt():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    cursor.execute("insert into shirts (name, size, price) "
                   "values (%s, %s, %s)",
                   (data["name"], data["size"], data["price"]))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/shirts/deleteShirt/<shirt_id>", methods=["DELETE"])
def deleteShirt(shirt_id):
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("delete from shirts where id = %s ", (shirt_id,))
    cursor.close()
    return jsonify({"status": "success"})


@app.route("/emails/sendRegistrationEmail", methods=["POST"])
def send_registration_email():
    db = mysql.connector.connect(**config)
    cursor = db.cursor(dictionary=True)
    data = request.get_json()
    sendRegistrationEmail(data["sendToEmail"], data["camperName"], data["weekDetails"], data["total"], data["totalPaidUSD"], data["totalPaidCredit"])
    cursor.close()
    return jsonify({"status": "success"})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=os.environ.get("PORT", 8080))
