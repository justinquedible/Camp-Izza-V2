from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import os
from config import config

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(**config)

cursor = db.cursor(dictionary=True)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/users/getUsers")
def getUsers():
    cursor.execute("select * from users")
    rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/users/getUser/<int:user_id>")
def getUser(user_id):
    cursor.execute("select * from users where id = %s", (user_id,))
    row = cursor.fetchone()
    return jsonify(row)


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=os.environ.get("PORT", 8080))
