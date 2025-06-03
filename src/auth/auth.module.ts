import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { BuyModule } from 'src/buy/buy.module';
import { CustomerModule } from 'src/customer/customer.module';
import { Customer } from 'src/customer/entities/customer.entity';
import { SellerModule } from 'src/seller/seller.module';
import { Seller } from 'src/seller/entities/seller.entity';
import { AdminModule } from 'src/admin/admin.module';
import { Admin } from 'src/admin/model/admin.model';

@Module({
  imports: [
    // forwardRef(() => BuyModule),
    SequelizeModule.forFeature([Seller, Customer, Admin]),
    // forwardRef(() => CustomerModule),
    // forwardRef(() => SellerModule),
    // forwardRef(() => AdminModule),

    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      signOptions: { expiresIn: "15m" },
    }),
     CustomerModule,
    MailModule,
    // SellerModule,
    // CustomerModule,
    // AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
