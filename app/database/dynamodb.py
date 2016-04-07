import time
import uuid

import boto3
from boto3.dynamodb.conditions import Attr, Key
from botocore.exceptions import ClientError


class Boards:
    def __init__(self):
        self.tablename = 'epf-boards'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def create_board(self, group=None, board=None):
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
        self.boardlist = []
        query_r = self.table.query(
            KeyConditionExpression=Key('groupId').eq(group)
            )
        for item in query_r['Items']:
            self.boardlist.append(item['boardId'])
        return self.boardlist

    def create_table(self):
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

    def __init__(self):
        self.tablename = 'epf-posts'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def upsert_post(self, content='', groupboard=None, postId=None):
        if not postId:
            postId = uuid.uuid1()
        try:
            self.table.put_item(
                Item={
                        'groupboardId': groupboard,
                        'postId': postId,
                        'content': content,
                        'timestamp': str(time.time())
                    },
                ConditionExpression=Attr('groupboardId').ne(board) & Attr('postId').ne(group)
                )
            return True
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print('Board {} already exists with {} group'.format(board, group))
            else:
                raise
            return False

    def create_table(self):
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


