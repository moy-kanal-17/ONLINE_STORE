import {  Controller,  Get,  Post,  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Response } from "express";
import { AdminhGuard } from "src/common/guards/admin.guard";

@Controller("customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AdminhGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(AdminhGuard)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(AdminhGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @UseGuards(AdminhGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @UseGuards(AdminhGuard)
  @Post(":id")
  remove(@Param("id") id: string, res: Response) {
    return this.customerService.remove(+id, res);
  }
}
