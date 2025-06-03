import { Module } from '@nestjs/common';import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay } from './entities/pay.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { BuyModule } from 'src/buy/buy.module';
import { FoodModule } from 'src/Product/food.module';

@Module({
  imports: [SequelizeModule.forFeature([Pay]),BuyModule,FoodModule],
  controllers: [PayController],
  providers: [PayService],
  exports: [PayService],
})
export class PayModule {}
