import time
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

def create_session(session=None):
    session_table = 'epf-sessions'
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(session_table)
    
    try:
        table.put_item(
            Item={
                    'sessionId': session,
                    'timestamp': str(time.time())
                },
            ConditionExpression=Attr('sessionId').ne(session)
            )
    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print('Session {} already exists'.format(session))
        else:
            raise


def create_table(tablename=None):
    dynamodb = boto3.resource('dynamodb')
    try:
        table = dynamodb.create_table(
                    TableName = tablename,
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
        table.meta.client.get_waiter('table_exists').wait(TableName=tablename)
    except ClientError:
        print("Table already exists")

if __name__ == '__main__':
    print("Creating Session")
    create_session(session='test')



