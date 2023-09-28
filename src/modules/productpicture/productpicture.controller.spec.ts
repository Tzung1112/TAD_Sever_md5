import { Test, TestingModule } from '@nestjs/testing';
import { ProductpictureController } from './productpicture.controller';
import { ProductpictureService } from './productpicture.service';

describe('ProductpictureController', () => {
  let controller: ProductpictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductpictureController],
      providers: [ProductpictureService],
    }).compile();

    controller = module.get<ProductpictureController>(ProductpictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
