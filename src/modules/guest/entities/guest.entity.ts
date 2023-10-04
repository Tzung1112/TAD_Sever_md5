import { Receipt } from "src/modules/receipts/entities/receipt.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Guest{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;

    @Column()
    numberPhone:string;

    @Column()
    email:string;
    @OneToMany(()=>Receipt, (receipt)=>receipt.guest)
    receipts:Receipt[];
}

