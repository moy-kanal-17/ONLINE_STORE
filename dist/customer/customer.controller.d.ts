import { CustomerService } from "./customer.service";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Response } from "express";
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(id: string): Promise<Customer | null>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null>;
    remove(id: string, res: Response): Promise<void>;
}
