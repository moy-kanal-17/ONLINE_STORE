import {  Controller,  Get,  Post,  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { SellerService } from "./seller.service";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SellerhGuard } from "src/common/guards/seller.guard";
import { RequestWithUser } from "src/common/types/request-with-user";
import { Response } from "express";

@Controller("sellers")
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  async create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  @UseGuards(SellerhGuard)
  @Render("seller")
  @ApiOperation({ summary: "Render seller panel with products" })
  @ApiResponse({ status: 200, description: "Seller panel rendered" })
  async sellerFoods(@Req() req: RequestWithUser) {
    const sellerId = req.user.sub;
    console.log("Seller ID:", sellerId);
    const products = await this.sellerService.getSellerProducts(sellerId);
    return {
      title: "Seller paneli",
      products,
      sellerId,
    };
  }

  @UseGuards(SellerhGuard)
  @Get("/profile")
  @Render("account")
  @ApiOperation({ summary: "Render seller profile" })
  async findone(@Req() req: RequestWithUser ,@Res() res: Response) {
    const sellerId = req.user.sub;
    console.log("🛎️ Seller ID:", sellerId);
    const user= await this.sellerService.findOne(+sellerId);
    return res.render("account", {
      title: "Seller Profile",
      user,
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.sellerService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSellerDto: UpdateSellerDto
  ) {
    const updatedSellers = await this.sellerService.update(
      +id,
      updateSellerDto
    );
    return updatedSellers;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.sellerService.remove(+id);
    return { message: `Seller with ID "${id}" deleted successfully` };
  }
}
