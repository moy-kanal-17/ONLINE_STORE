import { Module } from "@nestjs/common";
import { CustomerLikeService } from "./customer-likes.service";
import { CustomerLikeController } from "./customer-likes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerLike } from "./entities/customer-like.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { CustomerModule } from "src/customer/customer.module";
import { SellerModule } from "src/seller/seller.module";
import { AdminModule } from "src/admin/admin.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      signOptions: { expiresIn: "15m" },
    }),
    CustomerModule,
    SellerModule,
    AdminModule,

    SequelizeModule.forFeature([CustomerLike]),
  ],
  controllers: [CustomerLikeController],
  providers: [CustomerLikeService],
  exports: [CustomerLikeService],
})
export class CustomerLikesModule {}
