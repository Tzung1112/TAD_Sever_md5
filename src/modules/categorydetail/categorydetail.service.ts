import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorydetailDto } from './dto/create-categorydetail.dto';
import { UpdateCategorydetailDto } from './dto/update-categorydetail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Categorydetail } from './entities/categorydetail.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class CategorydetailService {
  constructor(
    @InjectRepository(Categorydetail )
    private castegorydetail: Repository<Categorydetail>,
    @InjectRepository(Category)
    private categories: Repository<Category>,
    
    ) { }
  async create(createCategorydetailDto: CreateCategorydetailDto, id: number) {
    try {
      const categories=await this.categories.findOne(
        {
          where:{id:id}
          
        }
          
          )
      if (!categories) throw new NotFoundException('Category Not Found');
      const categoryDetail= new Categorydetail()
      categoryDetail.category = categories;
      categoryDetail.name = createCategorydetailDto.name;
      const results = await this.castegorydetail.save(categoryDetail);
      return {
        status: true,
        data: results,
        message: "Create ok!"
      }
    } catch (err) {
      console.log("err", err);
      return {
        status: false,
        data: null,
        message: "Loi service!"
      }
    }
  }

  findAll() {
    return this.castegorydetail.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} categorydetail`;
  }

  update(id: number, updateCategorydetailDto: UpdateCategorydetailDto) {
    return `This action updates a #${id} categorydetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} categorydetail`;
  }
}
