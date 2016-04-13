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

Because it can be really tough getting all of this set up on your own. There
are a number of examples of individual pieces, but I couldn't find examples of
how to wire all of them together.

The goal of this repo is that you can have a single repo that contains the
Lambda code for the service, as well as the configuration for provisioning the
service. The hope is that you could add automated unit testing, and if that
passed, the same repo could build your dev environment, potentially run
integration tests, and then either automatically or manually deploy the API.
Automating all of this will greatly simplify things if your desire is to build
self-contained serverless microservices.


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

Feel free to take the template and modify it for your own use.


## Contributing

At this point I don't have my normal [jshint](http://jshint.com/),
[jscs](http://jscs.info/), [Travis CI](https://travis-ci.org/) stack integrated
in this repo. I also don't have unit testing - something I hope to add in the
future. So, I don't have a way you can automatically validate your
contributions. That said, if you want to contribute, please submit a pull
request, but only after doing the following:

 1. Make sure your code follows the coding standards that are in the file(s) you are editing (e.g. three space indentation, never a tab, never trailing whitespace).
 2. (Obviously) Run your code and make sure that you can actually build a working stack with it.
