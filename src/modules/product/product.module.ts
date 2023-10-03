import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Productpicture } from '../productpicture/entities/productpicture.entity';
import { Categorydetail } from '../categorydetail/entities/categorydetail.entity';
import { Size } from '../size/entities/size.entity';
import { ProductOption } from '../product_options/entities/product_option.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Productpicture, Categorydetail,ProductOption])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
