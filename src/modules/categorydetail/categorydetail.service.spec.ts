import { Test, TestingModule } from '@nestjs/testing';
import { CategorydetailService } from './categorydetail.service';

describe('CategorydetailService', () => {
  let service: CategorydetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorydetailService],
    }).compile();

    service = module.get<CategorydetailService>(CategorydetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
