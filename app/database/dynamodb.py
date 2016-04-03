import time
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

class Boards:
    def __init__(self):
        self.tablename = 'epf-boards'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def create_board(self, board=None):
        try:
            self.table.put_item(
                Item={
                        'boardId': board,
                        'timestamp': str(time.time())
                    },
                ConditionExpression=Attr('boardId').ne(board)
                )
            return True
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print('Board {} already exists'.format(board))
            else:
                raise
            return False

    def list_boards(self):
        self.boardlist = []
        for item in self.table.scan()['Items']:
            self.boardlist.append(item['boardId'])
        return self.boardlist

    def create_table(self, tablename=None):
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
    boards = Boards()
    boards.create_table(tablename='epf-boards')


