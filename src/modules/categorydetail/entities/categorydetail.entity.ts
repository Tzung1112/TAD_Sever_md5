import { Category } from "src/modules/categories/entities/category.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categorydetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    name: string;

    @ManyToOne(() => Category, (category) => category.categoryDetails)
    category: Category;

    @OneToMany(() => Product, (product) => product.categoryDetail)
    products: Product[];
}
