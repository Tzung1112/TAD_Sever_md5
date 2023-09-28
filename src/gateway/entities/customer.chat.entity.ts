import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum ChatType {
    ADMIN = "ADMIN",
    USER = "USER"
}

@Entity()
export class CustomerChat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.customerChat)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'enum', enum: ChatType })
    type: ChatType;

    @Column({
        nullable: true
    })
    adminId: string;

    @Column()
    time: string;

    @Column()
    content: string;

    @Column()
    textChannelDiscordId: string;


}