import { Injectable } from "@nestjs/common";import { InjectModel } from "@nestjs/sequelize";import { CreateBuyDto } from "./dto/create-buy.dto";import { UpdateBuyDto } from "./dto/update-buy.dto";import { Buy } from "./entities/buy.entity";import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/Product/entities/food.entity";
import { Pay } from "src/pay/entities/pay.entity";

@Injectable()
export class BuyService {
  constructor(
    @InjectModel(Buy)
    private buyModel: typeof Buy
  ) {}

  async create(createBuyDto: CreateBuyDto) {
    const buy = await this.buyModel.create(createBuyDto as any);
    return buy;
  }

  async findAll(): Promise<Buy[]> {
    return this.buyModel.findAll({
      include: [
        {
          model: Customer,
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Product,
          attributes: ["id", "name", "price"], 
        },
        {
          model: Pay,
          attributes: ["id", "price", "type"], 
        },
      ],
    });
  }

  async findOne(id: number): Promise<Buy | null> {
    return this.buyModel.findByPk(id, {
      include: [
        {
          model: Customer,
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Product,
          attributes: ["id", "name", "price"],
        },
        {
          model: Pay,
          attributes: ["id", "amount", "method"],
        },
      ],
    });
  }

  async findPay(id: number): Promise<Buy | null> {
    return this.buyModel.findOne({ where: { pay_id: id } });
  }

  async update(
    id: number,
    updateBuyDto: UpdateBuyDto
  ): Promise<[number, Buy[]]> {
    return this.buyModel.update(updateBuyDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    await this.buyModel.destroy({ where: { id } });
  }
}
