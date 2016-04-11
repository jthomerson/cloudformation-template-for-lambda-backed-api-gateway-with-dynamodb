# CloudFormation Example for API Gateway With Lambda and DynamoDB

## What?

This template tries to demonstrate a complete microservice that uses AWS
services to create a simple serverless API. It uses CloudFormation to create
the following and relate all of them to one another as needed:

   * API Gateway
      * API Resource (one)
      * API Methods (GET / POST)
   * Lambda Function
      * This is what implements the logic for the service, and the code for the function is also part of this repo.
   * DynamoDB Table
      * Configured to be used by the Lambda function.
   * IAM Roles and Policies
      * So that the API can invoke the function and the function has access to necessary resources.



## Why?

Because it can be really tough getting all of this set up on your own.


## How to Use It

   1. Install custom resources for API creation via CloudFront
      * We use Carl Nordenfelt's great [custom resources](https://github.com/carlnordenfelt/aws-api-gateway-for-cloudformation/) for making the API resources in AWS CloudFormation since CFN doesn't actually support them natively yet. To get started with it, please install them as described in his documentation: https://apigatewaycloudformation.bynordenfelt.com/. I built this using the latest version at the time: 1.5.0 (2016-04-10).
   2. Copy `cloudformation/sample-params.json` to `cloudformation/api-params.json`.
   3. Edit `cloudformation/api-params.json` to fill in your own values.
   4. Run the following command:

```
aws cloudformation create-stack --stack-name <YOURSTACKNAME-CAN-BE-ANYTHING> \
    --template-body file://./cloudformation/complete-api.template \
    --parameters=file://./cloudformation/api-params.json \
    --capabilities CAPABILITY_IAM
```

If you want to monitor the status of your stack creation on the CLI, you can use this command:

```
aws cloudformation describe-stacks --query='Stacks[*].{ Name: StackName, Status: StackStatus }'
```


## License

This software is released under the MIT license. See [the license file](LICENSE) for more details.
