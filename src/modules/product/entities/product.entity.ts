import { Categorydetail } from "src/modules/categorydetail/entities/categorydetail.entity";
import { ProductOption } from "src/modules/product_options/entities/product_option.entity";
import { avatar } from "src/modules/productpicture/dto/create-productpicture.dto";
import { Productpicture } from "src/modules/productpicture/entities/productpicture.entity";
import { Size } from "src/modules/size/entities/size.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum ProductColor {
    RED = 'Red',
    BLUE = 'Blue',
    GREEN = 'Green',
    // Thêm các giá trị màu sắc khác tùy ý
}

@Entity()
export class Product {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true,length: 100 })
    name: string;

    @Column({ length: 50 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    price: number;
    @Column()
    avatar:string;
   
    @Column({ type: 'enum', enum: ProductColor, default: ProductColor.RED })
    color: ProductColor;
    @OneToMany(() => Productpicture, (productPicture) => productPicture.product)
    pictures: Productpicture[];
    @Column()
    categoryDetailId:number;
    @ManyToOne(() => Categorydetail, (categoryDetail) => categoryDetail.products)
    categoryDetail: Categorydetail; 
    @OneToMany(()=>ProductOption, (product_option)=>product_option.product)
    product_options:ProductOption[]


}
