from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os
from config import config
from PrefixMiddleware import PrefixMiddleware

app = Flask(__name__)
app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix='/api')
CORS(app)

db = mysql.connector.connect(**config)

cursor = db.cursor(dictionary=True)


@app.route("/")
def hello():
    return "Hello World!"


# @app.route("/api/users/getUsers")
# def api():
#     cursor.execute("select * from users")
#     rows = cursor.fetchall()
#     return jsonify(rows)


# USERS
# All users
@app.route("/users/getUsers")
def getUsers():
    cursor.execute("select * from users")
    rows = cursor.fetchall()
    return jsonify(rows)


# A user
@app.route("/users/getUser/<user_id>")
def getUser(user_id):
    cursor.execute("select * from users where id = %s", (user_id,))
    row = cursor.fetchone()
    return jsonify(row)


@app.route("/users/addUser", methods=["POST"])
def addUser():
    data = request.get_json()
    cursor.execute("insert into users (id, email, role) values (%s, %s, %s)",
                   (data["id"], data["email"], data["role"]))
    return jsonify({"status": "success"})


# PARENTS
# All parents
@app.route("/parents/getParents")
def getParents():
    cursor.execute("select * from parents")
    rows = cursor.fetchall()
    return jsonify(rows)


# A parent
@app.route("/parents/getParent/<parent_id>")
def getParent(parent_id):
    cursor.execute("select * from parents where id = %s", (parent_id,))
    row = cursor.fetchone()
    return jsonify(row)

@app.route("/parents/addParent", methods=["POST"])
def addParent():
    data = request.get_json()
    cursor.execute("insert into parents (id, email, firstName, lastName, phone, addressLine1, addressLine2, city, "
                "zipCode, state, country) values (%s, %s, %s, %s, %s, %s,%s, %s, %s,%s, %s)",
                (data["id"], data["email"], data["firstName"], data["lastName"], data["phone"], data["addressLine1"],
                data["addressLine2"] if "addressLine2" in data else "", data["city"], data["zipCode"],
                data["state"], data["country"]))
    # db.commit()
    return jsonify({"status": "success"})

@app.route("/parents/updateParents/<parent_id>", methods=["PUT"])
def updateParents(parent_id):
    data = request.form
    cursor.execute("update parents set firstName=%s, lastName=%s, phone=%s, addressLine1=%s, addressLine2=%s, city=%s, "
                   "zipCode=%s, state=%s, country=%s where id = %s",
                   (data["firstName"], data["lastName"], data["phone"], data["addressLine1"],
                    data["addressLine2"] if "addressLine2" in data else "", data["city"], data["zipCode"],
                    data["state"], data["country"], parent_id))
    # db.commit()
    return jsonify({"status": "success"})



# COUNSELORS
# All counselors
@app.route("/counselors/getCounselors")
def getCounselors():
    cursor.execute("select * from counselors")
    rows = cursor.fetchall()
    return jsonify(rows)


# A counselor
@app.route("/counselors/getCounselor/<counselor_id>")
def getCounselor(counselor_id):
    cursor.execute("select * from counselors where id = %s", (counselor_id,))
    row = cursor.fetchone()
    return jsonify(row)


@app.route("/counselors/addCounselor", methods=["POST"])
def addCounselor():
    data = request.form
    cursor.execute("insert into counselors (id, email, firstName, lastName, gender, dob, phone, altphone, "
                   "approved, active) values (%s, %s, %s, %s, %s, %s,%s, %s, %s,%s)",
                   (data["id"], data["email"], data["firstName"], data["lastName"], data["gender"], data["dob"],
                    data["phone"], data["altphone"], data["approved"], data["active"]))
    # db.commit()
    return jsonify({"status": "success"})


@app.route("/counselors/updateCounselors/<counselor_id>", methods=["PUT"])
def updateCounselors(counselor_id):
    data = request.form
    cursor.execute("update counselors set email=%s, firstName=%s, lastName=%s, gender=%s, dob=%s, phone=%s,"
                   " altphone=%s,approved=%s, active=%s where id = %s",
                   (data["email"], data["firstName"], data["lastName"], data["gender"], data["dob"],
                    data["phone"], data["altphone"], data["approved"], data["active"], counselor_id))
    # db.commit()
    return jsonify({"status": "success"})


# CAMPERS
# All campers
@app.route("/campers/getCampers")
def getCampers():
    cursor.execute("select * from campers")
    rows = cursor.fetchall()
    return jsonify(rows)

