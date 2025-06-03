import { Model } from "sequelize-typescript";
import { Product } from "../../Product/entities/food.entity";
import { Customer } from "../../customer/entities/customer.entity";
import { Pay } from "../../pay/entities/pay.entity";
export declare class Buy extends Model<Buy> {
    id: number;
    customer_id: number;
    customer: Customer;
    product_id: number;
    product: Product;
    pay_id: number;
    pay: Pay;
}
