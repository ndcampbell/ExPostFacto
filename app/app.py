from flask import Flask
app = Flask(__name__)

import dynamodb

@app.route("/")
def home():
    return "Welcome to Ex-Post-Facto"

@app.route("/sessions/<sessionname>")
def create_session(sessionname):
    created = dynamodb.SessionTable().create_session(session=sessionname)
    if created:
        return "Session {} was created".format(sessionname)
    else:
        return "Failed creating {} session, likely duplicate name".format(sessionname)

@app.route("/sessions")
def list_sessions():
    sessions = dynamodb.SessionTable().list_sessions()
    return str(sessions)

if __name__ == "__main__":
    app.run()
