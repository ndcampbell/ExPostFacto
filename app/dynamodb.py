import time
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

class SessionTable:
    def __init__(self):
        self.tablename = 'epf-sessions'
        self.resource = boto3.resource('dynamodb')
        self.table = self.resource.Table(self.tablename)

    def create_session(self, session=None):
        try:
            self.table.put_item(
                Item={
                        'sessionId': session,
                        'timestamp': str(time.time())
                    },
                ConditionExpression=Attr('sessionId').ne(session)
                )
            return True
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print('Session {} already exists'.format(session))
            else:
                raise
            return False

    def list_sessions(self):
        self.sessionlist = []
        for item in self.table.scan()['Items']:
            self.sessionlist.append(item['sessionId'])
        return self.sessionlist

    def create_table(self, tablename=None):
        try:
            table = self.resource.create_table(
                        TableName = self.tablename,
                        KeySchema = [ 
                            {
                                'AttributeName': 'sessionId',
                                'KeyType': 'HASH'
                           }
                        ],
                        AttributeDefinitions=[
                            {
                                'AttributeName': 'sessionId',
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
            print("Table already exists")

if __name__ == '__main__':
    st = SessionTable()
    st.list_sessions()
    print(st.sessionlist)


