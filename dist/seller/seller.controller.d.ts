import { SellerService } from "./seller.service";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";
import { RequestWithUser } from "src/common/types/request-with-user";
import { Response } from "express";
export declare class SellerController {
    private readonly sellerService;
    constructor(sellerService: SellerService);
    create(createSellerDto: CreateSellerDto): Promise<import("./entities/seller.entity").Seller>;
    sellerFoods(req: RequestWithUser): Promise<{
        title: string;
        products: import("../Product/entities/food.entity").Product | null;
        sellerId: any;
    }>;
    findone(req: RequestWithUser, res: Response): Promise<void>;
    findOne(id: string): Promise<import("./entities/seller.entity").Seller>;
    update(id: string, updateSellerDto: UpdateSellerDto): Promise<import("./entities/seller.entity").Seller[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
