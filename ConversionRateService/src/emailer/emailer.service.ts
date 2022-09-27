import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailerService {
  async sendEmail(recipientEmail: string, message: string) {
    console.log('Email recipient: ', recipientEmail);
    console.log('Email message: ', message);
    console.log('Email sent');
  }
}
