import { Module } from '@nestjs/common';
import { ProductOptionsService } from './product_options.service';
import { ProductOptionsController } from './product_options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOption } from './entities/product_option.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductOption, Product])],
  controllers: [ProductOptionsController],
  providers: [ProductOptionsService],
})
export class ProductOptionsModule {}
