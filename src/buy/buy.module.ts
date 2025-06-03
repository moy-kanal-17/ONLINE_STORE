import { forwardRef, Module } from "@nestjs/common";
import { BuyService } from "./buy.service";
import { BuyController } from "./buy.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Buy } from "./entities/buy.entity";
import { CustomerModule } from "src/customer/customer.module";
import { JwtModule } from "@nestjs/jwt";
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

    SequelizeModule.forFeature([Buy]),
    forwardRef(() => CustomerModule),
  ],
  controllers: [BuyController],
  providers: [BuyService],
  exports: [BuyService],
})
export class BuyModule {}
