from flask import Flask
app = Flask(__name__)

from database import dynamodb

@app.route("/")
def home():
    return "Welcome to Ex-Post-Facto"

@app.route("/board/<boardname>")
@app.route("/session/delete/<boardname>")
def create_board(boardname):
    created = dynamodb.Boards().create_board(board=boardname)
    if created:
        return "Board {} was created".format(boardname)
    else:
        return "Failed creating {} board, likely duplicate name".format(boardname)

@app.route("/boards")
def list_boards():
    boards = dynamodb.Boards().list_boards()
    return str(boards)

if __name__ == "__main__":
    app.run()
