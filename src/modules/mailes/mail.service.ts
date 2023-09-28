import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import emailConfirm from './templates/emailConfirm';
import { MailOption } from 'interface';

export const templates={
    emailConfirm,
}
@Injectable()
export class MailService{
    async sendMail(mailOption:MailOption){
        try{
            const transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.MS_USER,
                    pass:process.env.MS_PW
                }
            })
            await transporter.sendMail({
                from: process.env.MS_USER,
                ...mailOption
            })
            return true
        }catch(err){
            return false
        }
    }
}