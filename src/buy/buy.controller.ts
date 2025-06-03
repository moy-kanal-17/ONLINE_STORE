import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';import { BuyService } from './buy.service';import { CreateBuyDto } from './dto/create-buy.dto';import { UpdateBuyDto } from './dto/update-buy.dto';import { SellerhGuard } from 'src/common/guards/seller.guard';
import { SelfOrModeratorGuard } from 'src/common/guards/SelfOrAdmin.guard';
import { AdminhGuard } from 'src/common/guards/admin.guard';

@Controller("buy")
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @UseGuards(SellerhGuard)
  @Post()
  create(@Body() createBuyDto: CreateBuyDto) {
    return this.buyService.create(createBuyDto);
  }

  @UseGuards(AdminhGuard)
  @Get()
  findAll() {
    return this.buyService.findAll();
  }

  @UseGuards(SelfOrModeratorGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.buyService.findOne(+id);
  }

  @UseGuards(SelfOrModeratorGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBuyDto: UpdateBuyDto) {
    return this.buyService.update(+id, updateBuyDto);
  }

  @UseGuards(SelfOrModeratorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.buyService.remove(+id);
  }
}
