  import { forwardRef, Module } from "@nestjs/common";  import { TypeOrmModule } from "@nestjs/typeorm";  import { FoodService } from "./food.service";  import { FoodController } from "./food.controller";  import { Product } from "./entities/food.entity";
  import { FileModule } from "src/file/file.module";
  import { AuthModule } from "src/auth/auth.module";
  import { SequelizeModule } from "@nestjs/sequelize";
import { CustomerModule } from "src/customer/customer.module";
import { JwtModule } from "@nestjs/jwt";
import { SellerModule } from "src/seller/seller.module";

  @Module({
    imports: [
      JwtModule.register({
        secret: process.env.JWT_ACCESS_SECRET || "super-secret",
        signOptions: { expiresIn: "1h" },
      }),
      SequelizeModule.forFeature([Product]),
      FileModule,
      AuthModule,
      CustomerModule,
    ],
    controllers: [FoodController],
    providers: [FoodService],
    exports: [FoodService],
  })
  export class FoodModule {}
 