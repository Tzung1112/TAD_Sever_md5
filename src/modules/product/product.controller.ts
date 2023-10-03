import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile, UseInterceptors, Req, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express'
import { CreateProductpictureDto, avatar } from '../productpicture/dto/create-productpicture.dto';
import { uploadFileToStorage } from 'src/firebase';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post(":categorydetailid")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 10 },
    { name: 'avatar', maxCount: 1 },
  ]))
  async create(@Req() req: Request,@UploadedFiles() files: { picture?: Express.Multer.File[], avatar?: Express.Multer.File[]}, @Body() body: any, createProductDto: CreateProductDto, @Res() res: Response, @Param('categorydetailid') categorydetailid: number) {

    let data = JSON.parse(body.product)
  

    let pictures: {
      url: string
    }[] = []
    for (let file of files.picture) {
      let url = await uploadFileToStorage(file, "products", file.buffer)
    
      pictures.push({
        url: url ? url : "xxx.jpg"
      })
    }
    let avatar=""
    for (let file of files.avatar) {
      let avt= await uploadFileToStorage(file, "products", file.buffer)
      avatar=avt
    }
    try {
      let serRes = await this.productService.create(data, pictures,avatar,categorydetailid,);

      return res.status(serRes.status ? 200 : 213).json(serRes);
    } catch (err) {
      console.log("🚀 ~ file: product.controller.ts:42 ~ ProductController ~ create ~ err:", err)
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
  find(@Param('id') id: string) {
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
