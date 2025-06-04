import { PayService } from "./pay.service";
import { Pay } from "./entities/pay.entity";
import { CreatePayDto } from "./dto/create-pay.dto";
import { Request, Response } from "express";
export declare class PayController {
    private readonly payService;
    constructor(payService: PayService);
    create(createPayDto: CreatePayDto, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    findAll(): Promise<Pay[]>;
    findOne(id: string): Promise<Pay | null>;
    update(id: string, updatePayDto: Partial<Pay>): Promise<Pay | null>;
    remove(id: string): Promise<void>;
}
