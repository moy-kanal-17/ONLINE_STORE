import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Customer } from "./entities/customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      signOptions: { expiresIn: "15m" },
    }),
    SequelizeModule.forFeature([Customer]),
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
