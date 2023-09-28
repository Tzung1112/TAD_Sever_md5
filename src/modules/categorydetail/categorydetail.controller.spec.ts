import { Test, TestingModule } from '@nestjs/testing';
import { CategorydetailController } from './categorydetail.controller';
import { CategorydetailService } from './categorydetail.service';

describe('CategorydetailController', () => {
  let controller: CategorydetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorydetailController],
      providers: [CategorydetailService],
    }).compile();

    controller = module.get<CategorydetailController>(CategorydetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
