var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    
    console.log("event.pathParameters.serviceName",event.pathParameters.serviceName)
   
    // Create the DynamoDB service object
    var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

    var params = {
        TableName: 'SERVICE_LIST',
        Key: {
            'SERVICE_NAME': event.pathParameters.serviceName,
            'ENVIRONMENT_NAME': event.pathParameters.environmentName   
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Item);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    dataItem: data.Item
                })
            });
        }
    });
}
