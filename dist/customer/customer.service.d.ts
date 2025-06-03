import { Customer } from "./entities/customer.entity";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { Response } from "express";
export declare class CustomerService {
    private customerModel;
    constructor(customerModel: typeof Customer);
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer | null>;
    create(customerData: CreateCustomerDto): Promise<Customer>;
    update(id: number, updateData: Partial<UpdateCustomerDto>): Promise<Customer | null>;
    remove(id: number, res: Response): Promise<void>;
}
