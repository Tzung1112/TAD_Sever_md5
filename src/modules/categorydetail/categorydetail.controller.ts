import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, Req } from '@nestjs/common';
import { CategorydetailService } from './categorydetail.service';
import { CreateCategorydetailDto } from './dto/create-categorydetail.dto';
import { UpdateCategorydetailDto } from './dto/update-categorydetail.dto';
import { Response } from 'express'
import { FindOneOptions } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Controller('categorydetail')
export class CategorydetailController {
  constructor(private readonly categorydetailService: CategorydetailService) {}

  @Post(":id")
  async create(@Body() createCategorydetailDto: CreateCategorydetailDto, @Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      let serRes = await this.categorydetailService.create(createCategorydetailDto, id);
      return res.status(serRes.status ? 200 : 213).json(serRes);
    } catch (err) {
      return res.status(500).json({
        message: "Server Controller Error!"
      });
    }
  }

  @Get()
  findAll() {
    return this.categorydetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorydetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorydetailDto: UpdateCategorydetailDto) {
    return this.categorydetailService.update(+id, updateCategorydetailDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorydetailService.remove(+id);
  }
}
