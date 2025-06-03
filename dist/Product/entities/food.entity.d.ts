import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { Buy } from "src/buy/entities/buy.entity";
import { Seller } from "src/seller/entities/seller.entity";
interface ProductAttributes {
    id: number;
    name: string;
    image: string;
    price: number;
    rating?: number;
    describtion?: string;
    seller_id: number;
    skids?: number;
    delivery_time?: string;
}
interface ProductCreationAttributes extends Optional<ProductAttributes, "id" | "rating" | "describtion" | "skids" | "delivery_time"> {
}
export declare class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    id: number;
    buys: Buy[];
    name: string;
    describtion?: string;
    image: string;
    price: number;
    rating?: number;
    seller_id: number;
    seller: Seller;
    skids?: number;
    delivery_time?: string;
}
export {};
