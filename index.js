/**
 * Copyright (c) 2016 Jeremy Thomerson
 * Licensed under the MIT license.
 */

'use strict';

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = function(event, context, callback) {
   console.log('Received event:', JSON.stringify(event, null, 2));

   callback(null, {
      response: { something: 'test123', evt: event }
   });
};
