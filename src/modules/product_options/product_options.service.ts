import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductOptionDto } from './dto/create-product_option.dto';
import { UpdateProductOptionDto } from './dto/update-product_option.dto';
import { ProductOption } from './entities/product_option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ProductOptionsService {
  constructor(
    @InjectRepository(ProductOption)
  private productoptions: Repository<ProductOption>,
  @InjectRepository(Product) private products: Repository<Product>){}
 
async create(createProductOptionDto: CreateProductOptionDto) {
    try{
      const options = await this.productoptions.save(createProductOptionDto);
      const pdt=await this.products.findOne({where:{id:options.productId},relations:{pictures:true,product_options: {
        size:true
      }
    }})
      console.log("🚀 ~ file: product_options.service.ts:21 ~ ProductOptionsService ~ create ~ pdt:", pdt)
     /*  const resuls= new Product()
        resuls.product_options=options */
      return {
        status: true,
        data: options,
        message: "Create ok!"
      }
    }catch(err){
     console.log("err",err);
     
     throw new HttpException("Loi service", HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return `This action returns all productOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOption`;
  }

  update(id: number, updateProductOptionDto: UpdateProductOptionDto) {
    return `This action updates a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
