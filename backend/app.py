from flask import Flask, jsonify
import mysql.connector
import os

app = Flask(__name__)

db = mysql.connector.connect(
    host="34.94.55.153",
    user="root",
    passwd="campizza",
    database="camp_izza",
    autocommit=True
)

cursor = db.cursor()


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/users/getUsers")
def getUsers():
    cursor.execute("select * from users")
    rows = cursor.fetchall()
    return jsonify(rows)


app.run(host="0.0.0.0", port=os.environ.get("PORT", 8080))