# A camper
@app.route("/campers/getCamper/<camper_id>")
def getCamper(camper_id):
    cursor.execute("select * from campers where id = %s", (camper_id,))
    row = cursor.fetchone()
    return jsonify(row)


@app.route("/campers/addCamper", methods=["POST"])
def addCamper():
    data = request.form
    cursor.execute("insert into campers (id, parent_id, firstName, lastName, gender, dob, grade, school, "
                   "shirtSize, credit, numShirts,paid) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                   (data["id"], data["parent_id"], data["firstName"], data["lastName"], data["gender"], data["dob"],
                    data["grade"], data["school"], data["shirtSize"], data["credit"], data["numShirts"], data["paid"]))
    # db.commit()
    return jsonify({"status": "success"})


@app.route("/campers/updateCampers/<camper_id>", methods=["PUT"])
def updateCampers(camper_id):
    data = request.form
    cursor.execute("update campers set firstName=%s, lastName=%s, gender=%s, dob=%s,  grade=%s, school=%s, "
                   "shirtSize=%s, credit=%s, numShirts=%s,paid=%s where id = %s",
                   (data["firstName"], data["lastName"], data["gender"], data["dob"], data["grade"],
                    data["school"], data["shirtSize"], data["credit"], data["numShirts"], data["paid"], camper_id))
    # db.commit()
    return jsonify({"status": "success"})


@app.route("/campers/deleteCamper/<camper_id>", methods=["DELETE"])
def deleteCamper(camper_id):
    cursor.execute("delete from campers where id = %s", (camper_id,))
    # row = cursor.fetchone()
    return jsonify({"status": "success"})


# ADMIN
# All admin
@app.route("/admins/getAdmins")
def getAdmins():
    cursor.execute("select * from admins")
    rows = cursor.fetchall()
    return jsonify(rows)


# An admin
@app.route("/admins/getAdmin/<admin_id>")
def getAdmin(admin_id):
    cursor.execute("select * from admins where id = %s", (admin_id,))
    row = cursor.fetchone()
    return jsonify(row)


# COUNSELORS' ATTENDANCE
# Attendance of all counselors
@app.route("/counselor_attendances/getAll_Counselor_Attendances")
def getCounselor_Attendances():
    cursor.execute("select * from counselor_attendances")
    rows = cursor.fetchall()
    return jsonify(rows)


# Attendance of a counselor
@app.route("/counselor_attendances/getCounselor_AttendanceByCounselorID/<counselor_id>")
def getCounselor_AttendanceByCounselorID(counselor_id):
    cursor.execute("select * from counselor_attendances where counselor_id = %s", (counselor_id,))
    row = cursor.fetchone()
    return jsonify(row)


# TODO: figure out if "comment" in data
@app.route("/counselor_attendances/updateCounselor_Attendance/<counselor_id>", methods=["PUT"])
def updateCounselor_Attendance(counselor_id):
    data = request.form
    cursor.execute("update counselor_attendances set date=%s, present=%s, comment=%s where counselor_id = %s ",
                   (data["date"], data["present"], data["comment"] if "comment" in data else "", counselor_id))

    return jsonify({"status": "success"})


# TODO: figure out how to fix counselor attendance (works but doesn't have data["comment"] if "comment" in data else "")
@app.route("/counselor_attendances/addCounselor_Attendance", methods=["POST"])
def addCounselor_Attendance():
    data = request.form
    cursor.execute("insert into counselor_attendances (id, counselor_id, date, present) "
                   "values (%s, %s, %s, %s)",
                   (data["id"], data["counselor_id"], data["date"], data["present"]))
    # db.commit()
    return jsonify({"status": "success"})


# CAMPERS' ATTENDANCE
# Attendance of all campers
@app.route("/camper_attendances/getAll_Camper_Attendances")
def getCamper_Attendances():
    cursor.execute("select * from camper_attendances")
    rows = cursor.fetchall()
    return jsonify(rows)


# Attendance of a camper
@app.route("/camper_attendances/getCamper_AttendanceByCamperID/<int:camper_id>")
def getCamper_AttendanceByCamperID(camper_id):
    cursor.execute("select * from camper_attendances where camper_id = %s", (camper_id,))
    row = cursor.fetchone()
    return jsonify(row)


