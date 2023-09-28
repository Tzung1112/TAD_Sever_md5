import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class UserAddresses {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    userId:string;
    @ManyToOne(()=>User,(user)=>user.userAddresses)
    @JoinColumn({name:"userId"})
    user:User;
    @Column({length:225})
    detail:string;
    @Column()
    provinceId:number;
    @Column({length:50})
    provinceName:string;
    @Column()
    districId: string;
    @Column({length:50})
    districName:string;
    @Column()
    wardCode:string;
    @Column({length:100})
    wardName:string;


}
