import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConversionApiService } from './conversion-api.service';

@Module({
  imports: [HttpModule],
  providers: [ConversionApiService],
  exports: [ConversionApiService],
})
export class ConversionApiModule {}
