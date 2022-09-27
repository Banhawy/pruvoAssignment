import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class ConversionApiService {
  constructor(private readonly httpService: HttpService) {}

  private api = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENXE_APP_ID}&base=USD`;

  async getCurrencyExchangeRateRelativeToUSD(
    currency: string,
  ): Promise<number> {
    try {
      const { data } = await this.getLatestRatesByUSD();
      if (!data.rates[currency]) {
        const errorMessage = `Currency ${currency} not supported.`;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }
      return Number(data.rates[currency]).valueOf();
    } catch (error) {
      console.log('Error calling API');
      throw new Error(error);
    }
  }

  private getLatestRatesByUSD(): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(this.api);
  }

  async convertToUSD(currency: string, amount: number) {
    try {
      const exchangeRate = await this.getCurrencyExchangeRateRelativeToUSD(
        currency,
      );
      const convertedAmount = amount / exchangeRate;
      return convertedAmount;
    } catch (error) {
      console.log(`Error Converting ${currency} to USD`);
      throw new Error(error);
    }
  }

  async convertFromUSD(currency: string, amount: number) {
    try {
      const exchangeRate = await this.getCurrencyExchangeRateRelativeToUSD(
        currency,
      );
      const convertedAmount = amount * exchangeRate;
      return convertedAmount;
    } catch (error) {
      console.log(`Error Converting ${currency} to USD`);
      throw new Error(error);
    }
  }
}
