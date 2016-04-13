/**
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

var AWS = require('aws-sdk'),
    dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
   var method = event.context['http-method'].toUpperCase();

   switch (method) {
      case 'GET':
         handleGet(event, context, callback);
         break;
      case 'POST':
         handlePost(event, context, callback);
         break;
      default:
         callback('Unsupported method');
   }
};

function handlePost(event, context, callback) {
   var params = {
      TableName: event.custom.DynamoDBTableName,
      // TODO: obviously there's no request validation going on here like there should be
      Item: {
         GUID: event['body-json'].GUID,
         DueDate: event['body-json'].DueDate,
         Title: event['body-json'].Title,
         IsCompleted: event['body-json'].IsCompleted,
      }
   };

   dynamo.put(params, function(err, data) {
      if (err) {
         callback(null, { customError: 'Error adding item: ' + JSON.stringify(err, null, 2) });
      } else {
         callback(null, {
            data: data
         });
      }
   });
}

function handleGet(event, context, callback) {
   var params = {
      TableName: event.custom.DynamoDBTableName,
      Limit: 10,
   };

   dynamo.scan(params, function(err, data) {
      callback(null, {
         input: event,
         err: err,
         output: data
      });
   });
}
