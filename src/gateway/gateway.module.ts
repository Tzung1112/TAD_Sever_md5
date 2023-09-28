import { Module } from '@nestjs/common';
import { CustomerChat } from './entities/customer.chat.entity';
import { JwtService } from 'src/jwts/jwt.sevice';
import { CustomerGateway } from './customer.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';


@Module({
    imports: [TypeOrmModule.forFeature([CustomerChat])],
    controllers: [],
    providers: [CustomerGateway,JwtService, CustomerService],
    exports: [CustomerGateway]
})
export class GatewayModule { }