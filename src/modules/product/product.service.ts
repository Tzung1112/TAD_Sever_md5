import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categorydetail } from '../categorydetail/entities/categorydetail.entity';
import { Productpicture } from '../productpicture/entities/productpicture.entity';
import { CreateProductpictureDto } from '../productpicture/dto/create-productpicture.dto';

@Injectable()
export class ProductService {
  
  constructor(@InjectRepository(Product) private products: Repository<Product>,
    @InjectRepository(Categorydetail) private categorydetail: Repository<Categorydetail>,
    @InjectRepository(Productpicture) private productpicture: Repository<Productpicture>
  ) { }
  async create(createProductDto: CreateProductDto, id: number, pictures: CreateProductpictureDto[]) {

    try {
      let pdt = await this.products.create(createProductDto) 
      for (let url of pictures) {
        await this.productpicture.save(url)
      }
      let newProductsPicture = await this.productpicture.create(pictures);
      let categoryDetail = await this.categorydetail.findOne({ where: { id: id }, relations:{category:true} })
      let newProducts = new Product();
      newProducts.id = pdt.id;
      newProducts.name = pdt.name;
      newProducts.description = pdt.description; 
      newProducts.price = pdt.price;
      newProducts.color = pdt.color;
      newProducts.pictures = newProductsPicture
      newProducts.size = pdt.size;
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
    return this.products.find();
  }

  findOne(id: number) {
    return this.products.findOne({where:{categoryDetailId:id}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
