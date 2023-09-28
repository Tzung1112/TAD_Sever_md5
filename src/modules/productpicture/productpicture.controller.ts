import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductpictureService } from './productpicture.service';
import { CreateProductpictureDto } from './dto/create-productpicture.dto';
import { UpdateProductpictureDto } from './dto/update-productpicture.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('productpicture')
export class ProductpictureController {
  constructor(private readonly productpictureService: ProductpictureService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  create(@Body() createProductpictureDto: CreateProductpictureDto, @UploadedFile() file: Express.Multer.File) {
    return this.productpictureService.create(file);
  }

  @Get()
  findAll() {
    return this.productpictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productpictureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductpictureDto: UpdateProductpictureDto) {
    return this.productpictureService.update(+id, updateProductpictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productpictureService.remove(+id);
  }
}
