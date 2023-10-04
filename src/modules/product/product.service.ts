import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categorydetail } from '../categorydetail/entities/categorydetail.entity';
import { Productpicture } from '../productpicture/entities/productpicture.entity';
import { CreateProductpictureDto, avatar } from '../productpicture/dto/create-productpicture.dto';
import { Size } from '../size/entities/size.entity';
import { ProductOption } from '../product_options/entities/product_option.entity';

@Injectable()
export class ProductService {
  
  constructor(@InjectRepository(Product) private products: Repository<Product>,
    @InjectRepository(Categorydetail) private categorydetail: Repository<Categorydetail>,
    @InjectRepository(Productpicture) private productpicture: Repository<Productpicture>,
    @InjectRepository(ProductOption) private productoption: Repository<ProductOption>

  ) { }
  async create(createProductDto: CreateProductDto, pictures: CreateProductpictureDto[],avatar:string, id: number) {
  console.log("🚀 ~ file: product.service.ts:19 ~ ProductService ~ create ~ pictures:", pictures)

    try {
      let pdt = await this.products.create(createProductDto) 
      for(let url of pictures){
        await this.productpicture.save(url)
      }
      let newProductOptons= await this.productoption.find({relations: {
        size: true
       }})
      let newProductsPicture = this.productpicture.create(pictures);
      let categoryDetail = await this.categorydetail.findOne({ where: { id: id }, relations:{category:true} })
      let newProducts = new Product();
      newProducts.id = pdt.id;
      newProducts.name = pdt.name;
      newProducts.description = pdt.description; 
      newProducts.price = pdt.price;
      newProducts.avatar=avatar
      newProducts.color = pdt.color;
      newProducts.product_options=newProductOptons
      newProducts.pictures = newProductsPicture;
      newProducts.categoryDetail = categoryDetail;

     // tạo một product trong đó có ảnh 
     //tạo ra ảnh có nhiều đường link khác nhau nhưng có chung product Id 

      let results = await this.products.save(newProducts)
      return {
        status: true,
        data: results,
        message: "Tao thanh cong"
      }
    } catch (err) {
      console.log("🚀 ~ file: product.service.ts:23 ~ ProductService ~ create ~ err:", err)
      return {
        status: false,
        data: null,
        message: "Loi service"
      }
    }
  }

  findAll() {
    return this.products.find({relations:{pictures:true, categoryDetail:{category:true},product_options: {
     size: true
    }}});
  }

  async find(id: number) {
    let product= await this.products.find({where:{categoryDetailId:id},relations:{pictures:true,product_options: {
      size:true
    }
  }})
    if(!product){
      throw new NotFoundException('product not found'); 

    }
    return product;
  }
  async findOne(id: number) {
    let product= await this.products.find({where:{id:id},relations:{pictures:true,product_options: {
      size:true
    }
  }})
    if(!product){
      throw new NotFoundException('product not found'); 

    }
    return product;
  }
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
