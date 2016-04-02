import boto3
import botocore.exceptions

def create_session():
    session_table = 'epf-sessions'
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(session_table)
    

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
    except botocore.exceptions.ClientError:
        print("Table already exists")

if __name__ == '__main__':
    print("Creating Table")
    create_table(tablename='epf-sessions')



