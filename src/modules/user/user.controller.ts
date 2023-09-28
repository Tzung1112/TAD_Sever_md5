import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express'
import { MailService,templates } from '../mailes/mail.service';
import { JwtService } from 'src/jwts/jwt.sevice';
import * as  bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly mail:MailService, private readonly jwt: JwtService) {}

  @Post()
  async register(@Body() CreateUserDto:CreateUserDto, @Res()res:Response){
    try {
      let serRes = await this.userService.register(CreateUserDto);      
      if (serRes.status) {
        /* Mail */
        this.mail.sendMail({
          subject: "Register Authentication Email",
          to: serRes.data.email,
          html: templates.emailConfirm({
            confirmLink: `${process.env.HOST}:${process.env.PORT}/api/v1/user/email-authentication/${serRes.data.id}/${this.jwt.createToken(serRes.data, "300000")}`,
            language: "vi",
            productName: "An Phuoc Shop",
            productWebUrl: "anphuoc.com",
            receiverName: `${serRes.data.firstName} ${serRes.data.lastName}`
          })
        })
      }

      return res.status(serRes.status ? 200 : 213).json(serRes);
    } catch (err) {
      return res.status(500).json({
        message: "Server Controller Error!"
      });
    }
  }

  @Get('email-authentication/:userId/:token')
 async emailAuthentication(@Param("userId")userId : string, @Param("token")token : string, @Res() res : Response ){
  try{
    let userDecode=this.jwt.verifyToken(token);
    let serResUser=await this.userService.findById(userId);
    if(serResUser.status&&userDecode){
      if(serResUser.data.updateAt==userDecode.updateAt){
        if(!serResUser.data.emailAuthentication){
          let serRes=await this.userService.update(userId, {
            emailAuthentication:true
          })
          if(serRes.status){
            this.mail.sendMail({
              subject:"Authentication Email Notice",
              to: serRes.data.email,
              text: `Email đã được liên kết với tài khoản ${serRes.data.userName}`
            })
          }
          return res.status(serRes.status ? 200 : 213).send(serRes.status ? "ok" : "fail");
        }
      }
    }
    return res.status(213).send("Email da het han!")
  }catch(err){
    return res.status(500).json({
      message:"Server COntroller Error!"
    })
  }
 }

 @Post("login")
 async login(@Body()loginDto:LoginDto, @Res()res:Response){
  try{
    let serRes = await this.userService.findByEmailOrUserName(loginDto.userNameOrEmail)
    if(!serRes.status){
      return res.status(213).json({
        message:"Không tìm thấy tài khoản"
      })
    }
    if(serRes.data.status!="ACTIVE"){
      return res.status(213).json({
        message:`Tài khoản bị ${serRes.data.status}`
      })
    }
    if (!(await bcrypt.compare(loginDto.password, serRes.data.password))){
      return res.status(213).json({
        message: "Mật khẩu không chính xác"
      });
    }
    this.mail.sendMail({
      subject: "Register Authentication Email",
      to: serRes.data.email,
      text: `Tài khoản của bạn vừa được login ở một thiết bị mới`
    })
    
    return res.status(200).json({
      token:this.jwt.createToken(serRes.data, "1d")
    })
  }catch(err){
    return res.status(500).json({
      message:"Server Controller Error"
    })
  }
 }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
