import { Model } from "sequelize-typescript";
export declare class Seller extends Model {
    id: number;
    last_name: string;
    first_name: string;
    phone_number: string;
    email: string;
    is_active: boolean;
    active_link: string;
    hashed_token: string;
    adress: string;
    password: string;
}
