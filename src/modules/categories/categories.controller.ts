import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Res, Version, Query, ParseIntPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express'
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { title } from 'process';
import { FindOneOptions } from 'typeorm';
import { Category } from './entities/category.entity';



@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
    try {
      let serviceRes = await this.categoriesService.create(createCategoryDto);
      res.statusMessage = serviceRes.message;
      return res.status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED).json(serviceRes.data)
    } catch (err) {
      throw new HttpException('Lỗi xử lý yêu cầu', HttpStatus.BAD_REQUEST);
    }
  }
  @Get('findAll')
  async findCategory(@Res() res: Response) {
    try {
      let serRes = await this.categoriesService.findAll()
      return res.status(serRes.status ? 200 : 213).json(serRes);
    } catch (err) {
      return res.status(500).json({
        message: "Server Controller Error"
      })
    }
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
  @Get("search")
  async searchByTitle(@Query("title") title: string, @Res() res: Response) {
    try {
      if (title != undefined) {
        return res.status(HttpStatus.OK).json(await this.categoriesService.searchByTitle(title))
      }
      return res.status(HttpStatus.OK).json(await this.categoriesService.findAll())
    } catch {
      throw new HttpException("loi xu ly yeu cau", HttpStatus.BAD_REQUEST);
    }
  }
}
