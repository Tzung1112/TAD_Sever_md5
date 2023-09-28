import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SocketClient } from "interface";
import { Server } from "socket.io";
import { JwtService } from "src/jwts/jwt.sevice";
import { DiscordService } from "src/modules/discord/discord.service";
import { CustomerService } from "./customer.service";

enum ChatType {
    ADMIN = "ADMIN",
    USER = "USER"
}

@WebSocketGateway({
    cors: true
})
export class CustomerGateway implements OnModuleInit {
    socketClients:SocketClient[]=[];
    constructor(private readonly jwt: JwtService, private readonly discord: DiscordService, private readonly customerSerVice:CustomerService) { }
    @WebSocketServer()
    server: Server
    onModuleInit() {

        this.server.on("connect",async (socket) => {
            if(String(socket.handshake.query.token)=="admin"){
                return
            }
            // console.log("socket", socket.handshake.query.token);
            let userDecode = this.jwt.verifyToken(String(socket.handshake.query.token))
            if(!userDecode){
                socket.emit("connectStatus", "Ban khong co quyen truy cap")
            }else{
                let customerSerRes=await this.customerSerVice.findChatHistory(userDecode.id);
                let newSocketClient={
                    user:userDecode,
                    socket,
                    textChannelDiscordId:customerSerRes.status?customerSerRes.data[0].textChannelDiscordId:(await this.discord.createTextChannel(String(userDecode.firstName+""+userDecode.lastName))).id
                }

                this.socketClients.push(newSocketClient)
                if(!customerSerRes.status){
                    let serResChat=await this.customerSerVice.create({
                        adminId:"922d96c6-dc83-46b0-9b41-0c456c0a2d2b",
                        content:"Xin chao ban can giup do gi",
                        textChannelDiscordId:newSocketClient.textChannelDiscordId,
                        time:String(Date.now()),
                        type:ChatType.ADMIN,
                        userId:newSocketClient.user.id
                    })
                    let channel= this.discord.getTextChanel(newSocketClient.textChannelDiscordId);
                    channel.send(`Admin:${serResChat.data.content}`)
                    let customerSerRes2=await this.customerSerVice.findChatHistory(userDecode.id)
                    socket.emit("historyMessage", customerSerRes2.data)
                }else{
                    socket.emit("historyMessage", customerSerRes.data)
                }
                socket.emit("connectStatus", `Chào mừng ${String(userDecode.firstName + " " + userDecode.lastName)} đã kết nối!`)

            }
            // this.discord.createTextChannel(String(userDecode.userName))
            // console.log(`client co socket id la:${socket.id} vua ket noi`);
            // socket.emit("connectStatus", `Chào mừng ${String(userDecode.firstName + " " + userDecode.lastName)} đã kết nối!`)


        })

    }
    @SubscribeMessage("onMessage")
    async onMessage(@MessageBody()body :any){
        let socketClient=this.socketClients.find(client=>client.socket.id==body.socketId)
        let newChatRecord={
            adminId: "",
            content: body.content,
            textChannelDiscordId: String(socketClient.textChannelDiscordId),
            time: String(Date.now()),
            type: ChatType.USER,
            userId: body.userId
        };
        await this.customerSerVice.create(newChatRecord);
        let chatHistory= await this.customerSerVice.findChatHistory(newChatRecord.userId);
        this.discord.getTextChanel(String(socketClient.textChannelDiscordId)).send(`${socketClient.user.firstName+""+ socketClient.user.lastName}:${newChatRecord.content}`)
        socketClient.socket.emit("historyMessage", chatHistory.data)
    }
    @SubscribeMessage('onAdminMessage')
    async adminSendMessage(@MessageBody() body: any) {
        let socketClient = this.socketClients.find(client => client.textChannelDiscordId == body.channelId)
        let newChatRecourd = {
            adminId: "",
            content: body.content,
            textChannelDiscordId: String(socketClient.textChannelDiscordId),
            time: String(Date.now()),
            type: ChatType.ADMIN,
            userId: socketClient.user.id
        }
        await this.customerSerVice.create(newChatRecourd);
        let chatHistory = await this.customerSerVice.findChatHistory(newChatRecourd.userId);
        socketClient.socket.emit("historyMessage", chatHistory.data)
    }
}