import { Module } from '@nestjs/common';
import { CategorydetailService } from './categorydetail.service';
import { CategorydetailController } from './categorydetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorydetail } from './entities/categorydetail.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categorydetail, Category])],
  controllers: [CategorydetailController],
  providers: [CategorydetailService],
})
export class CategorydetailModule {}
