import { Injectable, OnModuleInit } from "@nestjs/common";
import { ChannelType, Client, GatewayIntentBits, Guild, TextChannel } from "discord.js";
import { async } from "rxjs";
import { Socket, io } from "socket.io-client";


@Injectable()
export class DiscordService implements OnModuleInit{
  
    client: Client<boolean>
    anphuocShop:string="MTE1Mzk5MDEwNzE1ODgyMjkxMw.GxCz7g.HdNu5Ee3DbGz5gFWaCg50GBVMNQoiYpgaRP58Y"
    guildId:string="1153990107158822913"
    guild:Guild

    socketServer: Socket | null = null; 
    constructor() { }


    onModuleInit(){
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent, 
            ],
        });
        this.client.login(this.anphuocShop);
        this.client.on("ready", async ()=>{
            console.log(" Discord Bot An Phuoc Shop");
           this.createGuild()
            this.socketServer = io("http://127.0.0.1:4000?token=admin")

            this.client.on('messageCreate', (message) => {
                if (!message.author.bot) {
                    this.socketServer.emit("onAdminMessage", {
                        channelId: message.channelId,
                        content: message.content
                    })
                }

                //this.customerGateway.adminSendMessage(channelId, content)
            })
        })
    }
   
   createGuild(){
         this.guild=this.client.guilds.cache.get(this.guildId);
        
    }
    async createTextChannel(channelName:string){
        return await this.guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText
        })
    }
    getTextChanel(channelId:string){
        let channel= this.guild.channels.cache.get(channelId)
        return (channel as TextChannel)
    }
}