@app.route("/camper_attendances/updateCamper_Attendance/<camper_id>", methods=["PUT"])
def updateCamper_Attendance(camper_id):
    data = request.form
    cursor.execute("update camper_attendances set date=%s, present=%s, comment=%s where camper_id = %s ",
                   (data["date"], data["present"], data["comment"] if "comment" in data else "", camper_id))

    return jsonify({"status": "success"})


@app.route("/camper_attendances/addCamper_Attendance", methods=["POST"])
def addCamper_Attendance():
    data = request.form
    cursor.execute("insert into camper_attendances (id, camper_id, date, present, pickedUp, comment) "
                   "values (%s, %s, %s, %s, %s, %s)",
                   (data["id"], data["camper_id"], data["date"], data["present"], data["pickedUp"],
                    data["comment"] if "comment" in data else ""))
    # db.commit()
    return jsonify({"status": "success"})


# CAMP WEEKS
# All camp weeks
@app.route("/camp_weeks/getAllCamp_Weeks")
def getCamp_Weeks():
    cursor.execute("select * from camp_weeks")
    rows = cursor.fetchall()
    return jsonify(rows)


# A camp week
@app.route("/camp_weeks/getCamp_Week/<int:camp_weeks_id>")
def getCamp_Week(camp_weeks_id):
    cursor.execute("select * from camp_weeks where id = %s", (camp_weeks_id,))
    rows = cursor.fetchone()
    return jsonify(rows)


@app.route("/camp_weeks/updateCamp_Weeks/<int:camp_week_id>", methods=["PUT"])
def updateCamp_Week(camp_week_id):
    data = request.form
    cursor.execute("update camp_weeks set name=%s, start=%s, end=%s, cost=%s where id = %s ",
                   (data["name"], data["start"], data["end"], data["cost"], camp_week_id))

    return jsonify({"status": "success"})


@app.route("/camp_weeks/addCamp_Weeks", methods=["POST"])
def addCamp_Week():
    data = request.form
    cursor.execute("insert into camp_weeks (id, name, start, end, cost) "
                   "values (%s, %s, %s, %s, %s)",
                   (data["id"], data["name"], data["start"], data["end"], data["cost"]))
    # db.commit()
    return jsonify({"status": "success"})


@app.route("/camp_weeks/deleteCamp_Weeks/<int:camp_week_id>", methods=["DELETE"])
def deleteCamp_Week(camp_week_id):
    cursor.execute("delete from camp_weeks where id = %s ", (camp_week_id,))

    return jsonify({"status": "success"})


# REGISTERED CAMPER WEEKS
@app.route("/registered_camper_weeks/getAllRegistered_Camper_Weeks")
def getALlRegistered_Camper_Weeks():
    cursor.execute("select * from registered_camper_weeks")
    rows = cursor.fetchone()
    return jsonify(rows)


@app.route("/registered_camper_weeks/getRegistered_Camper_WeekByCamperID/<camper_id>")
def getRegistered_Camper_WeekByCamperID(camper_id):
    cursor.execute("select * from registered_camper_weeks where camper_id = %s", (camper_id,))
    rows = cursor.fetchone()
    return jsonify(rows)


@app.route("/registered_camper_weeks/addRegistered_Camper_Week", methods=["POST"])
def addRegistered_Camper_Week():
    data = request.form
    cursor.execute("insert into registered_camper_weeks (id, camper_id, camp_week_id) "
                   "values (%s, %s, %s)", (data["id"], data["camper_id"], data["camp_week_id"]))
    # db.commit()
    return jsonify({"status": "success"})


# REGISTERED COUNSELOR WEEKS
@app.route("/registered_couselor_weeks/getAllRegistered_Counselor_Weeks")
def getALlRegistered_Counselor_Weeks():
    cursor.execute("select * from registered_counselor_weeks")
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/registered_couselor_weeks/getRegistered_Counselor_WeekByCounselorID/<counselor_id>")
def getRegistered_Counselor_WeekByCounselorID(counselor_id):
    cursor.execute("select * from registered_counselor_weeks where counselor_id = %s", (counselor_id,))
    rows = cursor.fetchone()
    return jsonify(rows)


@app.route("/registered_counselor_weeks/updateRegistered_Counselor_Week/<int:registered_counselor_weeks_id>",
           methods=["PUT"])
def updateRegistered_Counselor_Weeks(registered_counselor_weeks_id):
    data = request.form
    cursor.execute("update registered_counselor_weeks set counselor_id=%s, camp_week_id=%s where id = %s ",
                   (data["counselor_id"], data["camp_week_id"], registered_counselor_weeks_id))

    return jsonify({"status": "success"})


