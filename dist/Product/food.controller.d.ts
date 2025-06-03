import { Response } from "express";
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "src/customer/customer.service";
import { RequestWithUser } from "src/common/types/request-with-user";
export declare class FoodController {
    private readonly foodService;
    private jwtService;
    private readonly customerService;
    constructor(foodService: FoodService, jwtService: JwtService, customerService: CustomerService);
    create(createPatientDto: CreateFoodDto, avatar: any): Promise<import("./entities/food.entity").Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    update(id: string, update: UpdateFoodDto): Promise<[affectedCount: number]>;
    findone(id: string): Promise<import("./entities/food.entity").Product>;
    findo(id: string, res: Response): Promise<void>;
    getAllFood(): Promise<import("./entities/food.entity").Product[]>;
    getAccount(req: any, res: Response): Promise<void | {
        title: string;
        user: import("../customer/entities/customer.entity").Customer;
    }>;
    adminFoods(req: RequestWithUser): Promise<{
        title: string;
        users: import("../customer/entities/customer.entity").Customer[];
        products: import("./entities/food.entity").Product[];
        admin: any;
    }>;
    getAllFoods(): Promise<{
        title: string;
        foods: import("./entities/food.entity").Product[];
    }>;
}
