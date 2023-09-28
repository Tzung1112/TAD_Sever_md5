import { Categorydetail } from "src/modules/categorydetail/entities/categorydetail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Categorydetail, (categoryDetail) => categoryDetail.category)
    categoryDetails: Categorydetail[];
}
