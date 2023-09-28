import { Injectable } from "@nestjs/common";
import { CustomerChat } from "./entities/customer.chat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerChatDto } from "./dto/customer.chat.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerChat) private customerChat: Repository<CustomerChat>) { }

    async findChatHistory(userId:string){
        try{
            let chatHistory=await this.customerChat.find({
                where:{
                    userId,
                },
                order:{
                    time:"ASC"//sap xep theeo thoi gian
                },
                relations:{
                    user:true
                }
            })
            if(chatHistory.length==0){
                return{
                    status:false,
                    data:null
                }
            }else{
                return{
                    status:true,
                    data:chatHistory
                }
            }
        }catch(err){
            return{
                status:false,
                data:null
            }
        }
    }
    async create(data:CustomerChatDto){
        try{
            let chatRecord = await this.customerChat.save(data)

            return{
                status:true,
                data:chatRecord
            }
        }catch(err){
            return{
                status:false,
                data:null
            }
        }
    }
}