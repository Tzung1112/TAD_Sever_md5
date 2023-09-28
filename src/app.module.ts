import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/gateway.module';
import { UserModule } from './modules/user/user.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UserAddressesModule } from './modules/user-addresses/user-addresses.module';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './modules/discord/discord.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SocketModule } from './modules/socket/socket.module';
import { ProductModule } from './modules/product/product.module';
import { CategorydetailModule } from './modules/categorydetail/categorydetail.module';
import { ProductpictureModule } from './modules/productpicture/productpicture.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'server_db_test_md5',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    },
    ),
    ConfigModule.forRoot(),
    UserModule, 
    CategoriesModule,
    CategorydetailModule,
    UserAddressesModule,
    ProductModule,
    ProductpictureModule,
    DiscordModule,
    SocketModule,
    AuthenticationModule,
    

  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
