import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {  InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
  private castegories: Repository<Category>){}
  async create(createCategoryDto: CreateCategoryDto) {
   try{
     const results = await this.castegories.save(createCategoryDto);
     return {
       status: true,
       data: results,
       message: "Create ok!"
     }
   }catch(err){
    console.log("err",err);
    
    throw new HttpException("Loi service", HttpStatus.BAD_REQUEST)
   }
  }

  async findAll() {
    try {
      const results = await this.castegories.find({
        relations: ["categoryDetails"]
      });
      return {
        status: true,
        data: results,
        message: "find ok!"
      }
    } catch (err) {

      throw new HttpException("Loi service", HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number): Promise<any>{
    let castegory = await this.castegories.findOne({
       where: {
         id,
         }, 
      relations: ["categoryDetails"]
      })
    if(!castegory){
      throw new NotFoundException('Categorys not found');

    }
    return castegory;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
  async searchByTitle(name:string) {
    try {
      const results = await this.castegories.find({
        where: {
          name: ILike(`%${name}%`),
        },
      });
      return {
        status: true,
        data: results,
        message: "find ok!"
      }
    } catch (err) {

      throw new HttpException("Loi service", HttpStatus.BAD_REQUEST)
    }
  }
}
