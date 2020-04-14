const AWS = require('aws-sdk');
// apply the patch
require('./patch.js');

let send = undefined;

function init(event) {
  const api = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });
  send = async (connectionId, data) => {
    await api.postToConnection({ 
        ConnectionId: connectionId, 
        Data: `${data}` 
    }).promise();
  }
}

exports.handler = async(event) => {
  init(event);
  const connectionId = event.requestContext.connectionId;
  let data = JSON.parse(event.body).data
  await send(connectionId, data);
  // the return value is ignored when this function is invoked from WebSocket gateway
  return {};
};