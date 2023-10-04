export interface CustomerChat{
    userId:number;
    adminId?:string;
    content:string;
    time:string;
    replyToId?:string;
    discordChannelId:string;
    

}