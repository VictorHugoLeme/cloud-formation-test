"use strict";
const AWS = require("aws-sdk");

const updateItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  const { itemStatus } = JSON.parse(event.body);

  await dynamoDB.update({
    TableName: "ItemTableNew",
    Key: { id },
    UpdateExpression: "set itemStatus = :itemStatus",
    ExpressionAttributeValues: {
      ":itemStatus": itemStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      { message: "Item successfully updated" }
    ),
  }
};

module.exports = {
  handler: updateItem
}