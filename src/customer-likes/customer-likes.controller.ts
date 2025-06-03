import { Controller, Get, Post, Body, Delete, Param, UseGuards } from "@nestjs/common";import { CustomerLikeService } from "./customer-likes.service";import { CustomerLike } from "./entities/customer-like.entity";import { CreateCustomerLikeDto } from "./dto/create-customer-like.dto";import { AdminhGuard } from "src/common/guards/admin.guard";import { SelfOrModeratorGuard } from "src/common/guards/SelfOrAdmin.guard";
import { CreatorhGuard } from "src/common/guards/creator.guard";
@Controller("customer-likes")
export class CustomerLikeController {
  constructor(private readonly customerLikeService: CustomerLikeService) {}

  @UseGuards(CreatorhGuard)
  @Post()
  create(@Body() customerLike: CreateCustomerLikeDto) {
    return this.customerLikeService.create(customerLike);
  }

  @UseGuards(AdminhGuard)
  @Get()
  findAll() {
    return this.customerLikeService.findAll();
  }

  @UseGuards(SelfOrModeratorGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerLikeService.findOne(+id);
  }

  @UseGuards(SelfOrModeratorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerLikeService.remove(+id);
  }
}
