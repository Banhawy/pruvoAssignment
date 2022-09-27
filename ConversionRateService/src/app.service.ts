import { Injectable, Inject } from '@nestjs/common';
import { Squiss, Message } from 'squiss-ts';
import { ConversionApiService } from './conversion-api/conversion-api.service';

interface ExchangeRateRequestMessage {
  toCurrency: string;
  fromCurrency: string;
  email: string;
}

interface ConversionRequestMessage extends ExchangeRateRequestMessage {
  amount: number;
}
@Injectable()
export class AppService {
  @Inject(ConversionApiService)
  private readonly exchangeConversionService: ConversionApiService;

  getHello(): string {
    return 'Hello World!';
  }

  sanitizeSQSMessage(message: ConversionRequestMessage): void {
    for (const [key, value] of Object.entries(message)) {
      console.log(`${key}: ${value}`);
      // Capitalize the currency names
      if (typeof value === 'string' && key !== 'email') {
        message[key] = value.trim().toUpperCase();
      }
    }
  }

  validatePresenceOfUSD(message: ConversionRequestMessage): boolean {
    const messageValues = Object.values(message);
    if (messageValues.indexOf('USD') < 0) {
      return false;
    } else {
      return true;
    }
  }

  isConversionToUSD(message: ConversionRequestMessage): boolean {
    return message.toCurrency === 'USD';
  }

  isRequestValid(message: any): boolean {
    const doesIncludeUSD = this.validatePresenceOfUSD(message);
    if (!doesIncludeUSD) {
      console.log('Invalid currency conversion: missing USD.');
      //TODO send an email informing user the conversion is not supported
      return false;
    } else {
      return true;
    }
  }

  async handleConversionRequest(message: ConversionRequestMessage) {
    try {
      if (message.toCurrency === 'USD') {
        const convertedAmount =
          await this.exchangeConversionService.convertToUSD(
            message.fromCurrency,
            message.amount,
          );
        //TODO send email to client
      }
      if (message.fromCurrency === 'USD') {
        const convertedAmount =
          await this.exchangeConversionService.convertFromUSD(
            message.toCurrency,
            message.amount,
          );
        //TODO send email to client
      }
    } catch (error) {
      console.log(`Could not process conversion request.`);
      throw new Error(error);
    }
  }

  async handleExchangeRateRequest(message: ExchangeRateRequestMessage) {
    try {
      if (message.toCurrency === 'USD') {
        const currencyExchangeRateRelativeToUSD =
          await this.exchangeConversionService.getCurrencyExchangeRateRelativeToUSD(
            message.fromCurrency,
          );
        //TODO send email to client
      } else if (message.toCurrency === 'USD') {
        const currencyExchangeRateRelativeToUSD =
          await this.exchangeConversionService.getCurrencyExchangeRateRelativeToUSD(
            message.fromCurrency,
          );
        const currencyExchangeRateRelativeToCurrency =
          1 / currencyExchangeRateRelativeToUSD;
        //TODO send email to client
      }
    } catch (error) {
      console.log(`Could not process conversion request.`);
      throw new Error(error);
    }
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
      idlePollIntervalMs: 500,
    });

    squiss.on('message', async (message: Message) => {
      const messageBody = JSON.stringify(message.body.message);
      console.log(
        `${message.body.name} says: ${messageBody} and has no attributes`,
      );
      this.sanitizeSQSMessage(message.body.message);

      if (message.body.name === 'conversion_request') {
        const isValidRequest = this.isRequestValid(message.body.message);
        isValidRequest
          ? this.handleConversionRequest(message.body.message)
          : null;
      }
      if (message.body.name === 'exchange_rate_request') {
        const isValidRequest = this.isRequestValid(message.body.message);
        isValidRequest
          ? this.handleExchangeRateRequest(message.body.message)
          : null;
      }

      message.del().then(() => {
        console.log('message deleted');
      });
    });

    squiss.start();
    console.log('SQS consumer ready');
  }
}
