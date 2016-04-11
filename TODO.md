# TODO

## Lock Down Lamba Invocation Permissions More

Need to edit the `LambdaInvokePermission` to add `SourceArn` that points to the
APIMethod, so that only the APIMethod can invoke it.


## Add Logging to API Deployment

Logging can be enabled on the API deployment as shown in the example below.
However, to do that some CloudWatch configuration must be done. There's an
error about logging if you just add what's below.

```
      "DeployAPI": {
      ...
            "methodSettings": {
               "*/*/metrics/enabled": true,
               "*/*/logging/loglevel": "ERROR"
            },
      ...
      },
```

## Improve Grunt Build

   * Creating the Lambda zip:
      * Right now the grunt zip just zips everything - including all node_modules, even though none of them are needed. That needs to be improved.
   * Naming the zip
      * Need to figure out some way to avoid tight coupling so that the name of the zip used in the CFN template (parameters) is also used for the Grunt build.
      * Also need to figure out naming that allows for versioning.
   * Uploading the zip, etc
