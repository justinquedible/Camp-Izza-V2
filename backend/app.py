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
                    data["addressLine2"], data["city"], data["zipCode"], data["state"], data["country"]))
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

#TODO: Create API call to update counselors
# @app.route("counselors/updateCounselors")
# def updateCounselors():
#     pass


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

#TODO: Create API call to update campers
# @app.route("campers/updateCampers")
# def updateCampers():
#     pass

#TODO: Create API call to delete campers
# @app.route("campers/deleteCampers")
# def deleteCampers():
#     pass


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


# # COUNSELORS' ATTENDANCE
# # Attendance of all counselors
# @app.route("/counselor_attendances/getAll_Counselor_Attendances")
# def getCounselor_Attendances():
#     pass
#
# # Attendance of a counselor
# @app.route("/counselor_attendances/getCounselor_AttendanceByCounselorID/<counselor_id>")
# def getCounselor_AttendanceByCounselorID(counselor_id):
#     pass
#
# @app.route("/counselor_attendances/updateCounselor_Attendance")
# def updateCounselor_Attendance():
#     pass
#
# @app.route("/counselor_attendances/addCounselor_Attendance")
# def addCounselor_Attendance():
#     pass
#
#
# # CAMPERS' ATTENDANCE
# # Attendance of all campers
# @app.route("/counselor_attendances/getAll_Camper_Attendances")
# def getCamper_Attendances():
#     pass
#
# # Attendance of a camper
# @app.route("/camper_attendances/getCamper_AttendanceByCamperID/<camper_id>")
# def getCamper_AttendanceByCamperID(camper_id):
#     pass
#
# @app.route("/camper_attendances/updateCamper_Attendance")
# def updateCamper_Attendance():
#     pass
#
# @app.route("/camper_attendances/addCamper_Attendance")
# def addCamper_Attendance():
#     pass
#
#
# # CAMP WEEKS
# # All camp weeks
# @app.route("/counselor_attendances/getAll_Camp_Weeks")
# def getCamp_Weeks():
#     pass
#
# # A camp week
# @app.route("/camp_weeks/getCamp_Weeks")
# def getCamp_Week():
#     pass
#
# @app.route("/camp_weeks/updateCamp_Weeks")
# def updateCamp_Week():
#     pass
#
# @app.route("/camp_weeks/addCamp_Weeks")
# def addCamp_Week():
#     pass
#
#
# # REGISTERED CAMPER WEEKS
# @app.route("/registered_camper_weeks/getRegistered_Camper_WeekByCamperID/<camper_id>")
# def getRegistered_Camper_WeekByCamperID(camper_id):
#     pass
#
# @app.route("/registered_camper_weeks/addRegistered_Camper_Week")
# def addRegistered_Camper_Week():
#     pass
#
#
# # CAMPERS' MEDICAL RECORDS
# @app.route("/camper_medical_records/getCamper_Medical_RecordByCamperID/<camper_id>")
# def getCamper_Medical_RecordByCamperID(camper_id):
#     pass
#
# @app.route("/camper_medical_records/updateCamper_Medical_Record")
# def updateCamper_Medical_Record():
#     pass
#
# @app.route("/camper_medical_records/addCamper_Medical_Record")
# def addCamper_Medical_Record():
#     pass
#
#
# # COUNSELORS' MEDICAL RECORDS
# @app.route("/counselor_medical_records/getCounselor_Medical_RecordByCounselorID/<counselor_id>")
# def getCounselor_Medical_RecordByCounselorID(counselor_id):
#     pass
#
# @app.route("/counselor_medical_records/updateCounselor_Medical_Record")
# def updateCounselor_Medical_Record():
#     pass
#
# @app.route("/counselor_medical_records/addCounselor_Medical_Record")
# def addCounselor_Medical_Record():
#     pass
#
#
# # CAMP GROUPS
# # All groups
# @app.route("/groups/getGroups")
# def getGroups():
#     pass
#
# # A group
# @app.route("/groups/getGroup/<group_id>")
# def getGroup(group_id):
#     pass
#
# @app.route("/groups/updateGroup")
# def updateGroup():
#     pass
#
# @app.route("/groups/addGroup")
# def addGroup():
#     pass
#
# @app.route("/groups/removeGroup")
# def deleteGroup():
#     pass
#
#
# # EMERGENCY CONTACTS
# @app.route("/emergency_contacts/getEmergency_ContactByUserID/<user_id>")
# def getEmergency_ContactByUserID(user_id):
#     pass
#
# @app.route("/emergency_contacts/updateEmergency_Contact")
# def updateEmergency_Contact():
#     pass
#
# @app.route("/groups/addEmergency_Contact")
# def addEmergency_Contact():
#     pass
#
#
# # PAYMENT INFORMATION
# @app.route("/payment_informations/getPayment_Information")
# def getPayment_Information():
#     pass
#
#
# # SHIRTS
# # All shirts
# @app.route("/shirts/getShirts")
# def getShirts():
#     pass
#
# # A shirt
# @app.route("/shirts/getShirt")
# def getShirt():
#     pass
#
# @app.route("/shirts/updateShirt")
# def updateShirt():
#     pass
#
# @app.route("/shirts/addShirt")
# def addShirt():
#     pass


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=os.environ.get("PORT", 8080))
