import { Model } from "sequelize-typescript";
import { Customer } from "../../customer/entities/customer.entity";
import { Product } from "../../Product/entities/food.entity";
export declare class Pay extends Model<Pay> {
    id: number;
    customer_id: number;
    customer: Customer;
    product_id: number;
    product: Product;
    price: number;
    terminal: string;
    type: string;
    date: Date;
}
