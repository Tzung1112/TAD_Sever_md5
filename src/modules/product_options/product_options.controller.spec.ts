import { Test, TestingModule } from '@nestjs/testing';
import { ProductOptionsController } from './product_options.controller';
import { ProductOptionsService } from './product_options.service';

describe('ProductOptionsController', () => {
  let controller: ProductOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOptionsController],
      providers: [ProductOptionsService],
    }).compile();

    controller = module.get<ProductOptionsController>(ProductOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
