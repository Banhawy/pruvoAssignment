import { Test, TestingModule } from '@nestjs/testing';
import { ConversionApiService } from './conversion-api.service';

describe('ConversionApiService', () => {
  let service: ConversionApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversionApiService],
    }).compile();

    service = module.get<ConversionApiService>(ConversionApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
