import { Categorydetail } from "src/modules/categorydetail/entities/categorydetail.entity";
import { Productpicture } from "src/modules/productpicture/entities/productpicture.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum ProductSize {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
    // Thêm các giá trị kích thước khác tùy ý
}

export enum ProductColor {
    RED = 'Red',
    BLUE = 'Blue',
    GREEN = 'Green',
    // Thêm các giá trị màu sắc khác tùy ý
}

@Entity()
export class Product {
 
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true,length: 20 })
    name: string;

    @Column({ length: 20 })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
    @Column()
    avatar:string
    @Column({ type: 'enum', enum: ProductSize, default: ProductSize.SMALL })
    size: ProductSize;

    @Column({ type: 'enum', enum: ProductColor, default: ProductColor.RED })
    color: ProductColor;

    @OneToMany(() => Productpicture, (productPicture) => productPicture.product)
    pictures: Productpicture[];
    @Column()
    categoryDetailId:number;
    @ManyToOne(() => Categorydetail, (categoryDetail) => categoryDetail.products)
    categoryDetail: Categorydetail; 

}
