import { Model } from "sequelize-typescript";
import { Customer } from "../../customer/entities/customer.entity";
export declare class CustomerLike extends Model<CustomerLike> {
    id: number;
    product_id: number;
    customer_id: number;
    customer: Customer;
}
