import { Column } from "typeorm";
import { ProductColor, ProductSize } from "../entities/product.entity";
import { Productpicture } from "src/modules/productpicture/entities/productpicture.entity";
import { Allow } from "class-validator";
import { Categorydetail } from "src/modules/categorydetail/entities/categorydetail.entity";

export class CreateProductDto {
    
    @Allow()
    name: string;
    @Allow()
    description: string;
    @Allow()
    price: number;
    @Allow()
    size: ProductSize;
    @Allow()
    color: ProductColor;
    @Allow()
    pictures: Productpicture[];
    @Allow()
    categoryDetail: Categorydetail;

}
