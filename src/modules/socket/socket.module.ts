import { Module } from "@nestjs/common";
import { CustomerChatSocket } from "./customer.chat.socket";
import { DiscordBotSocket } from "./discord.bot.socket";
import { JwtService } from "src/jwts/jwt.sevice";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerChats } from "./customers/entities/customer.chat.entity";
import { Receipt } from "../receipts/entities/receipt.entity";
import { ReceiptDetail } from "../receipts/entities/receipt-detail.entity";
import { CustomerChatService } from "./customers/customer.chat.service";
import { UserSocketGateway } from "./users/user.socket";

@Module({
    imports:[TypeOrmModule.forFeature([CustomerChats, Receipt, ReceiptDetail])],
    providers: [DiscordBotSocket, CustomerChatSocket,JwtService,CustomerChatService,UserSocketGateway]
})
export class SocketModule { }