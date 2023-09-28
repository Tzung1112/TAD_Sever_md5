import { Module } from "@nestjs/common";
import { CustomerChatSocket } from "./customer.chat.socket";
import { DiscordBotSocket } from "./discord.bot.socket";

@Module({
    providers: [DiscordBotSocket, CustomerChatSocket]
})
export class SocketModule { }