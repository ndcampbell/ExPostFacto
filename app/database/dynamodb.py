import time
import boto3
from boto3.dynamodb.conditions import Attr, Key
from botocore.exceptions import ClientError

class Groups:
    def __init__(self):
        self.tablename = 'epf-groups'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def create_group(self, group=None):
        try:
            self.table.put_item(
                Item={
                        'groupId': board,
                    },
                ConditionExpression=Attr('groupId').ne(group)
                )
            return True
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print('group {} already exists'.format(group))
            else:
                raise
            return False

    def list_groups(self):
        self.grouplist = []
        for item in self.table.scan()['Items']:
            self.boardlist.append(item['groupId'])
        return self.grouplist


    def create_table(self):
        try:
            table = self.resource.create_table(
                        TableName = self.tablename,
                        KeySchema = [ 
                            {
                                'AttributeName': 'groupId',
                                'KeyType': 'HASH'
                           }
                        ],
                        AttributeDefinitions=[
                            {
                                'AttributeName': 'boardId',
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
                        'group': group,
                        'timestamp': str(time.time())
                    },
                ConditionExpression=Attr('boardId').ne(board) & Attr('group').ne(group)
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
        query_r = self.table.scan(
            #KeyConditionExpression=Attr('group').eq(group)
            FilterExpression=Attr('group').eq(group)
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
                                'AttributeName': 'boardId',
                                'KeyType': 'HASH'
                           }
                        ],
                        AttributeDefinitions=[
                            {
                                'AttributeName': 'boardId',
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
    board.create_board(group='test', board='test')


