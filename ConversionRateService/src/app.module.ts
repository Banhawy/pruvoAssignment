import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ConversionApiModule } from './conversion-api/conversion-api.module';
import { EmailerService } from './emailer/emailer.service';
import { EmailerModule } from './emailer/emailer.module';

@Module({
  imports: [ConversionApiModule, ConfigModule.forRoot(), EmailerModule],
  providers: [AppService, EmailerService],
})
export class AppModule {}
