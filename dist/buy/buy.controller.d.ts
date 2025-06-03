import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
export declare class BuyController {
    private readonly buyService;
    constructor(buyService: BuyService);
    create(createBuyDto: CreateBuyDto): Promise<import("./entities/buy.entity").Buy>;
    findAll(): Promise<import("./entities/buy.entity").Buy[]>;
    findOne(id: string): Promise<import("./entities/buy.entity").Buy | null>;
    update(id: string, updateBuyDto: UpdateBuyDto): Promise<[number, import("./entities/buy.entity").Buy[]]>;
    remove(id: string): Promise<void>;
}
