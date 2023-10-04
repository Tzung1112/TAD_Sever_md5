import { Product } from "src/modules/product/entities/product.entity";
import { ReceiptDetail } from "src/modules/receipts/entities/receipt-detail.entity";
import { Size } from "src/modules/size/entities/size.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductOption {
 @PrimaryGeneratedColumn()
 id:number;
 @Column({ length:100})
 name:string;
 @Column({
    nullable:false
 })
 productId:number;
 @ManyToOne(()=> Product, (product)=>product.product_options)
 product:Product
 @OneToMany(() => Size, (product_option_size) => product_option_size.product_option)
 size: Size[]
 @OneToMany(()=>ReceiptDetail, (receiptDetail)=>receiptDetail.option)
 sold:ReceiptDetail[];
}