@app.route("/registered_counselor_weeks/addRegistered_Counselor_Week", methods=["POST"])
def addRegistered_Counselor_Week():
    data = request.form
    cursor.execute("insert into registered_counselor_weeks (id, counselor_id, camp_week_id) "
                   "values (%s, %s, %s)",
                   (data["id"], data["counselor_id"], data["camp_week_id"]))
    # db.commit()
    return jsonify({"status": "success"})


# CAMPERS' MEDICAL RECORDS
@app.route("/camper_medical_records/getAllCamper_Medical_Records")
def getAllCamper_Medical_Records():
    cursor.execute("select * from camper_medical_records")
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/camper_medical_records/getCamper_Medical_RecordByCamperID/<int:camper_id>")
def getCamper_Medical_RecordByCamperID(camper_id):
    cursor.execute("select * from camper_medical_records where id = %s", (camper_id,))
    rows = cursor.fetchone()
    return jsonify(rows)


@app.route("/camper_medical_records/updateCamper_Medical_Record/<int:camper_id>", methods=["PUT"])
def updateCamper_Medical_Record(camper_id):
    data = request.form
    cursor.execute("update camper_medical_records set doctorName=%s, doctorPhone=%s, insuranceCarrier=%s, "
                   "policyHolder=%s, allergies=%s, restrictedActivities=%s, illnesses=%s, immunizations=%s, "
                   "medicalTreatments=%s, medications=%s, tetanusDate=%s, comments=%s where camper_id = %s ",
                   (data["restrictedActivities"], data["allergies"], data["doctorName"],
                    data["doctorPhone"], data["insuranceCarrier"], data["policyHolder"], data["illnesses"],
                    data["immunizations"], data["medicalTreatments"], data["medications"],
                    data["tetanusDate"], data["comments"] if "comments" in data else "", camper_id))

    return jsonify({"status": "success"})


@app.route("/camper_medical_records/addCamper_Medical_Record", methods=["POST"])
def addCamper_Medical_Record():
    data = request.form
    cursor.execute("insert into camper_medical_records (id, camper_id, doctorName, doctorPhone, insuranceCarrier, "
                   "policyHolder, allergies, restrictedActivities, illnesses, immunizations, medicalTreatments,"
                   "medications, tetanusDate, comments) "
                   "values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s)",
                   (data["id"], data["camper_id"], data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
                    data["policyHolder"], data["allergies"], data["restrictedActivities"], data["illnesses"],
                    data["immunizations"], data["medicalTreatments"], data["medications"],
                    data["tetanusDate"], data["comments"] if "comments" in data else ""))
    # db.commit()
    return jsonify({"status": "success"})


# COUNSELORS' MEDICAL RECORDS
@app.route("/counselor_medical_records/getAllCounselor_Medical_Records")
def getAllCounselor_Medical_Records():
    cursor.execute("select * from counselor_medical_records")
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/counselor_medical_records/getCounselor_Medical_RecordByCounselorID/<counselor_id>")
def getCounselor_Medical_RecordByCounselorID(counselor_id):
    cursor.execute("select * from counselor_medical_records where counselor_id = %s", (counselor_id,))
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/counselor_medical_records/updateCounselor_Medical_Record/<counselor_id>", methods=["PUT"])
def updateCounselor_Medical_Record(counselor_id):
    data = request.form
    cursor.execute("update counselor_medical_records set doctorName=%s, doctorPhone=%s, insuranceCarrier=%s, "
                   "policyHolder=%s, illnesses=%s, allergies=%s, immunizations=%s, medications=%s, "
                   "accommodations=%s where counselor_id = %s ",
                   (data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
                    data["policyHolder"], data["illnesses"], data["allergies"], data["immunizations"],
                    data["medications"], data["accommodations"], counselor_id))

    return jsonify({"status": "success"})


@app.route("/counselor_medical_records/addCounselor_Medical_Record", methods=["POST"])
def addCounselor_Medical_Record():
    data = request.form
    cursor.execute(
        "insert into counselor_medical_records (id, counselor_id, doctorName, doctorPhone, insuranceCarrier, "
        "policyHolder, illnesses, allergies, immunizations, medications, accommodations) "
        "values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (data["id"], data["counselor_id"], data["doctorName"], data["doctorPhone"], data["insuranceCarrier"],
         data["policyHolder"], data["illnesses"], data["allergies"], data["immunizations"],
         data["medications"], data["accommodations"]))
    # db.commit()
    return jsonify({"status": "success"})


