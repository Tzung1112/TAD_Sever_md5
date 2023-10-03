import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductpictureDto } from './dto/create-productpicture.dto';
import { UpdateProductpictureDto } from './dto/update-productpicture.dto';
import { uploadFileToStorage } from 'src/firebase';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()

export class ProductpictureService {
  async create( file: Express.Multer.File) {
    let url = await uploadFileToStorage(file, "md5", file.buffer)
    return url
  }

  findAll() {
    return `This action returns all productpicture`;
  }

  findOne(id: string) {
    return `This action returns a #${id} productpicture`;
  }

  update(id: number, updateProductpictureDto: UpdateProductpictureDto) {
    return `This action updates a #${id} productpicture`;
  }

  remove(id: number) {
    return `This action removes a #${id} productpicture`;
  }
}
