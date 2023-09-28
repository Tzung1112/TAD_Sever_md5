import { Socket } from "socket.io";
import { User } from "src/modules/user/entities/user.entity";

export  interface MailOption {
    to: string, // Người nhận
    subject: string, // Chủ Đề
    html?: string, // Template HTML
    text?: string // Văn Bản
}
export  interface MailBody {
    productName: string;
    productWebUrl: string;
    receiverName: string;
    confirmLink: string;
    language: string;
}
export interface SocketClient {
    user: User,
    socket: Socket,
    textChannelDiscordId: string
}