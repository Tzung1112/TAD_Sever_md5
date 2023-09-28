import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindByIdSerRes, UpdateSerRes } from './user.interface';
import validation from 'src/utils/validation';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private users: Repository<User>,
  ) { }
  async register(createUserDto: CreateUserDto) {
    try {
      let newUser = this.users.create(createUserDto);
      const results = await this.users.save(newUser)
      return {
        status: true,
        data: results,
        message: "Create ok!"
      }
    } catch (err) {
      console.log("🚀 ~ file: user.service.ts:24 ~ UserService ~ create ~ err:", err)
      return {
        status: false,
        data: null,
        message: "err service"
      }
    }
  }
  async findById(userId:string):Promise<FindByIdSerRes>{
    try{
      let result= await this.users.findOne({
        where:{
          id:userId
        }
      });
      if (!result){
        throw new Error
      }
      return {
        status: true,
        data: result,
        message: "Find user by id ok!"
      }
    }catch(err){
      return {
        status:false,
        data:null,
        message:"Loi model"
      }
    }
  }

  async findByEmailOrUserName(emailOrUserName:string):Promise<FindByIdSerRes>{
    try{
      let result= await this.users.findOne({
        where:validation.isEmail(emailOrUserName)
        ?{
          email:emailOrUserName,
          emailAuthentication:true
        }
        :{
          userName:emailOrUserName
        }
      })
      if(!result){
        throw new Error
      }
      return{
        status:true,
        data:result,
        message:"Find user ok"
      }
    }catch(err){
      return{
        status:false,
        data:null,
        message:"Loi service"
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateSerRes> {
    try{
      let userSource=await this.users.findOne({
        where:{
          id:userId
        }
      })
      let userSourceUpdate= this.users.merge(userSource, updateUserDto)
      let result=await this.users.save(userSourceUpdate)
      return{
        status:true,
        data: result,
        message: "Update Success"
      }
    }catch(err){
      return {
        status:false,
        data:null,
        message:"Loi service"
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
