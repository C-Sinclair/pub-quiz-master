const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {    
    const connectionId = event.requestContext.connectionId;    
    removeConnectionId(connectionId).then(() => {    
        callback(null, {        
            statusCode: 200,        
        })    
    });
}

function removeConnectionId(connectionId) {    
    return ddb.delete({        
        TableName: 'boardom-pub-quiz',        
        Key: {            
            connectionid : connectionId,        
        },    
    }).promise();
}
