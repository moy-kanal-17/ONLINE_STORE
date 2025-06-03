import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CustomerModule } from 'src/customer/customer.module';
import { SellerModule } from 'src/seller/seller.module';

@Module({
  imports: [SequelizeModule.forFeature([Admin]),JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET, 
    signOptions: { expiresIn: '1h' },})
    ,
    CustomerModule,
    SellerModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
