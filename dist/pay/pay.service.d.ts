import { Pay } from "./entities/pay.entity";
import { CreatePayDto } from "./dto/create-pay.dto";
import { UpdatePayDto } from "./dto/update-pay.dto";
import { BuyService } from "src/buy/buy.service";
import { Request, Response } from "express";
import { FoodService } from "src/Product/food.service";
export declare class PayService {
    private payModel;
    private readonly buyModel;
    private readonly productModel;
    constructor(payModel: typeof Pay, buyModel: BuyService, productModel: FoodService);
    create(createPayDto: CreatePayDto, res: Response, req: Request): Promise<void>;
    findAll(): Promise<Pay[]>;
    findOne(id: number): Promise<Pay | null>;
    update(id: number, updatePayDto: UpdatePayDto): Promise<Pay | null>;
    remove(id: number): Promise<void>;
}
