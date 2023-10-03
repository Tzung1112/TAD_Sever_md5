
import { Product } from "src/modules/product/entities/product.entity";
import { ProductOption } from "src/modules/product_options/entities/product_option.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ProductOption, (product_option) => product_option.size)
    product_option: ProductOption; 
}
