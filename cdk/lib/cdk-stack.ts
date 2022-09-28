import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { ApiGatewayToSqs, ApiGatewayToSqsProps } from "@aws-solutions-constructs/aws-apigateway-sqs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const ApiSQSProps: ApiGatewayToSqsProps = {
      apiGatewayProps: {
        resApiName: 'sqsAPI'
      },
      /**
       * The number of times a message can be unsuccessfully dequeued before being moved to the dead-letter queue.
       */
      maxReceiveCount: 10,
      /**
       * Whether to deploy an API Gateway Method for Create operations on the queue (i.e. sqs:SendMessage).
       */
      allowCreateOperation: true,
    }
    new ApiGatewayToSqs(this, 'ApiGatewayToSqsPattern', {});

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
