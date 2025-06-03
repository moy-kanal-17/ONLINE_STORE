import { Product } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FileService } from 'src/file/file.service';
export declare class FoodService {
    private foodModel;
    private fileservice;
    constructor(foodModel: typeof Product, fileservice: FileService);
    findAll(): Promise<Product[]>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findone(id: any): Promise<Product | null>;
    findOne(id: number): Promise<Product | null>;
    create(createPatientDto: CreateFoodDto, image: any): Promise<Product>;
    update(id: number, update: UpdateFoodDto): Promise<[affectedCount: number]>;
}
