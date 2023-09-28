import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile, UseInterceptors, Req, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express'
import { CreateProductpictureDto } from '../productpicture/dto/create-productpicture.dto';
import { uploadFileToStorage } from 'src/firebase';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post(":categorydetailid")
  @UseInterceptors(FilesInterceptor('picture'))
  async create(@Req() req: Request, @UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any, createProductDto: CreateProductDto, @Res() res: Response, @Param('categorydetailid') categorydetailid: number) {

    let data = JSON.parse(body.product)


    let pictures: {
      url: string
    }[] = []
    for (let file of files) {
      let url = await uploadFileToStorage(file, "products", file.buffer)
      pictures.push({
        url: url ? url : "xxx.jpg"
      })
    }

    try {


      let serRes = await this.productService.create(data, categorydetailid, pictures);

      return res.status(serRes.status ? 200 : 213).json(serRes);
    } catch (err) {
      return res.status(500).json({
        message: "Server Controller Error!"
      });
    }
  }

  @Get("findAll")
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
