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

@app.route("/<group>", methods=['GET'])
def list_boards(group):
    boards=dynamodb.Boards().list_boards(group=group)
    return str(boards)

@app.route("/<group>/<board>/post", methods=['POST'])
def create_post(group, board):
    '''' Post Data: { 'postId': id, 'content': content }'''
    data = request.get_json()
    content = data['content']
    groupboard = group + board

    try:
        postId = data['postId']
    except KeyError:
        postId = None

    postId = dynamodb.Posts().upsert_post(content=content,
                                 groupboard=groupboard,
                                 postId=postId)
    return str(postId)

@app.route("/<group>/<board>/<postid>/comment", methods=['POST'])
def create_comment(group, board, postid):
    return


if __name__ == "__main__":
    app.run()
