import { Test, TestingModule } from '@nestjs/testing';
import { ProductpictureService } from './productpicture.service';

describe('ProductpictureService', () => {
  let service: ProductpictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductpictureService],
    }).compile();

    service = module.get<ProductpictureService>(ProductpictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
