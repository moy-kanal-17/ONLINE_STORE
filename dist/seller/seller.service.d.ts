import { Seller } from "./entities/seller.entity";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";
import { FoodService } from "src/Product/food.service";
export declare class SellerService {
    private readonly sellerModel;
    private readonly foodModel;
    constructor(sellerModel: typeof Seller, foodModel: FoodService);
    create(createSellerDto: CreateSellerDto): Promise<Seller>;
    findAll(): Promise<Seller[]>;
    getSellerProducts(sellerId: any): Promise<import("../Product/entities/food.entity").Product | null>;
    findOne(id: number): Promise<Seller>;
    update(id: number, updateSellerDto: UpdateSellerDto): Promise<Seller[]>;
    remove(id: number): Promise<void>;
}
