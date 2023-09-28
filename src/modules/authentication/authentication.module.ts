import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from 'src/jwts/jwt.sevice';
@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, JwtService],
})
export class AuthenticationModule {}
