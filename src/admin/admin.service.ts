 import {  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./model/admin.model";
import { CreateAdminDto, UpdateAdminDto, FilterAdminDto } from "./dto/admin.dto";
import { Op } from "sequelize";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    createAdminDto.password=hashedPassword;
    const admin = await this.adminModel.create(createAdminDto as any);
    return admin;
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }
    await admin.update(updateAdminDto);
    return admin;
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    await admin.destroy();
  }
}
