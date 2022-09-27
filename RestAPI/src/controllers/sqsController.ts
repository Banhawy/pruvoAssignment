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
    amount: number;
    /**
     * The base ('from') currency (3-letter code)
     */
    fromCurrency: string;
    /**
     * The target ('to') currency (3-letter code)
     */
    toCurrency: string;
    /**
     * The email to receive the result at
     */
    email: string;
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