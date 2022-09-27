import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ConversionApiModule } from './conversion-api/conversion-api.module';

@Module({
  imports: [ConversionApiModule, ConfigModule.forRoot()],
  providers: [AppService],
})
export class AppModule {}
