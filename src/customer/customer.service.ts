import { Injectable } from "@nestjs/common";import { InjectModel } from "@nestjs/sequelize";import { Customer } from "./entities/customer.entity";import { UpdateCustomerDto } from "./dto/update-customer.dto";import { CreateCustomerDto } from "./dto/create-customer.dto";
import { Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async findOne(id: number): Promise<Customer | null> {
    return this.customerModel.findByPk(id);
  }

  async create(customerData: CreateCustomerDto): Promise<Customer> {
    // Hash the password before saving
    if (customerData.password) {
      const salt = await bcrypt.genSalt(10);
      customerData.password = await bcrypt.hash(customerData.password, salt);
    }
    return this.customerModel.create(customerData as any);
  }

  async update(
    id: number,
    updateData: Partial<UpdateCustomerDto>
  ){
    const customer = await this.customerModel.findByPk(id);
    if (!customer) return null;
    return customer.update(updateData);
  }

  async remove(id: number,res:Response): Promise<void> {
    const customer = await this.customerModel.findByPk(id);
    if (customer) {
      await customer.destroy();
    }
  return res.redirect("/admin/customers");
  }
}
