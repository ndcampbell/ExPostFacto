from flask import Flask, request
app = Flask(__name__)
app.debug= True

from database import dynamodb

@app.route("/")
def home():
    return "Welcome to Ex-Post-Facto"


@app.route("/<group>/<board>", methods=['POST', 'GET'])
def create_board(group, board):
    if request.method == 'POST':
        created = dynamodb.Boards().create_board(group=group, board=board)
        if created:
            return "Board {} was created".format(board)
        else:
            return "Failed creating {} board, likely duplicate name".format(board)
    else:
        boards=dynamodb.Boards().list_boards(group=group)
        return str(boards)


if __name__ == "__main__":
    app.run()
