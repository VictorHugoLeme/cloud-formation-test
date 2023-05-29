"use strict";

const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const insertItem = async (event) => {

  const { item } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = uuidv4();

  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const newItem = {
    id,
    item,
    createdAt,
    itemStatus: false
  }

  await dynamoDB.put({
    TableName: "ItemTableNew",
    Item: newItem
  }).promise();

  return newItem;

};

module.exports = {
  handler: insertItem
}