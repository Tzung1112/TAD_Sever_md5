import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Productpicture {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => Product, (product) => product.pictures)
    product: Product;
}
