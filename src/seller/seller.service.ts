import { Injectable, NotFoundException } from "@nestjs/common";import { InjectModel } from "@nestjs/sequelize";import { Seller } from "./entities/seller.entity";import { CreateSellerDto } from "./dto/create-seller.dto";import { UpdateSellerDto } from "./dto/update-seller.dto";import * as bcrypt from "bcrypt";
import { FoodService } from "src/Product/food.service";


@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller)
    private readonly sellerModel: typeof Seller,
    private readonly foodModel: FoodService
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);
    createSellerDto.password = hashedPassword;

    return this.sellerModel.create(createSellerDto as any);
  }

  async findAll(): Promise<Seller[]> {
    return this.sellerModel.findAll();
  }

  async getSellerProducts(sellerId) {
    const seller = await this.foodModel.findOne(sellerId);
    return seller;
  }

  async findOne(id: number): Promise<Seller> {
    const seller = await this.sellerModel.findByPk(id);
    if (!seller) {
      throw new NotFoundException(`Seller with ID "${id}" not found`);
    }
    return seller;
  }


  async update(id: number, updateSellerDto: UpdateSellerDto) {
    const [affectedCount] = await this.sellerModel.update(updateSellerDto, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`Seller with ID "${id}" not found`);
    }
    return this.sellerModel.findAll({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const deletedRowCount = await this.sellerModel.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      throw new NotFoundException(`Seller with ID "${id}" not found`);
    }
  }
}
