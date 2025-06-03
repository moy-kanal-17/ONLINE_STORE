import { Module } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { SellerController } from "./seller.controller";
import { Seller } from "./entities/seller.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { FoodModule } from "src/Product/food.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([Seller]),
    FoodModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || "default-secret",
      signOptions: { expiresIn: "15d" },
    }),
  ],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
