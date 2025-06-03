import {  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from "@nestjs/common";
import { PayService } from "./pay.service";
import { Pay } from "./entities/pay.entity";
import { CreatePayDto } from "./dto/create-pay.dto";
import { Request, Response } from "express";

@Controller("pays")
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post()
  create(
    @Body() createPayDto: CreatePayDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    return this.payService.create(createPayDto, res,req);
  }

  @Get()
  findAll() {
    return this.payService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.payService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePayDto: Partial<Pay>) {
    return this.payService.update(+id, updatePayDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.payService.remove(+id);
  }
}