# CAMP GROUPS
# All groups
@app.route("/groups/getGroups")
def getGroups():
    cursor.execute("select * from `groups`")
    rows = cursor.fetchall()
    return jsonify(rows)


# A group
@app.route("/groups/getGroup/<int:group_id>")
def getGroup(group_id):
    cursor.execute("select * from `groups` where id = %s", (group_id,))
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/groups/updateGroup/<int:group_id>", methods=["PUT"])
def updateGroup(group_id):
    data = request.form
    cursor.execute("update `groups` set name=%s, camperLimit=%s where id = %s ",
                   (data["name"], data["camperLimit"], group_id))

    return jsonify({"status": "success"})


@app.route("/groups/addGroup", methods=["POST"])
def addGroup():
    data = request.form
    cursor.execute("insert into `groups` (id, name, camperLimit) "
                   "values (%s, %s, %s)",
                   (data["id"], data["name"], data["camperLimit"]))
    # db.commit()
    return jsonify({"status": "success"})


@app.route("/groups/deleteGroup/<int:group_id>", methods=["DELETE"])
def deleteGroup(group_id):
    cursor.execute("delete from `groups` where id = %s ", (group_id,))

    return jsonify({"status": "success"})


# EMERGENCY CONTACTS
@app.route("/emergency_contacts/getEmergency_Contact")
def getEmergency_Contact():
    cursor.execute("select * from emergency_contacts")
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/emergency_contacts/getEmergency_ContactByUserID/<user_id>")
def getEmergency_ContactByUserID(user_id):
    cursor.execute("select * from emergency_contacts where id = %s", (user_id,))
    row = cursor.fetchone()
    return jsonify(row)


@app.route("/emergency_contacts/updateEmergency_Contact/<user_id>", methods=["PUT"])
def updateEmergency_Contact(user_id):
    data = request.form
    cursor.execute("update emergency_contacts set firstName=%s, lastName=%s, relation=%s, phone=%s, "
                   "authPickUp=%s where id = %s ", (data["firstName"], data["lastName"], data["relation"],
                                                    data["phone"], data["authPickUp"], user_id))

    return jsonify({"status": "success"})


@app.route("/emergency_contacts/addEmergency_Contact", methods=["POST"])
def addEmergency_Contact():
    data = request.form
    cursor.execute("insert into emergency_contacts (id, user_id, firstName, lastName, relation, phone, authPickUp) "
                   "values (%s, %s, %s, %s, %s, %s, %s)",
                   (data["id"], data["user_id"], data["firstName"], data["lastName"], data["relation"],
                    data["phone"], data["authPickUp"]))
    # db.commit()
    return jsonify({"status": "success"})

#TODO: Ask Justin about parameters for the getPayment_Information function
# # PAYMENT INFORMATION
# @app.route("/payment_informations/getPayment_Information")
# def getPayment_Information():
#     pass
#

# SHIRTS
# All shirts
@app.route("/shirts/getShirts")
def getShirts():
    cursor.execute("select * from shirts")
    rows = cursor.fetchall()
    return jsonify(rows)

# A shirt
@app.route("/shirts/getShirt/<shirt_id>")
def getShirt(shirt_id):
    cursor.execute("select * from shirts where id = %s", (shirt_id,))
    row = cursor.fetchone()
    return jsonify(row)


@app.route("/shirts/updateShirt/<shirt_id>", methods=["PUT"])
def updateShirt(shirt_id):
    data = request.form
    cursor.execute("update shirts set name=%s, size=%s, price=%s where id = %s ",
                   (data["name"], data["size"], data["price"], shirt_id))

    return jsonify({"status": "success"})


@app.route("/shirts/addShirt", methods=["POST"])
def addShirt():
    data = request.form
    cursor.execute("insert into shirts (id, name, size, price) "
                   "values (%s, %s, %s, %s)",
                   (data["id"], data["name"], data["size"], data["price"]))
    # db.commit()
    return jsonify({"status": "success"})


@app.route("/shirts/deleteShirt/<shirt_id>", methods=["DELETE"])
def deleteShirt(shirt_id):
    cursor.execute("delete from shirts where id = %s ", (shirt_id,))

    return jsonify({"status": "success"})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=os.environ.get("PORT", 8080))
