import { Guest } from "src/modules/guest/entities/guest.entity";
import { User } from "src/modules/user/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReceiptDetail } from "./receipt-detail.entity";

export enum ReceiptStatus {
    SHOPPING = "SHOPPING", // Khách đang lựa, cart
    PENDING = "PENDING", // chờ shop xác nhận
    ACCEPTED = "ACCEPTED", // shop đã ok chờ vận chuyển tới nhận
    SHIPPING = "SHIPPING", // bên vận chuyển thao tác
    DONE = "DONE" // khách đã nhận hàng và hoàn tất thủ tục thanh toán
}

export enum PayMode {
    CASH = "CASH",
    ZALO = "ZALO"
}
@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    userId: number;

    @Column({
        nullable: true
    })
    guestId: number;

    @ManyToOne(() => User, (user) => user.receipts)
    @JoinColumn({ name: 'userId' })
    user: User;


    @ManyToOne(() => Guest, (guest) => guest.receipts)
    @JoinColumn({ name: 'guestId' })
    guest: Guest;

    @Column({
        default: 0
    })
    total: number;

    @Column({
        type: "enum",
        enum: ReceiptStatus,
        default: ReceiptStatus.SHOPPING
    })
    status: ReceiptStatus

    @Column({
        default: false
    })
    paid: boolean

    @Column({
        type: "enum",
        enum: PayMode,
        default: PayMode.CASH
    })
    payMode: PayMode

    @Column({
        nullable: true
    })
    paidAt: string

    @Column({
        nullable: true
    })
    zaloTranId: string

    @Column()
    createAt: string; // thời gian tạo đơn được tự động tạo

    @Column({
        nullable: true
    })
    accepted: string; // thời gian shop xác nhận đơn hàng

    @Column({
        nullable: true
    })
    shipAt: string; // thời gian vận chuyển nhận hàng

    @Column({
        nullable: true
    })
    doneAt: string; // thời gian khách nhận được hàng

    @OneToMany(() => ReceiptDetail, (receiptDetail) => receiptDetail.receipt)
    detail: ReceiptDetail[];

    @BeforeInsert()
    hanldeSetCreateAt() {
        this.createAt = String(Date.now())
    }
}