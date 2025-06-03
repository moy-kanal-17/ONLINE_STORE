import { Admin } from "./model/admin.model";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
export declare class AdminService {
    private adminModel;
    constructor(adminModel: typeof Admin);
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin>;
    remove(id: number): Promise<void>;
}
