import { Inject, Injectable, OnModuleInit, forwardRef } from "@nestjs/common";
import { CustomerChatSocket } from "./customer.chat.socket";
import { Client, GatewayIntentBits, Guild, Message } from "discord.js";
@Injectable()
export class DiscordBotSocket implements OnModuleInit{
    
    client: Client;
    botToken: string ="MTE1Mzk5MDEwNzE1ODgyMjkxMw.GzhwFt.GmzQtOFLIAOcQSEEA8ezJQeEzW45vD5GpmP3tQ";
    guildId: string ="1153990960057954304";
    guild:Guild;

    constructor(@Inject(forwardRef(()=>CustomerChatSocket))
    private readonly customerChatSocket: CustomerChatSocket
    ){}
    onModuleInit() {
        this.client=new Client({
            intents:[
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        })
        this.client.login(this.botToken)

        this.client.on("ready", ()=>{
            console.log("DISCORD MO CUA");

            this.connectGuild();
            this.client.on("messageCreate", (message:Message)=>{
                if(!message.author.bot){
                    message.reply("Ok thay roi")
                }
            })

            
        })
    }
    connectGuild() {
      this.guild=this.client.guilds.cache.get(this.guildId)
    }
}