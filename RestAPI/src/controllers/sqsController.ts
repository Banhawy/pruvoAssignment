import { Squiss } from 'squiss-ts';

const awsConfig = {
    accessKeyId: `dummy`,
    secretAccessKey: `dummy`,
    region: 'eu-west-1'
}

const squiss = new Squiss({
    awsConfig,
    queueUrl: 'http://sqs:9324/queue/default',
    bodyFormat: 'json',
    maxInFlight: 15
});

type MessageBody = {
    /**
     * The value to be converted
     */
    value: Number;
    /**
     * The base ('from') currency (3-letter code)
     */
    from: String;
    /**
     * The target ('to') currency (3-letter code)
     */
    to: String
}
export async function SendSQSMessage(body: MessageBody) {
    const messageToSend = {
        name: 'conversion_request',
        message: body
    }
    try {
        console.log('Sending Message to SQS')
        const result = await squiss.sendMessage(messageToSend, 0);
        console.log('Response:', result)
        console.log('Message sent!')
        
    } catch (error) {
        console.log('Erorrr:', error)
    }
}