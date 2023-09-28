import { Module } from '@nestjs/common';
import { ProductpictureService } from './productpicture.service';
import { ProductpictureController } from './productpicture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productpicture } from './entities/productpicture.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Productpicture])],
  controllers: [ProductpictureController],
  providers: [ProductpictureService],
})
export class ProductpictureModule {}
