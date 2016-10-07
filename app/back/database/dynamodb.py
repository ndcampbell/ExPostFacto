import time
import uuid

import boto3
from boto3.dynamodb.conditions import Attr, Key
from botocore.exceptions import ClientError


class Boards:
    """ Handles functions of Boards for DynamoDB"""
    def __init__(self):
        self.tablename = 'epf-boards'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def create_board(self, group=None, board=None):
        """
        Creates a board in DynamoDB
        :param group: The name of the group to nest the board under
        :param board: The name of the board
        :return: returns true or false of board successfully created
        """
        try:
            self.table.put_item(
                Item={
                        'boardId': board,
                        'groupId': group,
                        'timestamp': str(time.time())
                    },
                ConditionExpression=Attr('boardId').ne(board) & Attr('groupId').ne(group)
                )
            return True
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print('Board {} already exists with {} group'.format(board, group))
            else:
                raise
            return False

    def list_boards(self, group=None):
        """
        Returns a list of all boards for a specific group
        :param group: the name of the group to search boards for
        :return: a list of names of boards
        """
        self.boardlist = []
        query_r = self.table.query(
            KeyConditionExpression=Key('groupId').eq(group)
            )
        for item in query_r['Items']:
            self.boardlist.append(item['boardId'])
        return self.boardlist

    def create_table(self):
        """
        Creates the table in DynamoDB
        :return:
        """
        try:
            table = self.resource.create_table(
                        TableName = self.tablename,
                        KeySchema = [ 
                            {
                                'AttributeName': 'groupId',
                                'KeyType': 'HASH'
                            },
                            {
                                'AttributeName': 'boardId',
                                'KeyType': 'RANGE'
                           }
                        ],
                        AttributeDefinitions=[
                            {
                                'AttributeName': 'boardId',
                                'AttributeType': 'S'
                            },
                            {
                                'AttributeName': 'groupId',
                                'AttributeType': 'S'
                            }
                        ],
                        ProvisionedThroughput={
                            'ReadCapacityUnits': 5,
                            'WriteCapacityUnits': 5
                        }
            )

            # Wait until the table exists.
            table.meta.client.get_waiter('table_exists').wait(TableName=self.tablename)
        except ClientError:
            print("Table {} already exists".format(self.tablename))


class Posts:
    """
    Handles all post related functions for DynamoDB
    """

    def __init__(self):
        self.tablename = 'epf-posts'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def list_posts(self, groupboard=None):
        """
        Returns a list of all posts for a specific group and board
        :param groupboard: This is a combination string of group + board
        :return: returns list of all dynamoDB post items for groupboard
        """
        self.postlist = []
        query_r = self.table.query(
            KeyConditionExpression=Key('groupboardId').eq(groupboard)
            )
        for item in query_r['Items']:
            self.postlist.append(item)
        return self.postlist

    def upsert_post(self, data=None):
        """
        Inserts or updates a post in DynamoDB
        :param data: Dictionary of all values to story in DynamoDB for Posts
        :return: postId of upserted post
        """
        try:
            postId = data['postId']
        except KeyError:
            #if postId does not exist, generate using uuid4, random value
            postId = str(uuid.uuid4())
            data['postId'] = postId

        data['timestamp'] = str(time.time())

        try:
            self.table.put_item(
                Item=data,
                ConditionExpression=Attr('groupboardId').ne(data['groupboardId'])
                                    & Attr('postId').ne(data['postId'])
                )
            return postId
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print('Post already exists on this board')
            else:
                raise
            return False

    def vote(self, groupboardId=None, postId=None, addpoint=True):
        cur_count = self.get_votes(groupboardId=groupboardId, postId=postId)
        if addpoint:
            votepoint = cur_count + 1
        else:
            votepoint = cur_count - 1

        response = self.table.update_item(
            Key={
                'groupboardId': groupboardId,
                'postId': postId
            },
            UpdateExpression="set votes = :v",
            ExpressionAttributeValues={
            ':v': int(votepoint)
            },
            ReturnValues="UPDATED_NEW"
        )
        return response

    def get_votes(self, groupboardId=None, postId=None):
        query_r = self.table.query(
            KeyConditionExpression=Key('groupboardId').eq(groupboardId)
                                    & Key('postId').eq(postId)
            )
        for item in query_r['Items']:
            votecount = item['votes']

        return votecount

    def create_table(self):
        """
        Creates DynamoDB post table
        :return:
        """
        try:
            table = self.resource.create_table(
                        TableName = self.tablename,
                        KeySchema = [ 
                            {
                                'AttributeName': 'groupboardId',
                                'KeyType': 'HASH'
                            },
                            {
                                'AttributeName': 'postId',
                                'KeyType': 'RANGE'
                                
                           }
                        ],
                        AttributeDefinitions=[
                            {
                                'AttributeName': 'groupboardId',
                                'AttributeType': 'S'
                            },
                            {
                                'AttributeName': 'postId',
                                'AttributeType': 'S'
                            }
                        ],
                        ProvisionedThroughput={
                            'ReadCapacityUnits': 5,
                            'WriteCapacityUnits': 5
                        }
            )

            # Wait until the table exists.
            table.meta.client.get_waiter('table_exists').wait(TableName=self.tablename)
        except ClientError:
            print("Table {} already exists".format(self.tablename))


if __name__ == '__main__':
    board = Boards()
    board.create_table()
    posts = Posts()
    posts.create_table()


