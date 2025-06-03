import { Model } from "sequelize-typescript";
import { Buy } from "../../buy/entities/buy.entity";
import { CustomerLike } from "../../customer-likes/entities/customer-like.entity";
export declare class Customer extends Model<Customer> {
    id: number;
    last_name: string;
    first_name: string;
    phone_number?: string;
    email: string;
    password: string;
    gender?: string;
    birthday?: Date;
    is_active: boolean;
    active_link?: string;
    hashed_token?: string;
    buys: Buy[];
    likes: CustomerLike[];
}
