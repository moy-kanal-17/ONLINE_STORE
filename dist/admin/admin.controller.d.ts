import { AdminService } from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import { Admin } from "./model/admin.model";
import { Response } from "express";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    find(): Promise<Admin[]>;
    findOne(id: string): Promise<Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin>;
    findCreators(res: Response): Promise<void>;
    remove(id: string): Promise<void>;
}
