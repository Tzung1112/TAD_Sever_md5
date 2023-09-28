enum ChatType {
    ADMIN= "ADMIN",
    USER= "USER"
}

export class CustomerChatDto {
    userId: string;
    type: ChatType;
    adminId: string;
    time: string;
    content: string;
    textChannelDiscordId: string;
}