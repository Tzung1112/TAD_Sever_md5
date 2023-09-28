import { Inject, OnModuleInit, forwardRef } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { DiscordBotSocket } from "./discord.bot.socket";
@WebSocketGateway()
export class CustomerChatSocket implements OnModuleInit {
    @WebSocketServer()
    server: Server
    constructor(
        @Inject(forwardRef(() => DiscordBotSocket))
        private readonly discordBotSocket: DiscordBotSocket
    ) { }
    onModuleInit() {
        this.server.on("connect", ((socket: Socket) => {
            console.log("connect");
            socket.on("disconnect", () => {
                console.log("disconnect");

            })

        }))
    }
}