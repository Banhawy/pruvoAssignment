import { Injectable } from '@nestjs/common';
import { Squiss, Message } from 'squiss-ts';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  initSQSConsumer(): void {
    const awsConfig = {
      accessKeyId: `dummy`,
      secretAccessKey: `dummy`,
      region: 'eu-west-1',
    };
    console.log('Setting up SQS consumer');
    const squiss = new Squiss({
      awsConfig,
      queueUrl: 'http://sqs:9324/queue/default',
      bodyFormat: 'json',
      maxInFlight: 15,
    });

    squiss.on('message', (message: Message) => {
      console.log(
        `${message.body.name} says: ${JSON.stringify(
          message.body.message,
        )} and has no attributes`,
      );
      message.del();
    });

    squiss.start();
    console.log('SQS consumer ready');
  }
}
