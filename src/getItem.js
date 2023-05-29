"use strict";
const AWS = require("aws-sdk");

const getItem = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let item;
  let error;

  await dynamoDB.get({
    TableName: "ItemTableNew",
    Key: { id }
  }).promise().then((data) => {
    item = data.Item;
  }).catch((err) => {
    error = err;
    console.log(error)
  });

  if (!error) {
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }

};

module.exports = {
  handler: getItem
}