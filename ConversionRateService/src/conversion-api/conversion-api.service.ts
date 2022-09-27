import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class ConversionApiService {
  constructor(private readonly httpService: HttpService) {}

  private api = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENXE_APP_ID}&base=USD`;

  async getCurrencyExchangeRateRelativeToUSD(currency: string) {
    try {
      const { data } = await this.getLatestRatesByUSD();
      if (!data.rates[currency]) {
        const errorMessage = `Currency ${currency} not supported.`;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }
      return data.rates[currency];
    } catch (error) {
      console.log('Error calling API');
      throw new Error(error);
    }
  }

  getLatestRatesByUSD(): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(this.api);
  }
}
