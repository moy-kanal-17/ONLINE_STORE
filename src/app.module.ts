import { Module } from "@nestjs/common";import { SequelizeModule } from "@nestjs/sequelize";import { ServeStaticModule } from "@nestjs/serve-static";import { join } from "path";import { FoodModule } from "./Product/food.module";import { FileModule } from "./file/file.module";import { AuthModule } from "./auth/auth.module";import { BuyModule } from "./buy/buy.module";import { PayModule } from "./pay/pay.module";import { CustomerModule } from "./customer/customer.module";import { CustomerLikesModule } from "./customer-likes/customer-likes.module";


import { Product } from "./Product/entities/food.entity";
import { Pay } from "./pay/entities/pay.entity";
import { Customer } from "./customer/entities/customer.entity";
import { Buy } from "./buy/entities/buy.entity";
import { CustomerLike } from "./customer-likes/entities/customer-like.entity";
import { JwtModule } from "@nestjs/jwt";
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';
import { Seller } from "./seller/entities/seller.entity";
import { AppController } from "./app.controller";
import { TelegramModule } from './telegram/telegram.module';
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.PG_USERNAME || "postgres",
      password: process.env.PG_PASSWORD || "moykanal17",
      database: process.env.PG_NAME || "ovqat",
      models: [Product, Seller, Pay, Customer, Buy, CustomerLike],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
      logging: false,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 soniya = 60 * 1000 = 60000 milisaniya
        limit: 4, // Har bir foydalanuvchi uchun 10 ta so‘rov ruxsat
      },
    ]),
    
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      signOptions: { expiresIn: "1h" },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "src", "views"),
    }),
    FoodModule,
    FileModule,
    AuthModule,
    BuyModule,
    PayModule,
    CustomerModule,
    CustomerLikesModule,
    SellerModule,
    AdminModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [JwtModule],
})
export class AppModule {}
