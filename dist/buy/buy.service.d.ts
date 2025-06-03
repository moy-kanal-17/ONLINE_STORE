import { CreateBuyDto } from "./dto/create-buy.dto";
import { UpdateBuyDto } from "./dto/update-buy.dto";
import { Buy } from "./entities/buy.entity";
export declare class BuyService {
    private buyModel;
    constructor(buyModel: typeof Buy);
    create(createBuyDto: CreateBuyDto): Promise<Buy>;
    findAll(): Promise<Buy[]>;
    findOne(id: number): Promise<Buy | null>;
    findPay(id: number): Promise<Buy | null>;
    update(id: number, updateBuyDto: UpdateBuyDto): Promise<[number, Buy[]]>;
    remove(id: number): Promise<void>;
}
